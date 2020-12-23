package com.movie.site.mapper;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.dto.request.UpdateMovieDtoRequest;
import com.movie.site.dto.response.*;
import com.movie.site.model.Movie;
import com.movie.site.model.User;
import com.movie.site.model.enums.Source;
import com.movie.site.service.AmazonS3ClientService;
import com.movie.site.service.GenreService;
import com.movie.site.service.PersonService;
import com.movie.site.service.ReviewService;
import org.mapstruct.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(uses = {GenreMapper.class, SourceDataMapper.class, PersonMapper.class,
        RatingMapper.class, GenreService.class, AmazonS3ClientService.class,
        ReviewService.class, PersonService.class}, imports = {Collectors.class,
        Source.class})
@DecoratedWith(MovieMapperDecorator.class)
public interface MovieMapper {

    @Mappings({
            @Mapping(target = "active", constant = "true"),
            @Mapping(target = "genres", qualifiedByName = "findGenresByIds"),
            @Mapping(target = "actors", qualifiedByName = "findPeopleByIds"),
            @Mapping(target = "directors", qualifiedByName = "findPeopleByIds")
    })
    Movie toEntity(CreateMovieDtoRequest movieDto);

    @Mappings({
            @Mapping(target = "background", source = "movie.backgroundKey",
                    qualifiedByName = "downloadFile"),
            @Mapping(target = "reviews", ignore = true),
            @Mapping(target = "totalRating", expression = "java(movie.getTotalRating())"),
            @Mapping(target = "numberOfRatings",
                    expression = "java(movie.numberOfRatings())"),
            @Mapping(target = "userHasAlreadyWrittenReview",
                    expression = "java(movie.containsReview(user))"),
            @Mapping(target = "id", source = "movie.id")
    })
    GetByIdMovieDtoResponse toGetByIdDto(Movie movie, Pageable reviewPageable, User user);

    @Mappings({
            @Mapping(target = "poster", source = "movie.posterKey",
                    qualifiedByName = "downloadFile"),
            @Mapping(target = "totalRating", expression = "java(movie.getTotalRating())"),
            @Mapping(target = "id", source = "movie.id")
    })
    GetAllMovieDtoResponse toGetAllDto(Movie movie);


    @Mapping(target = "poster", source = "posterKey", qualifiedByName = "downloadFile")
    GetCartMovieDtoResponse toGetCartDto(Movie movie);

    List<GetCartMovieDtoResponse> toGetCartDtoList(Iterable<Movie> movies, @Context User user);

    default Page<GetAllMovieDtoResponse> toGetAllDtoPage(Page<Movie> movies, User user) {
        return movies.map(this::toGetAllDto);
    }

    @Mappings({
            @Mapping(target = "genres", qualifiedByName = "findGenresByIds"),
            @Mapping(target = "actors", qualifiedByName = "findPeopleByIds"),
            @Mapping(target = "directors", qualifiedByName = "findPeopleByIds")
    })
    Movie update(UpdateMovieDtoRequest movieDto, @MappingTarget Movie movie);

    @Mappings({
            @Mapping(target = "poster", source = "posterKey",
                    qualifiedByName = "downloadFile"),
            @Mapping(target = "background", source = "backgroundKey",
                    qualifiedByName = "downloadFile"),
            @Mapping(target = "genres",
                    expression = "java(movie.getGenres().stream()" +
                            ".map(genre -> genre.getId())" +
                            ".collect(Collectors.toSet()))"),
            @Mapping(target = "kinopoiskUrl",
                    expression = "java(movie.getSourceData(Source.KINOPOISK).getUrl())"),
            @Mapping(target = "imdbUrl",
                    expression = "java(movie.getSourceData(Source.IMDB).getUrl())"),
            @Mapping(target = "actors",
                    expression = "java(movie.getActors().stream()" +
                            ".map(actor -> actor.getId())" +
                            ".collect(Collectors.toSet()))"),
            @Mapping(target = "directors",
                    expression = "java(movie.getDirectors().stream()" +
                            ".map(director -> director.getId())" +
                            ".collect(Collectors.toSet()))")
    })
    SaveMovieDtoResponse toSaveDto(Movie movie);

    @Mapping(target = "poster", source = "posterKey", qualifiedByName = "downloadFile")
    GetOrderDetailsMovieDtoResponse toGetOrderDetailsDto(Movie movie);

    default Page<GetOrderDetailsMovieDtoResponse> toGetOrderDetailsDtoPage(Page<Movie> movies) {
        return movies.map(this::toGetOrderDetailsDto);
    }
}
