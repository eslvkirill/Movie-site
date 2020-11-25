package com.movie.site.service;

import com.movie.site.dto.request.CreateGenreDtoRequest;
import com.movie.site.dto.request.UpdateGenreDtoRequest;
import com.movie.site.dto.response.GenreDtoResponse;
import com.movie.site.model.Genre;
import org.mapstruct.Named;

import java.util.Collection;
import java.util.Set;

public interface GenreService {

    Collection<GenreDtoResponse> findAll();

    GenreDtoResponse create(CreateGenreDtoRequest genreDto);

    GenreDtoResponse update(Long id, UpdateGenreDtoRequest genreDto);

    @Named("findGenresByIds")
    Set<Genre> findAllByIds(Iterable<Long> ids);
}