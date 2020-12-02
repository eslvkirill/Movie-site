package com.movie.site.model;

import com.movie.site.model.id.RatingId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating implements Serializable {

    @EmbeddedId
    private RatingId id;

    @EqualsAndHashCode.Exclude
    private float value;

    public void setId(User user, Movie movie) {
        id = new RatingId(user, movie);
    }

    public User getUser() {
        return id.getUser();
    }

    public Movie getMovie() {
        return id.getMovie();
    }

    @PrePersist
    @PreUpdate
    @PreRemove
    public void beforeAnyPreOperation() {
        Movie movie = getMovie();
        movie.setTotalRating((float) movie.getRatings().stream()
                .mapToDouble(Rating::getValue)
                .average()
                .orElse(0));
    }
}
