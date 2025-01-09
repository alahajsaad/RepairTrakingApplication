package com.alabenhajsaad.api.DTO;

import jakarta.validation.constraints.NotNull;


public record MachineDto(String reference,
                         String designation,
                         @NotNull int ClientId) {
}
