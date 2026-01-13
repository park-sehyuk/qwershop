package com.example.qwershop.user.order.service;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import com.example.qwershop.user.cart.mapper.CartMapper;
import com.example.qwershop.user.order.dto.*;
import com.example.qwershop.user.order.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;
    private final CartMapper cartMapper;

    public void processOrder(String userId, Long memberId, PaymentDto paymentDto) {

        // 1. 장바구니에서 상세 정보 리스트 가져오기 (작성하신 getCartList 활용)
        List<CartDetailDto> cartDetailList = cartMapper.getCartList(userId);

        if (cartDetailList.isEmpty()) {
            throw new RuntimeException("장바구니가 비어 있어 주문을 진행할 수 없습니다.");
        }

        // 2. 주문 마스터(orders) 저장
        OrdersDto ordersDto = new OrdersDto();
        ordersDto.setMemberId(memberId);
        ordersDto.setTotalPrice((long) paymentDto.getPaid_amount());
        ordersDto.setOrderStatus("PAID"); // 결제 완료 상태
        ordersDto.setDeliveryAddr("기본 주소"); // 필요시 결제 폼에서 전달받음

        orderMapper.insertOrder(ordersDto); // MyBatis가 저장 후 ordersDto에 orderId를 채워줌

        // 3. 장바구니 리스트를 주문 상세(item_order) 테이블로 하나씩 저장
        for (CartDetailDto cart : cartDetailList) {
            OrderDto detail = new OrderDto();
            detail.setOrderId(ordersDto.getOrderId());

            // cart.getCartId() 대신 추가한 itemId를 사용합니다.
            detail.setItemId(cart.getItemId());

            detail.setOrderPrice((long) cart.getPrice());
            detail.setCount((long) cart.getCount());
            detail.setSelectedColor(cart.getSelectedColor());
            detail.setSelectedSize(cart.getSelectedSize());

            orderMapper.insertOrderItem(detail);
            cartMapper.deleteAllCartItems(memberId);
        }
    }

    public List<OrderHistDto> getOrderHistory(Long memberId) {
        return orderMapper.getOrderHistory(memberId);
    }

    public OrdersDto getOrderMaster(Long orderId) {
        return orderMapper.getOrderMaster(orderId);
    }

    public List<OrderItemHistDto> getOrderItemList(Long orderId) {
        return orderMapper.getOrderItemList(orderId);
    }
}
