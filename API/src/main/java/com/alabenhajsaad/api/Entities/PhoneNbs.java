package com.alabenhajsaad.api.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class PhoneNbs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id ;
    @Column(unique = true)
    public String number ;

    @ManyToOne
    @JsonIgnore
    private Client client;
}
