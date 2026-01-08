package com.example.qwershop.admin.itemManagement.dto;

import lombok.Data;
import java.util.List;

@Data
public class ItemManagerDto {
    private Long itemId;
    private String itemName;
    private String itemBrand;
    private Integer itemPrice;
    private Integer itemStock;
    private String itemType;     // 화면의 "AVAILABLE" 등
    private String itemCategory; // 화면의 "남성상의-반팔" 등
    private String itemContent;

    // DB 입력용 숫자 필드
    private Integer dbType;
    private Integer dbCategory;

    // 화면에서 넘어오는 Base64 이미지 데이터 리스트
    private List<String> itemUrls;
}