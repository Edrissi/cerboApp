package com.cerbo.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PvReunionDto {
    private Long idPvReunion;
    private Long reunionId;
    private String cerboReference;
    private String decision;
}
