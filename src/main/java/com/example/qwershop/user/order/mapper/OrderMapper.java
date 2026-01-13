package com.example.qwershop.user.order.mapper;

import com.example.qwershop.user.order.dto.OrderHistDto;
import com.example.qwershop.user.order.dto.OrderItemHistDto;
import com.example.qwershop.user.order.dto.OrdersDto;
import com.example.qwershop.user.order.dto.OrderDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderMapper {

    // 1. 주문 마스터 저장 (생성된 PK를 OrderVo에 자동으로 채워줌)
    int insertOrder(OrdersDto ordersDto);

    // 2. 주문 상세 저장 (상품 한 건씩 반복 저장)
    int insertOrderItem(OrderDto orderDto);

    List<OrderHistDto> getOrderHistory(Long memberId);

    // 주문 마스터 정보 (기존 OrdersDto 활용)
    OrdersDto getOrderMaster(Long orderId);

    // 주문 상품 리스트 (기존 OrderItemHistDto 활용)
    List<OrderItemHistDto> getOrderItemList(Long orderId);

}



