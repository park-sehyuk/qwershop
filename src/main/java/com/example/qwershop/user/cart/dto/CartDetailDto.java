package com.example.qwershop.user.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartDetailDto {
    private int cartId;
    private Long itemId;
    private String itemNm;      // item 테이블에서 가져옴
    private int price;        // item 테이블에서 가져옴
    private int count;        // cart 테이블의 수량
    private String imgUrl;    // 상품 이미지 경로
    private String selectedColor;
    private String selectedSize;
}