package com.movie.site.model;

import com.movie.site.model.id.OrderDetailId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_detail")
public class OrderDetail implements Serializable {

    @EmbeddedId
    private OrderDetailId id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @MapsId("orderId")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    @MapsId("movieId")
    private Movie movie;

    private int rank;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDetail that = (OrderDetail) o;
        if (!order.equals(that.order)) return false;
        return movie.equals(that.movie);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order, movie);
    }
}
