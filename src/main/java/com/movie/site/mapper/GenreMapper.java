package com.movie.site.mapper;

import com.movie.site.dto.response.GenreDtoResponse;
import com.movie.site.model.Genre;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface GenreMapper {

    GenreDtoResponse toDto(Genre genre);

    List<GenreDtoResponse> toDtoList(List<Genre> genres);
}
