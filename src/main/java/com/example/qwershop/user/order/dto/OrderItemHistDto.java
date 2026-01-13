package com.example.qwershop.user.order.dto;

import lombok.Data;

@Data
public class OrderItemHistDto {
    private String itemNm;
    private int count;
    private int orderPrice;
    private String imgUrl;
    private String selectedColor;
    private String selectedSize;
}
