package com.movie.site.repository;

import com.movie.site.model.*;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.Querydsl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class MovieRepositoryImpl implements MovieRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    private static final String MOVIE_VARIABLE = "movie";
    private static final String CART_DETAIL_ALIAS = "cartDetail";
    private static final String ORDER_DETAIL_ALIAS = "orderDetail";

    @Override
    public List<Movie> findAllByPossibleBuyer(User user, Pageable pageable) {
        Querydsl querydsl = new Querydsl(em, new PathBuilder<>(Movie.class, MOVIE_VARIABLE));
        JPQLQuery<Movie> query = querydsl.createQuery();
        QMovie movie = QMovie.movie;
        QCartDetail cartDetail = new QCartDetail(CART_DETAIL_ALIAS);

        query.from(movie)
                .join(movie.cartDetails, cartDetail)
                .where(cartDetail.id.user.eq(user));

        return querydsl.applyPagination(pageable, query)
                .fetch();
    }

    @Override
    public Page<Movie> findAllByOrder(Order order, Pageable pageable) {
        Querydsl querydsl = new Querydsl(em, new PathBuilder<>(Movie.class, MOVIE_VARIABLE));
        JPQLQuery<Movie> query = querydsl.createQuery();
        QMovie movie = QMovie.movie;
        QOrderDetail orderDetail = new QOrderDetail(ORDER_DETAIL_ALIAS);

        query.from(movie)
                .join(movie.orderDetails, orderDetail)
                .where(orderDetail.order.eq(order));
        System.out.println(query.toString());

        List<Movie> content = querydsl.applyPagination(pageable, query)
                .fetch();

        return new PageImpl<>(content, pageable, query.fetchCount());
    }
}
