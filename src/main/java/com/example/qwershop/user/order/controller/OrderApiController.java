package com.example.qwershop.user.order.controller;

import com.example.qwershop.user.member.mapper.MemberMapper;
import com.example.qwershop.user.order.dto.PaymentDto;
import com.example.qwershop.user.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderApiController {

    private final OrderService orderService;
    private final MemberMapper memberMapper; // 사용자의 PK를 찾기 위해 주입

    @PostMapping("/payment-complete")
    public ResponseEntity<String> paymentComplete(@RequestBody PaymentDto paymentDto, Principal principal) {
        String userId = principal.getName();

        // 1. userId를 이용해 DB에서 실제 member_id(PK)를 가져옵니다.
        // (memberMapper에 해당 메서드가 없다면 아래 2번 항목을 참고해서 만드세요)
        Long memberId = memberMapper.findMemberIdById(userId);

        if (memberId == null) {
            return ResponseEntity.badRequest().body("사용자 정보를 찾을 수 없습니다.");
        }

        try {
            // 2. 이제 memberId를 포함하여 서비스 호출
            orderService.processOrder(userId, memberId, paymentDto);
            return ResponseEntity.ok("주문 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("오류: " + e.getMessage());
        }
    }
}
