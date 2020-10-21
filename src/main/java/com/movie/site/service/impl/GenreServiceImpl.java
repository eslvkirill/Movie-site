package com.movie.site.service.impl;

import com.movie.site.dto.request.CreateGenreDtoRequest;
import com.movie.site.dto.request.UpdateGenreDtoRequest;
import com.movie.site.dto.response.GenreDtoResponse;
import com.movie.site.exception.GenreNotFoundException;
import com.movie.site.mapper.GenreMapper;
import com.movie.site.model.Genre;
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

    @Override
    public Genre create(CreateGenreDtoRequest genreDto) {
        return genreRepository.save(genreMapper.toEntity(genreDto));
    }

    @Override
    public Genre update(Long id, UpdateGenreDtoRequest genreDto) {
        Genre genre = findById(id);

        genreMapper.update(genreDto, genre);

        return genreRepository.save(genre);
    }

    private Genre findById(Long id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new GenreNotFoundException(id));
    }
}
