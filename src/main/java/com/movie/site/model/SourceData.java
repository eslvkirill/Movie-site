package com.movie.site.model;

import com.movie.site.model.enums.Source;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "source_data")
public class SourceData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private float rating;

    @Enumerated(EnumType.STRING)
    private Source source;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SourceData that = (SourceData) o;
        return source == that.source &&
                movie.equals(that.movie);
    }

    @Override
    public int hashCode() {
        return Objects.hash(source, movie);
    }
}
