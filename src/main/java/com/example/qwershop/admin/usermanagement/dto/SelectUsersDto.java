package com.example.qwershop.admin.usermanagement.dto;

import com.example.qwershop.user.member.constant.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SelectUsersDto {

    private Long member_id;
    private String id;
    private String pw;
    private String name;
    private String phone;
    private String email;
    private String address;
    private String gender;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birth;
    private Role status;
    private LocalDateTime req_Time;

}
