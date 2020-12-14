package com.movie.site.model;

import com.movie.site.model.enums.AgeRating;
import com.movie.site.model.enums.Language;
import com.movie.site.model.enums.Source;
import com.movie.site.model.id.RatingId;
import com.movie.site.model.id.SourceDataId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalTime;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String engTitle;
    private String rusTitle;

    @ElementCollection
    @CollectionTable(name = "movie_country",
            joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "country")
    private Set<String> countries;

    private int year;
    private String posterKey;
    private String backgroundKey;
    private String pageColor1;
    private String pageColor2;
    private String tagline;
    private String plot;

    @OneToMany(mappedBy = "id.movie", cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<SourceData> sourceData;

    @ElementCollection
    @CollectionTable(name = "movie_audio",
            joinColumns = @JoinColumn(name = "movie_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Set<Language> audio;

    @ElementCollection
    @CollectionTable(name = "movie_subtitle",
            joinColumns = @JoinColumn(name = "movie_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Set<Language> subtitles;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private Set<Genre> genres;

    @Enumerated(EnumType.STRING)
    private AgeRating ageRating;

    private String trailerUrl;
    private int oscars;
    private int price;
    private boolean active;
    private LocalTime time;

    @OneToMany(mappedBy = "movie")
    private Set<Review> reviews;

    @OneToMany(mappedBy = "id.movie", cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<Rating> ratings;

    private float totalRating;

    @ManyToMany
    @JoinTable(name = "actor",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "person_id"))
    private Set<Person> actors;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "director",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "person_id"))
    private Set<Person> directors;

    @ManyToMany(mappedBy = "cart")
    private Set<User> possibleBuyers;

    @OneToMany(mappedBy = "id.movie")
    private Set<CategoryItem> categoryItems;

    public boolean containsReview(User user) {
        Review review = new Review();
        review.setUser(user);
        review.setMovie(this);

        return containsReview(review);
    }

    public boolean containsReview(Review review) {
        return reviews.contains(review);
    }

    public boolean addRating(Rating rating) {
        return ratings.add(rating);
    }

    public boolean removeRatingById(RatingId ratingId) {
        Rating rating = new Rating();
        rating.setId(ratingId);

        return removeRating(rating);
    }

    public boolean removeRating(Rating rating) {
        return ratings.remove(rating);
    }

    public int numberOfRatings() {
        return ratings.size();
    }

    public Rating getRating(User user) {
        return ratings.stream()
                .filter(rating -> rating.getUser().equals(user))
                .findFirst()
                .orElse(null);
    }

    public SourceData getSourceData(Source source) {
        return sourceData.stream()
                .filter(sd -> sd.getSource().equals(source))
                .findFirst()
                .orElse(null);
    }

    public void addSourceData(String url, float rating, Source source) {
        this.sourceData.add(SourceData.builder()
                .id(new SourceDataId(source, this))
                .url(url)
                .rating(rating)
                .build());
    }

    public void removeAllSourceData(Set<Source> sources) {
        sourceData.removeAll(sourceData.stream()
                .filter(sd -> sources.contains(sd.getSource()))
                .collect(Collectors.toSet()));
    }

    public boolean containsCategoryItem(User user, Category category) {
        return categoryItems.contains(new CategoryItem(user, this, category));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return year == movie.year &&
                engTitle.equals(movie.engTitle);
    }

    @Override
    public int hashCode() {
        return Objects.hash(engTitle, year);
    }
}
