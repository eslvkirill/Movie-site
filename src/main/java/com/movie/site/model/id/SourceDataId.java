package com.movie.site.model.id;

import com.movie.site.model.Movie;
import com.movie.site.model.enums.Source;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class SourceDataId implements Serializable {

    @Enumerated(EnumType.STRING)
    private Source source;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @Override
    public String toString() {
        return "SourceDataId{" +
                "source=" + source +
                ", movie=" + movie.getId() +
                '}';
    }
}
