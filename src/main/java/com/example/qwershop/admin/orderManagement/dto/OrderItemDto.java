package com.example.qwershop.admin.orderManagement.dto;

import lombok.Data;

@Data
public class OrderItemDto {
    private String itemName;
    private int orderPrice;
    private int count;
    private String selectedColor;
    private String selectedSize;
}
