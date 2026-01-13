package com.example.qwershop.user.order.dto;

import lombok.Data;

@Data
public class OrderDto {

    private Long itemOrderId;

    private Long orderId;

    private Long itemId;

    private Long orderPrice;

    private Long count;

    private String selectedColor;

    private String selectedSize;

}
