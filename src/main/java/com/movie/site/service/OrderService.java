package com.movie.site.service;

import java.time.LocalDate;
import java.util.Map;

public interface OrderService {

    Map<LocalDate, Integer> findMonthlySales();
}
