package com.movie.site.mapper;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.service.AmazonS3ClientService;
import com.movie.site.service.GenreService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(uses = {GenreMapper.class, SourceDataMapper.class,
        GenreService.class, AmazonS3ClientService.class})
public interface MovieMapper {

    @Mappings({
            @Mapping(target = "active", constant = "true"),
            @Mapping(target = "genres", qualifiedByName = "findGenresByIds")
    })
    Movie toEntity(CreateMovieDtoRequest movieDto);

    @Mappings({
            @Mapping(target = "poster", source = "posterKey",
                    qualifiedByName = "downloadFile"),
            @Mapping(target = "background1", source = "background1Key",
                    qualifiedByName = "downloadFile"),
            @Mapping(target = "background2", source = "background2Key",
                    qualifiedByName = "downloadFile")

    })
    GetByIdMovieDtoResponse toDto(Movie movie);
}
