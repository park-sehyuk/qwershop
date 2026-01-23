package com.example.qwershop.admin.itemManagement.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class ItemManagerDto {
    private Long itemId;
    private String itemName;
    private String itemBrand;
    private Integer itemPrice;
    private Integer itemStock;
    private Integer dbCategory;
    private Integer dbType;
    private String regTime;
    private String itemUrl;
    private List<String> imageNames; // 갤러리 파일명 담는 리스트
}