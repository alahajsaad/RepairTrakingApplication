package com.alabenhajsaad.api.Exceptions;

public class MachineNotFoundException extends RuntimeException {
    public MachineNotFoundException(String message) {
        super(message);
    }
}

