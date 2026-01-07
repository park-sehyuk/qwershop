package com.example.qwershop.user.detail.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupDto {

    private Long groupId;

    private String groupCode;

    private String codeName;

    private Long sortOrder;

    private String useYn;

}
