import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ConditionsAccordion({ onConditionsChange }) {
  const [checkedConditions, setCheckedConditions] = useState({
    confidentiality: false,
    conflictOfInterest: false,
    internalRegulations: false,
  });

  const handleCheckboxChange = (event) => {
    const updatedConditions = {
      ...checkedConditions,
      [event.target.name]: event.target.checked,
    };
    setCheckedConditions(updatedConditions);
    onConditionsChange(updatedConditions);
  };

  return (
    <div>
      <Accordion sx={{ mb: 1, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography >1- Respect de confidentialité</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Je m’engage à respecter la confidentialité de toutes les informations communiquées aux CERBO lors des examens des projets de recherche.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedConditions.confidentiality}
                onChange={handleCheckboxChange}
                name="confidentiality"
              />
            }
            label="J'accepte cette condition"
          />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mb: 1, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography >2- Déclaration du conflit d’intérêt</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Je m’engage à déclarer tout conflit d’intérêt potentiel et me retirer de l’examen du projet de recherche sujet de conflit sauf sur invitation des membres du CERBO.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedConditions.conflictOfInterest}
                onChange={handleCheckboxChange}
                name="conflictOfInterest"
              />
            }
            label="J'accepte cette condition"
          />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mb: 1, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
          <Typography >3-Déclaration du respect du règlement intérieur du CERBO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Je m’engage à respecter le règlement intérieur du CERBO et en cas d’un cumul de trois absences (3) consécutives ou cinq (5) absences sur l’année, mon adhésion au CERBO est automatiquement annulée.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedConditions.internalRegulations}
                onChange={handleCheckboxChange}
                name="internalRegulations"
              />
            }
            label="J'accepte cette condition"
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
