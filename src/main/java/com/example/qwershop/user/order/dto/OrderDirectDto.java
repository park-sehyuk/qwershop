package com.example.qwershop.user.order.dto;

import lombok.Data;

@Data
public class OrderDirectDto {

    private Long itemId;
    private Long count;
    private String selectedColor;
    private String selectedSize;
    private Long totalPrice;
    private String deliveryAddr;

}
