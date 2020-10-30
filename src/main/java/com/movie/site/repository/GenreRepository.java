package com.movie.site.repository;

import com.movie.site.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface GenreRepository extends JpaRepository<Genre, Long> {

    @Query("from Genre g where g.id in :ids")
    Set<Genre> findAllByIds(Iterable<Long> ids);
}
