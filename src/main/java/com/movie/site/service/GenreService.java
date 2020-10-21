package com.movie.site.service;

import com.movie.site.dto.response.GenreDtoResponse;

import java.util.Collection;

public interface GenreService {

    Collection<GenreDtoResponse> findAll();
}