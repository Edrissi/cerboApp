package com.cerbo.Dto;

import lombok.Data;

@Data
public class UpdatePasswordRequest {
    public String oldPassword;
    public String newPassword;
}
