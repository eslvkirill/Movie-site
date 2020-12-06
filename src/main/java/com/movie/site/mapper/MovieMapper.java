package com.movie.site.mapper;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.dto.response.GetAllDetailsMovieDtoResponse;
import com.movie.site.dto.response.GetAllMovieDtoResponse;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.model.User;
import com.movie.site.service.AmazonS3ClientService;
import com.movie.site.service.GenreService;
import com.movie.site.service.PersonService;
import com.movie.site.service.ReviewService;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Mapper(uses = {GenreMapper.class, SourceDataMapper.class, PersonMapper.class,
        RatingMapper.class, GenreService.class, AmazonS3ClientService.class,
        ReviewService.class, PersonService.class})
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
    GetAllMovieDtoResponse toGetAllDto(Movie movie, User user);


    @Mapping(target = "poster", source = "posterKey", qualifiedByName = "downloadFile")
    GetAllDetailsMovieDtoResponse toGetAllDetailsDto(Movie movie);

    List<GetAllDetailsMovieDtoResponse> toGetAllDetailsDtoList(List<Movie> movies);

    default Page<GetAllMovieDtoResponse> toGetAllDtoPage(Page<Movie> movies, User user) {
        return movies.map(movie -> toGetAllDto(movie, user));
    }
}
