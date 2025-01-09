package com.alabenhajsaad.api.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Reparation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String callNumber ;
    private String description ;
    private LocalDate entryDate ;
    private LocalDate releaseDate ;
    @Column(columnDefinition = "TEXT")
    private String descriptionTravail;

    @ManyToOne
    private Machine machine ;


}
