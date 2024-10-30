package com.cerbo.Dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequest {
    private String code;
    private String email;
    private String newPassword;
}
