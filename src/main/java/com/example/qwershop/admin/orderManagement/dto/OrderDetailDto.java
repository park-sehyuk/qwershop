package com.example.qwershop.admin.orderManagement.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDetailDto {
    // 주문 기본 정보 (orders 테이블)
    private int orderId;
    private LocalDateTime orderDate;
    private String orderStatus;
    private int totalPrice;


    // 주문자 정보 (member 테이블)
    private String memberName;
    private String memberLoginId;
    private String memberPhone;
    private String memberEmail;
    private String address;

    // 주문 상품 목록 (item_order + item 조인 결과들)
    private List<OrderItemDto> orderItems;
}
