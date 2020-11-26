package com.movie.site.model;

import com.movie.site.model.enums.AgeRating;
import com.movie.site.model.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalTime;
import java.util.Objects;
import java.util.Set;

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

    @ElementCollection(fetch = FetchType.EAGER)
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

    @OneToMany(mappedBy = "movie", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<SourceData> sourceData;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "movie_audio",
            joinColumns = @JoinColumn(name = "movie_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Set<Language> audio;

    @ElementCollection(fetch = FetchType.EAGER)
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

    @OneToMany(mappedBy = "movie", fetch = FetchType.LAZY)
    private Set<Review> reviews;

    public boolean containsReview(User user) {
        return reviews.stream()
                .anyMatch(elem -> elem.getUser().equals(user));
    }

    public boolean containsReview(Review review) {
        return reviews.contains(review);
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
