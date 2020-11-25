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
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    @Override
    @Transactional(readOnly = true)
    public Collection<GenreDtoResponse> findAll() {
        return genreMapper.toDtoList(genreRepository.findAll(Sort.by("id")));
    }

    @Override
    public GenreDtoResponse create(CreateGenreDtoRequest genreDto) {
        return genreMapper.toDto(genreRepository.save(genreMapper.toEntity(genreDto)));
    }

    @Override
    public GenreDtoResponse update(Long id, UpdateGenreDtoRequest genreDto) {
        Genre genre = findById(id);

        genreMapper.update(genreDto, genre);

        return genreMapper.toDto(genreRepository.save(genre));
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Genre> findAllByIds(Iterable<Long> ids) {
        Set<Genre> genres = genreRepository.findAllByIds(ids);

        if (genres.isEmpty()) {
            throw new GenreNotFoundException(ids);
        }

        return genres;
    }

    private Genre findById(Long id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new GenreNotFoundException(id));
    }
}
