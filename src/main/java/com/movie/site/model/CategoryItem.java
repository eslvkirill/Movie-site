package com.movie.site.model;

import com.movie.site.model.id.CategoryItemId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category_item")
public class CategoryItem implements Serializable {

    @EmbeddedId
    private CategoryItemId id;

    public CategoryItem(User user, Movie movie, Category category) {
        this(new CategoryItemId(user, movie, category));
    }
}
