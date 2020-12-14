package com.movie.site.model.id;

import com.movie.site.model.Category;
import com.movie.site.model.Movie;
import com.movie.site.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CategoryItemId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryItemId that = (CategoryItemId) o;
        if (!user.getId().equals(that.user.getId())) return false;
        if (!movie.getId().equals(that.movie.getId())) return false;
        return category.getId().equals(that.category.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(user.getId(), movie.getId(), category.getId());
    }

    @Override
    public String toString() {
        return "CategoryItemId{" +
                "userId=" + user.getId() +
                ", movieId=" + movie.getId() +
                ", categoryId=" + category.getId() +
                '}';
    }
}
