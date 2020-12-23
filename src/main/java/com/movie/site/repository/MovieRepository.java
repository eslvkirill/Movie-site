package com.movie.site.repository;

import com.movie.site.model.Genre;
import com.movie.site.model.Movie;
import com.movie.site.model.QMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;

import java.util.Objects;

public interface MovieRepository extends JpaRepository<Movie, Long>,
        QuerydslPredicateExecutor<Movie>, QuerydslBinderCustomizer<QMovie>,
        MovieRepositoryCustom {

    @Override
    default void customize(QuerydslBindings bindings, QMovie root) {
        bindings.bind(root.genres).all((path, collection) -> collection.stream()
                .findFirst()
                .map(genres -> genres.stream()
                        .filter(Objects::nonNull)
                        .toArray(Genre[]::new))
                .map(genres -> path.any().in(genres)));
        bindings.bind(root.countries).all((path, collection) -> collection.stream()
                .findFirst()
                .map(countries -> countries.stream()
                        .filter(Objects::nonNull)
                        .toArray(String[]::new))
                .map(countries -> path.any().in(countries)));
    }
}
