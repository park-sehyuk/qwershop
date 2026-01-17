package com.example.qwershop.admin.orderManagement.mapper;

import com.example.qwershop.admin.orderManagement.dto.OrderDetailDto;
import com.example.qwershop.admin.orderManagement.dto.OrderItemDto;
import com.example.qwershop.admin.orderManagement.dto.OrderListDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderListMapper {
    // 관리자용 주문 전체 리스트 조회
    List<OrderListDto> selectAdminOrderList();

    // 1. 주문서 기본 정보 조회
    OrderDetailDto selectOrderDetail(int orderId);

    // 2. 해당 주문의 상품 리스트 조회
    List<OrderItemDto> selectOrderItems(int orderId);

    // 3. 주문 상태 업데이트
    void updateOrderStatus(@Param("orderId") int orderId, @Param("status") String status);
}

