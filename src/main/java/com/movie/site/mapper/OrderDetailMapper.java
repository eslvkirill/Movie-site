package com.movie.site.mapper;

import com.movie.site.model.CartDetail;
import com.movie.site.model.Order;
import com.movie.site.model.OrderDetail;
import com.movie.site.model.id.OrderDetailId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.data.util.StreamUtils;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(imports = OrderDetailId.class)
public interface OrderDetailMapper {

    @Mappings({
            @Mapping(target = "id", expression = "java(new OrderDetailId())"),
            @Mapping(target = "order", source = "order"),
            @Mapping(target = "movie", expression = "java(cartDetail.getMovie())"),
    })
    OrderDetail toEntity(CartDetail cartDetail, Order order);

    default Set<OrderDetail> toEntitySet(Iterable<CartDetail> cartDetails, Order order) {
        return StreamUtils.createStreamFromIterator(cartDetails.iterator())
                .map(cartDetail -> toEntity(cartDetail, order))
                .collect(Collectors.toSet());
    }
}
