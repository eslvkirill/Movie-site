package com.movie.site.model;

import com.movie.site.model.id.CartDetailId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cart_detail")
public class CartDetail implements Serializable {

    @EmbeddedId
    private CartDetailId id;

    @EqualsAndHashCode.Exclude
    private int rank;

    public CartDetail(User user, Movie movie) {
        this(user, movie, 0);
    }

    public CartDetail(User user, Movie movie, int rank) {
        this(new CartDetailId(user, movie), rank);
    }
}
