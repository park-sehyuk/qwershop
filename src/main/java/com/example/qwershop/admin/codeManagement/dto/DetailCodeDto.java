package com.example.qwershop.admin.codeManagement.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetailCodeDto {
    private int groupId;
    private String groupCode;
    private String codeName;
    private int sortOrder;
    private String useYn;
}
