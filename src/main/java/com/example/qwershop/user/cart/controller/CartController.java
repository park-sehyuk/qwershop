package com.example.qwershop.user.cart.controller;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import com.example.qwershop.user.cart.dto.CartDto;
import com.example.qwershop.user.cart.service.CartService;
import com.example.qwershop.user.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final MemberService memberService;

    @PostMapping("/add")
    public ResponseEntity addCart(@RequestBody CartDto cartDto, Principal principal) {

        if (principal == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        try {
            // 1. 로그인한 사용자의 고유 ID(int)를 찾아와서 셋팅
            // principal.getName()은 아이디(String)이므로 DB에서 PK를 조회해야 함
            int memberId = memberService.getMemberId(principal.getName());
            cartDto.setMemberId(memberId);

            // 2. 장바구니 서비스 호출
            cartService.addCart(cartDto);

            return new ResponseEntity<>("장바구니에 담겼습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cart")
    public String cartPage(Principal principal, Model model) {
        if (principal == null) {
            return "redirect:/user/login";
        }

        String loginId = principal.getName();

        List<CartDetailDto> cartItems = cartService.getCartList(loginId);

        int totalPrice = cartItems.stream()
                .mapToInt(item -> item.getPrice() * item.getCount())
                .sum();

        model.addAttribute("cartItems", cartItems);
        model.addAttribute("totalPrice", totalPrice);

        return "user/production/cart";
    }
}