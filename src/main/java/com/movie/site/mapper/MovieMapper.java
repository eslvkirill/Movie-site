package com.movie.site.mapper;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.model.Movie;
import com.movie.site.service.GenreService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(uses = {GenreMapper.class, GenreService.class})
public interface MovieMapper {

    @Mappings({
            @Mapping(target = "active", constant = "true"),
            @Mapping(target = "genres", qualifiedByName = "findGenresByIds")
    })
    Movie toEntity(CreateMovieDtoRequest movieDto);
}
