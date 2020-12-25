package com.movie.site.api;

import com.movie.site.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
@PreAuthorize("hasRole('ADMIN')")
public class OrderRestController {

    private final OrderService orderService;

    @GetMapping("/monthly-sales")
    public Map<LocalDate, Integer> getMonthlySales() {
        return orderService.findMonthlySales();
    }
}
