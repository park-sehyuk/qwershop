package com.example.qwershop.admin.itemManagement.dto;

import lombok.Data;

// 붕어빵 틀
@Data
public class CommonCodeDto {
    // 그룹 코드 정보
    private String groupCode;
    private String groupName;
    private String note ;

    
    // 상세 코드 정보
    private String detailCode;
    private String codeName;
    private Integer sortOrder;
    private String useYn;
}
