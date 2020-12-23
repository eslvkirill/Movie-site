package com.movie.site.mapper;

import com.movie.site.model.Order;
import com.movie.site.model.User;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class OrderMapperDecorator implements OrderMapper {

    @Autowired
    private OrderMapper delegate;

    @Autowired
    private OrderDetailMapper orderDetailMapper;

    @Override
    public Order toEntity(User user) {
        Order order = delegate.toEntity(user);
        order.setDetails(orderDetailMapper.toEntitySet(user.getCart(), order));

        return order;
    }
}
