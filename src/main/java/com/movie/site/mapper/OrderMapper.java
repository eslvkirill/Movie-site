package com.movie.site.mapper;

import com.movie.site.dto.response.OrderDtoResponse;
import com.movie.site.model.Order;
import com.movie.site.model.User;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(uses = OrderDetailMapper.class, imports = LocalDateTime.class)
@DecoratedWith(OrderMapperDecorator.class)
public interface OrderMapper {

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "user", source = "user"),
            @Mapping(target = "datetime", expression = "java(LocalDateTime.now())"),
            @Mapping(target = "totalPrice", expression = "java(user.calcCartTotalPrice())")
    })
    Order toEntity(User user);

    OrderDtoResponse toDto(Order order);

    List<OrderDtoResponse> toDtoList(Iterable<Order> orders);
}
