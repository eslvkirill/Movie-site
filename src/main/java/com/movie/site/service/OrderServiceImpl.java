package com.movie.site.service;

import com.movie.site.model.QOrder;
import com.movie.site.repository.OrderRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    public Map<LocalDate, Integer> findMonthlySales() {
        QOrder order = QOrder.order;
        LocalDateTime now = LocalDateTime.now();
        BooleanExpression inLastMonth = order.datetime.between(now.minusMonths(1), now);
        Map<LocalDate, Integer> res = new TreeMap<>();

        orderRepository.findAll(inLastMonth)
                .forEach(o -> res.merge(o.getDatetime().toLocalDate(),
                        o.getNumberOfDetails(),
                        Integer::sum));

        return res;
    }
}
