package com.movie.site.mapper;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.dto.response.GetAllMovieDtoResponse;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.service.AmazonS3ClientService;
import com.movie.site.service.GenreService;
import com.movie.site.service.ReviewService;
import lombok.SneakyThrows;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

@Mapper(uses = {GenreMapper.class, SourceDataMapper.class,
        GenreService.class, AmazonS3ClientService.class,
        ReviewService.class})
@DecoratedWith(MovieMapperDecorator.class)
public interface MovieMapper {

    @Mappings({
            @Mapping(target = "active", constant = "true"),
            @Mapping(target = "genres", qualifiedByName = "findGenresByIds")
    })
    Movie toEntity(CreateMovieDtoRequest movieDto);

    @Mappings({
            @Mapping(target = "background", source = "movie.backgroundKey",
                    qualifiedByName = "downloadFile"),
            @Mapping(target = "reviews", ignore = true)
    })
    GetByIdMovieDtoResponse toGetByIdDto(Movie movie, Pageable reviewPageable);

    @Mapping(target = "poster", source = "posterKey", qualifiedByName = "downloadFile")
    GetAllMovieDtoResponse toGetAllDto(Movie movie);

    @SneakyThrows
    default Slice<GetAllMovieDtoResponse> toDtoSlice(Slice<Movie> movies) {
        return movies.map(this::toGetAllDto);
    }
}
