package com.movie.site.model;

import com.movie.site.model.enums.Source;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "source_data")
public class SourceData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private float rating;

    @Enumerated(EnumType.STRING)
    private Source source;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Movie movie;
}
