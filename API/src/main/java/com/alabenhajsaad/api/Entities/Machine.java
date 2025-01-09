package com.alabenhajsaad.api.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id ;
    public String reference ;
    public String designation ;
    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)

    public Client client ;

    @OneToMany(mappedBy = "machine")
    @JsonIgnore
    public List<Reparation> reparations ;


}
