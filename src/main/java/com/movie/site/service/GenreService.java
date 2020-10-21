package com.movie.site.service;

import com.movie.site.dto.request.CreateGenreDtoRequest;
import com.movie.site.dto.request.UpdateGenreDtoRequest;
import com.movie.site.dto.response.GenreDtoResponse;
import com.movie.site.model.Genre;

import java.util.Collection;

public interface GenreService {

    Collection<GenreDtoResponse> findAll();

    Genre create(CreateGenreDtoRequest genreDto);

    Genre update(Long id, UpdateGenreDtoRequest genreDto);
}