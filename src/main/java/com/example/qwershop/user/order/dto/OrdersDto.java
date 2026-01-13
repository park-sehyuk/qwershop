package com.example.qwershop.user.order.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrdersDto {

    private Long orderId;         // order_id (PK, AI)
    private Long memberId;        // member_id (FK)
    private LocalDateTime orderDate;
    private String orderStatus;   // 결제상태 (예: PAID)
    private Long totalPrice;      // 총 결제 금액
    private String deliveryAddr;  // 배송지 주소

}
