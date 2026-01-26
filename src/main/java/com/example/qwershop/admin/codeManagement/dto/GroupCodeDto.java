package com.example.qwershop.admin.codeManagement.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupCodeDto {

    private String groupCode;
    private String groupName;
    private String note;
    private int sortOrder;
    private String useYn;

}
