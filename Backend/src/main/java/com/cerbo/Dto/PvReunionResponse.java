package com.cerbo.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PvReunionResponse {
    List<PvReunionDto> pvReunionDtoListForNewProjects;
    List<PvReunionDto> pvReunionDtoListForOldProjects;
}
