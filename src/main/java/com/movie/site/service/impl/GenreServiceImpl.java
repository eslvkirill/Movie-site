package com.movie.site.service.impl;

import com.movie.site.dto.response.GenreDtoResponse;
import com.movie.site.mapper.GenreMapper;
import com.movie.site.repository.GenreRepository;
import com.movie.site.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    @Override
    public Collection<GenreDtoResponse> findAll() {
        return genreMapper.toDtoList(genreRepository.findAll());
    }
}
