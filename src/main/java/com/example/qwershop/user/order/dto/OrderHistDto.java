package com.example.qwershop.user.order.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderHistDto {

    private Long orderId;
    private String orderDate;
    private String itemNm;
    private String orderStatus;
    private Long totalPrice;
    private List<OrderItemHistDto> orderItems; // 상세 상품 리스트
}
