package com.example.qwershop.user.order.controller;

import com.example.qwershop.user.member.mapper.MemberMapper;
import com.example.qwershop.user.order.dto.OrderHistDto;
import com.example.qwershop.user.order.dto.PaymentDto;
import com.example.qwershop.user.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final MemberMapper memberMapper;

    @GetMapping("/orderList")
    public String orderList(Principal principal, Model model) {
        if (principal == null) return "redirect:/login";

        String userId = principal.getName();
        Long memberId = memberMapper.findMemberIdById(userId);

        // 회원의 모든 주문 내역 가져오기 (Service에 메서드 추가 필요)
        List<OrderHistDto> orderHistList = orderService.getOrderHistory(memberId);

        model.addAttribute("orders", orderHistList);
        return "user/order/orderList"; // templates/order/orderList.html
    }

    @GetMapping("/orderDetail/{orderId}") // /list/detail 대신 /order/detail 로 변경
    public String orderDetail(@PathVariable("orderId") Long orderId, Model model) {
        model.addAttribute("order", orderService.getOrderMaster(orderId));
        model.addAttribute("orderItems", orderService.getOrderItemList(orderId));
        return "user/order/orderDetail";
    }
}
