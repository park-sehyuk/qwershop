package com.example.qwershop.user.cart.dto;

import lombok.Data;

@Data
public class CartItemDto {

    private Long itemId;
    private int count;
    private String color;
    private String size;

}
