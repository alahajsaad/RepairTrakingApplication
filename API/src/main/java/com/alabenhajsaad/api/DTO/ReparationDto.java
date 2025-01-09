package com.alabenhajsaad.api.DTO;

import jakarta.validation.constraints.NotNull;

public record ReparationDto(@NotNull int machineId,
                            String callNumber,
                            String description) {
}
