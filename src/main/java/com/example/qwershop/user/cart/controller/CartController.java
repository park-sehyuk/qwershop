package com.example.qwershop.user.cart.controller;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import com.example.qwershop.user.cart.dto.CartDto;
import com.example.qwershop.user.cart.dto.CartItemDto;
import com.example.qwershop.user.cart.service.CartService;
import com.example.qwershop.user.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final MemberService memberService;

    @GetMapping("/cart")
    public String cartPage(Principal principal, Model model) {
        if (principal == null) {
            return "redirect:/user/login";
        }

        String loginId = principal.getName();
        System.out.println("로그인한 아이디: " + loginId);

        List<CartDetailDto> cartItems = cartService.getCartList(loginId);
        System.out.println("조회된 아이템 개수: " + cartItems.size());

        int totalPrice = cartItems.stream()
                .mapToInt(item -> item.getPrice() * item.getCount())
                .sum();

        model.addAttribute("cartItems", cartItems);
        model.addAttribute("totalPrice", totalPrice);

        return "user/production/cart";
    }

    // 1. 장바구니 담기 요청 처리 (AJAX용)
    @PostMapping("/cart")
    public @ResponseBody ResponseEntity<?> addCart(@RequestBody CartItemDto cartItemDto, Principal principal) {
        // 로그인이 안 되어 있으면 401 에러 반환
        if (principal == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        try {
            // 여기서 서비스를 호출해야 실제 저장이 일어납니다!
            cartService.addCart(cartItemDto, principal.getName());
            return new ResponseEntity<>("장바구니에 추가되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // 서버 로그에 에러 출력
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 수량 수정
    @PatchMapping("/cartItem/{cartItemId}")
    public @ResponseBody ResponseEntity updateCartItem(@PathVariable("cartItemId") Long cartItemId,
                                                       @RequestParam("count") int count, // @RequestParam 추가
                                                       Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        if (count <= 0) {
            return new ResponseEntity<String>("최소 1개 이상 담아주세요.", HttpStatus.BAD_REQUEST);
        }

        // 서비스에서 내 장바구니가 맞는지 검증 후 수정하도록 로직 구성 (추천)
        if (!cartService.validateCartItem(cartItemId, principal.getName())) {
            return new ResponseEntity<String>("수정 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        cartService.updateCartItemCount(cartItemId, count);
        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
    }

    // 아이템 삭제
    @DeleteMapping("/cartItem/{cartItemId}")
    public @ResponseBody ResponseEntity deleteCartItem(@PathVariable("cartItemId") Long cartItemId,
                                                       Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        if (!cartService.validateCartItem(cartItemId, principal.getName())) {
            return new ResponseEntity<String>("삭제 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        cartService.deleteCartItem(cartItemId);
        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
    }



}