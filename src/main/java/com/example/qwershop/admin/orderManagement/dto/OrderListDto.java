package com.example.qwershop.admin.orderManagement.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderListDto {

    // orders 테이블 컬럼
    private int orderId;
    private int memberId;
    private LocalDateTime orderDate;
    private String orderStatus;
    private int totalPrice;

    // 조인 또는 로직을 통해 추가할 필드
    private String memberName;     // m.name 매핑
    private String memberLoginId;  // m.id 매핑
    private String firstItemName;
    private int itemCount;
}
