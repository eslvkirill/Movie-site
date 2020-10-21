package com.movie.site.api;

import com.movie.site.dto.response.GenreDtoResponse;
import com.movie.site.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
