package com.cerbo.Dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RefDTO {
    private LocalDate date;
    private String ref;
}
