package com.example.qwershop.user.item.dto;

import lombok.Data;

@Data
public class ItemDto {
    private int itemId;
    private String itemName;
    private int itemType;
    private String itemBrand;
    private int itemPrice;
    private int itemStock;
    private int itemCategory;
    private String itemUrl;
}