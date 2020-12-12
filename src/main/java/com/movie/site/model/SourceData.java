package com.movie.site.model;

import com.movie.site.model.enums.Source;
import com.movie.site.model.id.SourceDataId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "source_data")
public class SourceData implements Serializable {

    @EmbeddedId
    private SourceDataId id;

    private String url;
    private float rating;

    public Source getSource() {
        return id.getSource();
    }

    public Movie getMovie() {
        return id.getMovie();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SourceData that = (SourceData) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
