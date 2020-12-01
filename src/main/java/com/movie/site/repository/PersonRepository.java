package com.movie.site.repository;

import com.movie.site.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query("from Person p where p.id in :ids")
    Set<Person> findAllByIds(Iterable<Long> ids);
}
