package com.cerbo.mapper;

import com.cerbo.Dto.PvReunionDto;
import com.cerbo.models.PvReunion;
import org.springframework.stereotype.Component;

@Component
public class PvReunionMapper {

    public PvReunion toEntity (PvReunionDto pvReunionDto){

        PvReunion pvReunion = new PvReunion();

        pvReunion.setDecision(pvReunionDto.getDecision());
        pvReunion.setCerboReference(pvReunionDto.getCerboReference());

        return pvReunion;
    }
    public PvReunionDto toDto(PvReunion pvReunion){
        PvReunionDto pvReunionDto = new PvReunionDto();

        pvReunionDto.setIdPvReunion(pvReunion.getIdPvReunion());
        pvReunionDto.setReunionId(pvReunion.getReunion().getId());
        pvReunionDto.setCerboReference(pvReunion.getCerboReference());
        pvReunionDto.setDecision(pvReunion.getDecision());

        return pvReunionDto;
    }
}
