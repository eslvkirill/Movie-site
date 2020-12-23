package com.movie.site.model;

import com.movie.site.model.enums.MovieOperation;
import com.movie.site.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user", schema = "public")
public class User implements Serializable, UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String username;
    private boolean active;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "id.user", fetch = FetchType.EAGER,
            cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartDetail> cart;

    @OneToMany(mappedBy = "id.user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CategoryItem> categoryItems;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Order> orders;

    public boolean addToCart(Movie movie) {
        int maxRank = cart.stream()
                .mapToInt(CartDetail::getRank)
                .max()
                .orElse(0);
        CartDetail cartDetail = new CartDetail(this, movie, maxRank + 1);

        return cart.add(cartDetail);
    }

    public boolean removeFromCart(Movie movie) {
        CartDetail cartDetail = new CartDetail(this, movie);

        return cart.remove(cartDetail);
    }

    public void clearCart() {
        cart.clear();
    }

    public boolean isCartEmpty() {
        return cart.isEmpty();
    }

    public long calcCartTotalPrice() {
        return cart.stream()
                .mapToLong(cartDetail -> cartDetail.getMovie().getPrice())
                .sum();
    }

    public MovieOperation getMovieOperation(Movie movie) {
        CartDetail cartDetail = new CartDetail(this, movie);

        return cart.contains(cartDetail) ? MovieOperation.REMOVE :
                hasAlreadyBoughtMovie(movie) ? MovieOperation.WATCH : MovieOperation.ADD;
    }

    public boolean addCategoryItem(Category category, Movie movie) {
        CategoryItem categoryItem = new CategoryItem(this, movie, category);

        return categoryItems.add(categoryItem);
    }

    public boolean removeCategoryItem(Category category, Movie movie) {
        CategoryItem categoryItem = new CategoryItem(this, movie, category);

        return categoryItems.remove(categoryItem);
    }

    public void addOrder(Order order) {
        orders.add(order);

        clearCart();
    }

    public boolean hasAlreadyBoughtMovie(Movie movie) {
        return orders.stream()
                .flatMap(order -> order.getDetails().stream())
                .map(OrderDetail::getMovie)
                .collect(Collectors.toSet())
                .contains(movie);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Optional.ofNullable(role)
                .map(Collections::singletonList)
                .orElseGet(Collections::emptyList);
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return email.equals(user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);
    }
}
