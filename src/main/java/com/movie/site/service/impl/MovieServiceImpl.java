package com.movie.site.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.site.dto.request.*;
import com.movie.site.dto.response.*;
import com.movie.site.exception.ForbiddenException;
import com.movie.site.exception.MovieNotFoundException;
import com.movie.site.exception.MovieRatingNotFoundException;
import com.movie.site.exception.RepeatedRatingException;
import com.movie.site.mapper.MovieMapper;
import com.movie.site.mapper.RatingMapper;
import com.movie.site.model.Movie;
import com.movie.site.model.QMovie;
import com.movie.site.model.Rating;
import com.movie.site.model.User;
import com.movie.site.model.enums.Role;
import com.movie.site.model.enums.Source;
import com.movie.site.model.id.RatingId;
import com.movie.site.repository.MovieRepository;
import com.movie.site.service.*;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import java.util.*;

import static com.movie.site.util.ParsingUtils.find;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieServiceImpl implements MovieService {

    private final AmazonS3ClientService amazonS3ClientService;
    private final ReviewService reviewService;
    private final SecurityService securityService;
    private final UserService userService;
    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final RatingMapper ratingMapper;
    private final RestTemplate restClient;
    private final ObjectMapper objectMapper;

    @Value("${omdb.api.key}")
    private String apiKey;

    private static final String OMDB_API_ROOT = "http://www.omdbapi.com/";
    private static final String KINOPOISK_API_PATTERN = "https://rating.kinopoisk.ru/%s.xml";
    private static final String METACRITIC_ROOT_PATTERN = "https://www.metacritic.com/movie/%s/";
    private static final String ID_PARAM = "i";
    private static final String APIKEY_PARAM = "apikey";
    private static final String RATINGS_NODE = "Ratings";
    private static final String AWARDS_NODE = "Awards";
    private static final String AWARDS_REG_EXP = "Won (\\d{1,2})";
    private static final String RATING_SOURCE_NODE = "Source";
    private static final String RATING_VALUE_NODE = "Value";
    private static final String RATING_REG_EXP = "[\\d.]+";
    private static final String KINOPOISK_RATING_NODE = "kp_rating";
    private static final String METACRITIC_SEPARATOR = "-";
    private static final String ID_REG_EXP = "[\\d]+";
    private static final String IMDB_ID_PREFIX = "tt";
    private static final String MOVIES_PREFIX_PATTERN = "movies/%d/";

    @Override
    public Movie create(CreateMovieDtoRequest movieDto) {
        Movie movie = movieMapper.toEntity(movieDto);
        movie.setSourceData(new HashSet<>());
        EnumMap<Source, String> urls = new EnumMap<>(Source.class);
        urls.put(Source.IMDB, movieDto.getImdbUrl());
        urls.put(Source.METACRITIC, String.format(METACRITIC_ROOT_PATTERN,
                movie.getEngTitle().toLowerCase().replace(" ", METACRITIC_SEPARATOR)));
        String imdbId = IMDB_ID_PREFIX + find(ID_REG_EXP, movieDto.getImdbUrl());
        String kinopoiskId = find(ID_REG_EXP, movieDto.getKinopoiskUrl());

        setOmdbData(movie, imdbId, urls);
        setKinopoiskRating(movie, kinopoiskId, movieDto.getKinopoiskUrl());

        Movie persistedMovie = movieRepository.save(movie);
        String prefix = String.format(MOVIES_PREFIX_PATTERN, persistedMovie.getId());

        persistedMovie
                .setPosterKey(amazonS3ClientService.upload(movieDto.getPoster(), prefix));
        persistedMovie
                .setBackgroundKey(amazonS3ClientService.upload(movieDto.getBackground(), prefix));

        return movieRepository.save(persistedMovie);
    }

    @Override
    @Transactional(readOnly = true)
    public GetByIdMovieDtoResponse findById(Long id, Pageable reviewPageable) {
        return movieMapper.toGetByIdDto(findByIdLocal(id), reviewPageable,
                userService.findCurrentLocal());
    }

    @Override
    public ReviewDtoResponse addReview(Long id, CreateReviewDtoRequest reviewDto) {
        return reviewService.create(findByIdLocal(id), reviewDto);
    }

    @Override
    public void updateReview(Long movieId, Long reviewId,
                             UpdateReviewDtoRequest reviewDto) {
        reviewService.update(findByIdLocal(movieId), reviewId, reviewDto);
    }

    @Override
    public void removeReview(Long movieId, Long reviewId) {
        reviewService.delete(findByIdLocal(movieId), reviewId);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ReviewDtoResponse> findAllReviews(Long id, Pageable pageable) {
        return reviewService.findAll(findByIdLocal(id), pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GetAllMovieDtoResponse> findAll(Predicate predicate,
                                                Pageable pageable) {
        Optional<User> user = Optional.ofNullable(userService.findCurrentLocal());
        boolean admin = user.map(u -> u.getAuthorities().contains(Role.ADMIN))
                .orElse(false);

        if (!admin) {
            predicate = QMovie.movie.active.isTrue().and(predicate);
        }

        Page<Movie> movies = movieRepository.findAll(predicate, pageable);

        return movieMapper.toGetAllDtoPage(movies, user.orElse(null));
    }

    @Override
    public Movie addRating(Long id, CreateRatingDtoRequest ratingDto) {
        Movie movie = findByIdLocal(id);
        User user = securityService.getCurrentUser();
        Rating rating = ratingMapper.toEntity(ratingDto);
        rating.setId(user, movie);

        if (!movie.addRating(rating)) {
            throw new RepeatedRatingException(id, user.getUsername());
        }

        return movieRepository.save(movie);
    }

    @Override
    public Movie updateRating(Long id, UpdateRatingDtoRequest ratingDto) {
        Movie movie = findByIdLocal(id);
        User user = securityService.getCurrentUser();
        Rating rating = new Rating();
        rating.setId(user, movie);

        if (!movie.removeRating(rating)) {
            throw new MovieRatingNotFoundException(id, user.getUsername());
        }

        Rating updatedRating = ratingMapper.update(ratingDto, rating);

        movie.addRating(updatedRating);

        return movieRepository.saveAndFlush(movie);
    }

    @Override
    public Movie removeRating(Long id) {
        Movie movie = findByIdLocal(id);
        User user = securityService.getCurrentUser();

        if (!movie.removeRatingById(new RatingId(user, movie))) {
            throw new MovieRatingNotFoundException(id, user.getUsername());
        }

        return movieRepository.save(movie);
    }

    @Override
    @Transactional(readOnly = true)
    public Movie findByIdLocal(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException(id));
        User user = securityService.getCurrentUser();

        if (!movie.isActive() && (user == null || !user.getAuthorities().contains(Role.ADMIN))) {
            throw new ForbiddenException();
        }

        return movie;
    }

    @Override
    @Transactional(readOnly = true)
    public List<GetCartMovieDtoResponse> findAllByPossibleBuyer(User user,
                                                                Pageable pageable) {
        QMovie movie = QMovie.movie;
        BooleanExpression hasPossibleBuyer = movie.cartDetails.any().id.user.eq(user);
        List<Movie> movies = movieRepository.findAll(hasPossibleBuyer, pageable).getContent();

        return movieMapper.toGetCartDtoList(movies, user);
    }

    @Override
    public void update(Long id, UpdateMovieDtoRequest movieDto) {
        Movie movie = findByIdLocal(id);

        movieMapper.update(movieDto, movie);
        amazonS3ClientService.update(movieDto.getPoster(), movie.getPosterKey());
        amazonS3ClientService.update(movieDto.getBackground(), movie.getBackgroundKey());

        String newImdbId = IMDB_ID_PREFIX + find(ID_REG_EXP, movieDto.getImdbUrl());
        String currentImdbId = find(ID_REG_EXP, movie.getSourceData(Source.IMDB).getUrl());

        if (!newImdbId.equals(currentImdbId)) {
            EnumMap<Source, String> urls = new EnumMap<>(Source.class);
            urls.put(Source.IMDB, movieDto.getImdbUrl());
            urls.put(Source.METACRITIC, String.format(METACRITIC_ROOT_PATTERN,
                    movie.getEngTitle().toLowerCase().replace(" ", METACRITIC_SEPARATOR)));

            movie.removeAllSourceData(urls.keySet());
            setOmdbData(movie, newImdbId, urls);
        }

        String newKinopoiskId = find(ID_REG_EXP, movieDto.getKinopoiskUrl());
        String currentKinopoiskId = find(ID_REG_EXP, movie.getSourceData(Source.KINOPOISK).getUrl());

        if (!Objects.equals(newKinopoiskId, currentKinopoiskId)) {
            movie.removeAllSourceData(Set.of(Source.KINOPOISK));
            setKinopoiskRating(movie, newKinopoiskId, movieDto.getKinopoiskUrl());
        }

        movieRepository.save(movie);
    }

    @Override
    public void updateActivity(Long id) {
        Movie movie = findByIdLocal(id);

        movie.setActive(!movie.isActive());

        movieRepository.save(movie);
    }

    @Override
    @Transactional(readOnly = true)
    public SaveMovieDtoResponse findById(Long id) {
        return movieMapper.toSaveDto(findByIdLocal(id));
    }

    @SneakyThrows
    private void setOmdbData(Movie movie, String imdbId,
                             EnumMap<Source, String> urls) {
        String omdbResult = restClient
                .getForObject(UriComponentsBuilder.fromHttpUrl(OMDB_API_ROOT)
                        .queryParam(ID_PARAM, imdbId)
                        .queryParam(APIKEY_PARAM, apiKey).toUriString(), String.class);

        JsonNode omdbRoot = objectMapper.readTree(omdbResult);
        String awards = find(AWARDS_REG_EXP, omdbRoot.get(AWARDS_NODE).asText());

        if (awards != null) {
            movie.setOscars(Integer.parseInt(awards));
        } else {
            movie.setOscars(0);
        }

        JsonNode ratings = omdbRoot.get(RATINGS_NODE);

        ratings.forEach(node -> {
            Optional<Source> sourceOpt = Optional
                    .ofNullable(Source.of(node.get(RATING_SOURCE_NODE).asText()));

            sourceOpt.ifPresent(source -> {
                float rating = Float.parseFloat(Objects.requireNonNull(
                        find(RATING_REG_EXP, node.get(RATING_VALUE_NODE).asText())));

                movie.addSourceData(urls.get(source), rating, source);
            });
        });
    }

    @SneakyThrows
    private void setKinopoiskRating(Movie movie, String kinopoiskId,
                                    String kinopoiskUrl) {
        String kinopoiskResult = restClient
                .getForObject(String.format(KINOPOISK_API_PATTERN, kinopoiskId), String.class);

        DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        Document doc =
                db.parse(new InputSource(new StringReader(Objects.requireNonNull(kinopoiskResult))));

        float rating = Float.parseFloat(doc.getElementsByTagName(KINOPOISK_RATING_NODE)
                .item(0).getTextContent());

        movie.addSourceData(kinopoiskUrl, rating, Source.KINOPOISK);
    }
}
