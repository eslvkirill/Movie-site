package com.movie.site.api;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.dto.request.CreateReviewDtoRequest;
import com.movie.site.dto.request.UpdateReviewDtoRequest;
import com.movie.site.dto.response.GetAllMovieDtoResponse;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.dto.response.ReviewDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.model.enums.AgeRating;
import com.movie.site.model.enums.Language;
import com.movie.site.service.CountryService;
import com.movie.site.service.GenreService;
import com.movie.site.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public ResponseEntity<GetByIdMovieDtoResponse> getById(
            @PathVariable Long id,
            @PageableDefault(size = 3, sort = "datetime") Pageable reviewPageable) {
        return ResponseEntity.ok(movieService.findById(id, reviewPageable));
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
        return movieService.findAllReviews(id, pageable);
    }

    @GetMapping("/{id}/reviews/verification")
    @PreAuthorize("isAuthenticated()")
    public boolean hasAlreadyWrittenReview(@PathVariable Long id) {
        return movieService.hasAlreadyWrittenReview(id);
    }

    @GetMapping
    public Slice<GetAllMovieDtoResponse> getAll(
            @PageableDefault(size = 9, sort = "id") Pageable pageable) {
        return movieService.findAll(pageable);
    }
}
