package com.movie.site.api;

import com.movie.site.dto.request.*;
import com.movie.site.dto.response.GetAllMovieDtoResponse;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.dto.response.ReviewDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.model.enums.AgeRating;
import com.movie.site.model.enums.Language;
import com.movie.site.service.CountryService;
import com.movie.site.service.GenreService;
import com.movie.site.service.MovieService;
import com.movie.site.service.PersonService;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movies")
public class MovieRestController {

    private final MovieService movieService;
    private final CountryService countryService;
    private final GenreService genreService;
    private final PersonService personService;

    @GetMapping("/saving")
    public Map<String, Object> save(@RequestParam(required = false) Optional<Long> id) {
        HashMap<String, Object> response = new HashMap<>();
        response.put("countries", countryService.findAll());
        response.put("ageRatings", AgeRating.values());
        response.put("languages", Language.values());
        response.put("genres", genreService.findAll());
        response.put("people", personService.findAll());
        response.put("current", id.map(movieService::findById).orElse(null));

        return response;
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid CreateMovieDtoRequest movieDto) {
        Movie movie = movieService.create(movieDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequestUri()
                .path("/{id}")
                .buildAndExpand(movie.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public GetByIdMovieDtoResponse getById(
            @PathVariable Long id,
            @PageableDefault(size = 3, sort = "datetime") Pageable reviewPageable) {
        return movieService.findById(id, reviewPageable);
    }

    @PostMapping("/{id}/reviews")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewDtoResponse> addReview(
            @PathVariable Long id,
            @Valid @RequestBody CreateReviewDtoRequest reviewDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(movieService.addReview(id, reviewDto));
    }

    @PutMapping("/{movieId}/reviews/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public void updateReview(@PathVariable Long movieId,
                             @PathVariable Long reviewId,
                             @Valid @RequestBody UpdateReviewDtoRequest reviewDto) {
        movieService.updateReview(movieId, reviewId, reviewDto);
    }

    @DeleteMapping("/{movieId}/reviews/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public void removeReview(@PathVariable Long movieId,
                             @PathVariable Long reviewId) {
        movieService.removeReview(movieId, reviewId);
    }

    @GetMapping("/{id}/reviews")
    public Page<ReviewDtoResponse> getReviews(
            @PathVariable Long id,
            @PageableDefault(size = 3, sort = "datetime") Pageable pageable) {
        return movieService.findReviews(id, pageable);
    }

    @GetMapping
    public Page<GetAllMovieDtoResponse> getAll(
            @PageableDefault(size = 9) Pageable pageable,
            @Valid GetAllMovieDtoRequest movieDto,
            @QuerydslPredicate(root = Movie.class) Predicate predicate) {
        return movieService.findAll(predicate, pageable);
    }

    @PostMapping("/{id}/ratings")
    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Number> addRating(@PathVariable Long id,
                                         @Valid @RequestBody CreateRatingDtoRequest ratingDto) {
        Movie movie = movieService.addRating(id, ratingDto);

        return Map.of("totalRating", movie.getTotalRating(),
                "numberOfRatings", movie.numberOfRatings());
    }

    @PutMapping("/{id}/ratings")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Number> updateRating(@PathVariable Long id,
                                            @Valid @RequestBody UpdateRatingDtoRequest ratingDto) {
        Movie movie = movieService.updateRating(id, ratingDto);

        return Map.of("totalRating", movie.getTotalRating(),
                "numberOfRatings", movie.numberOfRatings());
    }

    @DeleteMapping("/{id}/ratings")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Number> removeRating(@PathVariable Long id) {
        Movie movie = movieService.removeRating(id);

        return Map.of("totalRating", movie.getTotalRating(),
                "numberOfRatings", movie.numberOfRatings());
    }

    @GetMapping("/filters")
    public Map<String, Object> getFilters() {
        return Map.of("countries", countryService.findAll(),
                "genres", genreService.findAll(),
                "directors", personService.findDirectors());
    }

    @PostMapping("/{id}")
    public void update(@PathVariable Long id,
                       @Valid UpdateMovieDtoRequest movieDto) {
        movieService.update(id, movieDto);
    }

    @PostMapping("/{id}/activity")
    public void updateActivity(@PathVariable Long id) {
        movieService.updateActivity(id);
    }

    @GetMapping("/bestsellers")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Integer> getBestsellers(@PageableDefault(size = 5) Pageable pageable) {
        return movieService.findBestsellers(pageable);
    }
}
