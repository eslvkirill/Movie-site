package com.movie.site.api;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.model.enums.AgeRating;
import com.movie.site.model.enums.Language;
import com.movie.site.service.CountryService;
import com.movie.site.service.GenreService;
import com.movie.site.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Map;
import java.util.OptionalLong;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movies")
public class MovieRestController {

    private final MovieService movieService;
    private final CountryService countryService;
    private final GenreService genreService;

    @GetMapping("/saving")
    public Map<String, Object> save(@RequestParam(required = false) OptionalLong id) {
        return Map.of("countries", countryService.findAll(),
                "ageRatings", AgeRating.values(),
                "languages", Language.values(),
                "genres", genreService.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @ModelAttribute CreateMovieDtoRequest movieDto) {
        Movie movie = movieService.create(movieDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequestUri()
                .path("/{id}")
                .buildAndExpand(movie.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetByIdMovieDtoResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.findById(id));
    }
}
