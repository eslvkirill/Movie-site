package com.movie.site.mapper;

import com.movie.site.dto.request.CreateGenreDtoRequest;
import com.movie.site.dto.request.UpdateGenreDtoRequest;
import com.movie.site.dto.response.GenreDtoResponse;
import com.movie.site.model.Genre;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper
public interface GenreMapper {

    GenreDtoResponse toDto(Genre genre);

    Genre toEntity(CreateGenreDtoRequest genreDto);

    List<GenreDtoResponse> toDtoList(Iterable<Genre> genres);

    Genre update(UpdateGenreDtoRequest genreDto, @MappingTarget Genre genre);
}
