package com.example.qwershop.user.cart.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CartDto {
    private int cartId;
    private int memberId;
    private int itemId;
    private int count;
    private String selectedColor;
    private String selectedSize;
    private LocalDateTime regTime;
    private LocalDateTime updateTime;
}
