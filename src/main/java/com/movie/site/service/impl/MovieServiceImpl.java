package com.movie.site.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.exception.ForbiddenException;
import com.movie.site.exception.MovieNotFoundException;
import com.movie.site.mapper.MovieMapper;
import com.movie.site.model.Movie;
import com.movie.site.model.SourceData;
import com.movie.site.model.enums.Role;
import com.movie.site.model.enums.Source;
import com.movie.site.repository.MovieRepository;
import com.movie.site.service.AmazonS3ClientService;
import com.movie.site.service.MovieService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final RestTemplate restClient;
    private final ObjectMapper objectMapper;

    @Value("${omdb.api.key}")
    private String apiKey;

    private static final String OMDB_API_ROOT = "http://www.omdbapi.com/";
    private static final String KINOPOISK_API_PATTERN = "https://rating.kinopoisk.ru/%s.xml";
    private static final String ROTTEN_TOMATOES_URL_PATTERN = "https://www.rottentomatoes.com/m/%s_%d/";
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
    private static final String ROTTEN_TOMATOES_SEPARATOR = "_";
    private static final String METACRITIC_SEPARATOR = "-";
    private static final String ID_REG_EXP = "[\\d]+";
    private static final String IMDB_ID_PREFIX = "tt";
    private static final String MOVIES_PREFIX_PATTERN = "movies/%d/";

    @Override
    @SneakyThrows
    public Movie create(CreateMovieDtoRequest movieDto) {
        Movie movie = movieMapper.toEntity(movieDto);
        String imdbId = IMDB_ID_PREFIX + find(ID_REG_EXP, movieDto.getImdbUrl());

        String omdbResult = restClient
                .getForObject(UriComponentsBuilder.fromHttpUrl(OMDB_API_ROOT)
                        .queryParam(ID_PARAM, imdbId)
                        .queryParam(APIKEY_PARAM, apiKey).toUriString(), String.class);

        JsonNode omdbRoot = objectMapper.readTree(omdbResult);
        JsonNode ratings = omdbRoot.get(RATINGS_NODE);
        String awards = find(AWARDS_REG_EXP, omdbRoot.get(AWARDS_NODE).asText());

        if (awards != null) {
            movie.setOscars(Integer.parseInt(awards));
        }

        String lowerCaseTitle = movie.getEngTitle().toLowerCase();
        EnumMap<Source, String> urls = new EnumMap<>(Source.class);
        urls.put(Source.IMDB, movieDto.getImdbUrl());
        urls.put(Source.ROTTEN_TOMATOES, String.format(ROTTEN_TOMATOES_URL_PATTERN,
                lowerCaseTitle.replace(" ", ROTTEN_TOMATOES_SEPARATOR), movie.getYear()));
        urls.put(Source.METACRITIC, String.format(METACRITIC_ROOT_PATTERN,
                lowerCaseTitle.replace(" ", METACRITIC_SEPARATOR)));

        Set<SourceData> sourceData = new HashSet<>();

        ratings.forEach(node -> {
            Source source = Source.of(node.get(RATING_SOURCE_NODE).asText());

            sourceData.add(SourceData.builder()
                    .url(urls.get(source))
                    .rating(Float.parseFloat(Objects.requireNonNull(
                            find(RATING_REG_EXP, node.get(RATING_VALUE_NODE).asText()))))
                    .source(source)
                    .movie(movie)
                    .build());
        });

        String kinopoiskId = find(ID_REG_EXP, movieDto.getKinopoiskUrl());

        String kinopoiskResult = restClient
                .getForObject(String.format(KINOPOISK_API_PATTERN, kinopoiskId), String.class);

        DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        Document doc =
                db.parse(new InputSource(new StringReader(Objects.requireNonNull(kinopoiskResult))));

        sourceData.add(SourceData.builder()
                .url(movieDto.getKinopoiskUrl())
                .rating(Float.parseFloat(doc.getElementsByTagName(KINOPOISK_RATING_NODE)
                        .item(0).getTextContent()))
                .source(Source.KINOPOISK)
                .movie(movie)
                .build());

        movie.setSourceData(sourceData);

        Movie persistedMovie = movieRepository.save(movie);
        String prefix = String.format(MOVIES_PREFIX_PATTERN, persistedMovie.getId());

        persistedMovie
                .setPosterKey(amazonS3ClientService.upload(movieDto.getPoster(), prefix));
        persistedMovie
                .setBackground1Key(amazonS3ClientService.upload(movieDto.getBackground1(), prefix));
        persistedMovie
                .setBackground2Key(amazonS3ClientService.upload(movieDto.getBackground2(), prefix));

        return movieRepository.save(persistedMovie);
    }

    @Override
    @Transactional(readOnly = true)
    public GetByIdMovieDtoResponse findById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException(id));
        Collection<? extends GrantedAuthority> userAuthorities = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getAuthorities();

        if (!movie.isActive() && !userAuthorities.contains(Role.ADMIN)) {
            throw new ForbiddenException();
        }

        return movieMapper.toDto(movie);
    }
}
