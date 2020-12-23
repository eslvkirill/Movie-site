package com.movie.site.model.id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class OrderDetailId implements Serializable {

    private Long orderId;
    private Long movieId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDetailId that = (OrderDetailId) o;
        if (!orderId.equals(that.orderId)) return false;
        return movieId.equals(that.movieId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, movieId);
    }

    @Override
    public String toString() {
        return "OrderDetailId{" +
                "orderId=" + orderId +
                ", movieId=" + movieId +
                '}';
    }
}
