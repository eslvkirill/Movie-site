package com.movie.site.api;

import com.movie.site.dto.request.CreateGenreDtoRequest;
import com.movie.site.dto.request.UpdateGenreDtoRequest;
import com.movie.site.dto.response.GenreDtoResponse;
import com.movie.site.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/genres")
public class GenreRestController {

    private final GenreService genreService;

    @GetMapping
    public Collection<GenreDtoResponse> getAll() {
        return genreService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody CreateGenreDtoRequest genreDto) {
        genreService.create(genreDto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @Valid @RequestBody UpdateGenreDtoRequest genreDto) {
        genreService.update(id, genreDto);
    }
}
