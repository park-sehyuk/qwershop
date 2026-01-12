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
    private Integer dbType;     // DB item_type 매핑
    private Integer dbCategory; // DB item_category 매핑
    private List<String> itemUrls;
    private String itemUrl;
    private String regTime;
}