package com.movie.site.mapper;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.service.AmazonS3ClientService;
import com.movie.site.service.GenreService;
import com.movie.site.service.ReviewService;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.data.domain.Pageable;

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
    GetByIdMovieDtoResponse toDto(Movie movie, Pageable reviewPageable);
}
