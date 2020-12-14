package com.movie.site.model;

import com.movie.site.model.enums.MovieOperation;
import com.movie.site.model.enums.Role;
import com.movie.site.model.id.CategoryItemId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "cart_detail",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id"))
    private Set<Movie> cart;

    @OneToMany(mappedBy = "id.user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CategoryItem> categoryItems;

    public boolean addToCart(Movie movie) {
        return cart.add(movie);
    }

    public boolean removeFromCart(Movie movie) {
        return cart.remove(movie);
    }

    public void clearCart() {
        cart.clear();
    }

    public MovieOperation getMovieOperation(Movie movie) {
        return cart.contains(movie) ? MovieOperation.REMOVE : MovieOperation.ADD;
    }

    public boolean addCategoryItem(Category category, Movie movie) {
        CategoryItem categoryItem = new CategoryItem(this, movie, category);

        return categoryItems.add(categoryItem);
    }

    public boolean removeCategoryItem(Category category, Movie movie) {
        CategoryItem categoryItem = new CategoryItem(this, movie, category);

        return categoryItems.remove(categoryItem);
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
