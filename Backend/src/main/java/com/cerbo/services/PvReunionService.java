package com.cerbo.services;

import com.cerbo.Dto.PvReunionDto;
import com.cerbo.Dto.PvReunionResponse;
import com.cerbo.mapper.PvReunionMapper;
import com.cerbo.models.PvReunion;
import com.cerbo.models.Reunion;
import com.cerbo.repository.PvReunionRepository;
import com.cerbo.repository.ReunionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PvReunionService {
    @Autowired
    private ReunionRepository reunionRepository;

    @Autowired
    private PvReunionRepository pvReunionRepository;

    @Autowired
    PvReunionMapper pvReunionMapper;

    public void savePvReunion(Long idReunion, String cerboReference, String decision, boolean isNew){

        Reunion reunion = reunionRepository.findById(idReunion).orElseThrow(
                ()-> new RuntimeException("Reunion not found")
        );

        PvReunion pvReunion = new PvReunion();

        pvReunion.setCerboReference(cerboReference);
        pvReunion.setReunion(reunion);
        pvReunion.setDecision(decision);
        pvReunion.setNew(isNew);

        pvReunionRepository.save(pvReunion);
    }

    public List<PvReunionDto> getPvReunionDetails(Long idReunion){

        Reunion reunion = reunionRepository.findById(idReunion).orElseThrow(
                ()-> new RuntimeException("Reunion not found")
        );
        List<PvReunion> pvReunionList = pvReunionRepository.findByReunion(reunion).orElseThrow(
                ()-> new RuntimeException("PvReunion details not found")
        );

        return pvReunionList.stream().map(pvReunion -> pvReunionMapper.toDto(pvReunion)).toList();
    }
    public PvReunionResponse getAllPvReunions(Long idReunion){
        PvReunionResponse pvReunionResponse = new PvReunionResponse();
        Reunion reunion = reunionRepository.findById(idReunion).orElseThrow(
                ()-> new RuntimeException("Reunion not found")
        );
        List<PvReunion> pvReunionList = pvReunionRepository.findByReunion(reunion).orElseThrow(
                ()-> new RuntimeException("PvReunion details not found")
        );

        List<PvReunionDto> pvReunionDtoListForNewProjects = pvReunionList.stream().filter(PvReunion::isNew).map(pvReunion -> pvReunionMapper.toDto(pvReunion)).toList();
        List<PvReunionDto> pvReunionDtoListForOldProjects = pvReunionList.stream().filter(PvReunion -> !PvReunion.isNew()).map(pvReunion -> pvReunionMapper.toDto(pvReunion)).toList();

        pvReunionResponse.setPvReunionDtoListForNewProjects(pvReunionDtoListForNewProjects);
        pvReunionResponse.setPvReunionDtoListForOldProjects(pvReunionDtoListForOldProjects);
        return  pvReunionResponse;
    }
}
