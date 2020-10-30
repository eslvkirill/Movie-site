package com.movie.site.service;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.model.Movie;

public interface MovieService {

    Movie create(CreateMovieDtoRequest movieDto);
}
