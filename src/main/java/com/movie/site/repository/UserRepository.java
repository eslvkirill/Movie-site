package com.movie.site.repository;

import com.movie.site.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>,
        QuerydslPredicateExecutor<User> {

    @Query("from User u where u.email = :login or u.username = :login")
    Optional<User> findByLogin(String login);
}
