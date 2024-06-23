package com.cerbo.Dto;


import com.cerbo.models.ApplicationUser;
import lombok.Data;

import java.time.YearMonth;
import java.util.List;

@Data
public class ReunionReqDTO {
    private YearMonth date;
    private List<ApplicationUser> membersPresent;
}
