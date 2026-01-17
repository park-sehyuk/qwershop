package com.example.qwershop.admin.orderManagement.service;

import com.example.qwershop.admin.orderManagement.dto.OrderDetailDto;
import com.example.qwershop.admin.orderManagement.dto.OrderListDto;
import com.example.qwershop.admin.orderManagement.mapper.OrderListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderListService {

    @Autowired
    private OrderListMapper orderListMapper;

    public List<OrderListDto> getAdminOrderList() {
        return orderListMapper.selectAdminOrderList();
    }

    public OrderDetailDto getOrderDetail(int orderId) {
        OrderDetailDto detail = orderListMapper.selectOrderDetail(orderId);
        if(detail != null) {
            detail.setOrderItems(orderListMapper.selectOrderItems(orderId));
        }
        return detail;
    }

    public void updateStatus(int orderId, String status) {
        orderListMapper.updateOrderStatus(orderId, status);
    }
}
