package com.cerbo.exception;


public class InvalidRegistrationCodeException extends RuntimeException {
    public InvalidRegistrationCodeException(String message) {
        super(message);
    }
}