package com.movie.site.mapper;

import com.movie.site.dto.response.CategoryDtoResponse;
import com.movie.site.dto.response.GetAllMovieDtoResponse;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.dto.response.GetCartMovieDtoResponse;
import com.movie.site.model.Category;
import com.movie.site.model.Movie;
import com.movie.site.model.User;
import com.movie.site.service.CategoryService;
import com.movie.site.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.*;
import java.util.stream.Collectors;

public abstract class MovieMapperDecorator implements MovieMapper {

    @Autowired
    private MovieMapper delegate;

    @Autowired
    private RatingMapper ratingMapper;

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private CategoryService categoryService;

    @Override
    public GetByIdMovieDtoResponse toGetByIdDto(Movie movie, Pageable reviewPageable, User user) {
        GetByIdMovieDtoResponse movieDto = delegate.toGetByIdDto(movie, reviewPageable, user);
        movieDto.setReviews(reviewService.findAll(movie, reviewPageable));

        Optional.ofNullable(user)
                .ifPresent(u -> {
                    movieDto.setUserRating(ratingMapper.toRatingDto(movie.getRating(user)));
                    movieDto.setOperation(user.getMovieOperation(movie));

                    Map<CategoryDtoResponse, Boolean> relationToCategories = categoryService
                            .findAllLocal().stream()
                            .map(category -> Map.entry(categoryMapper.toDto(category),
                                    movie.containsCategoryItem(user, category)))
                            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

                    movieDto.setRelationToCategories(relationToCategories);
                });

        return movieDto;
    }

    @Override
    public Page<GetAllMovieDtoResponse> toGetAllDtoPage(Page<Movie> movies, User user) {
        Page<GetAllMovieDtoResponse> getAllDtoPage = delegate.toGetAllDtoPage(movies, user);
        Collection<Category> categories = categoryService.findAllLocal();

        Optional.ofNullable(user)
                .ifPresent(u -> {
                    Iterator<Movie> movieIterator = movies.iterator();
                    Iterator<GetAllMovieDtoResponse> movieDtoIterator = getAllDtoPage.iterator();

                    while (movieIterator.hasNext()) {
                        Movie currentMovie = movieIterator.next();
                        GetAllMovieDtoResponse currentMovieDto = movieDtoIterator.next();

                        Map<Long, Boolean> relationToCategories = categories.stream()
                                .map(category -> Map.entry(category.getId(),
                                        currentMovie.containsCategoryItem(user, category)))
                                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

                        currentMovieDto.setRelationToCategories(relationToCategories);
                        currentMovieDto.setOperation(user.getMovieOperation(currentMovie));
                    }
                });

        return getAllDtoPage;
    }

    @Override
    public List<GetCartMovieDtoResponse> toGetCartDtoList(Iterable<Movie> movies, User user) {
        List<GetCartMovieDtoResponse> getCartDtoList = delegate.toGetCartDtoList(movies, user);
        Collection<Category> categories = categoryService.findAllLocal();
        Iterator<Movie> movieIterator = movies.iterator();
        Iterator<GetCartMovieDtoResponse> movieDtoIterator = getCartDtoList.iterator();

        while (movieIterator.hasNext()) {
            Movie currentMovie = movieIterator.next();
            GetCartMovieDtoResponse currentMovieDto = movieDtoIterator.next();

            Map<Long, Boolean> relationToCategories = categories.stream()
                    .map(category -> Map.entry(category.getId(),
                            currentMovie.containsCategoryItem(user, category)))
                    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

            currentMovieDto.setRelationToCategories(relationToCategories);
        }

        return getCartDtoList;
    }
}
