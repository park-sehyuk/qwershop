package com.example.qwershop.user.cart.controller;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import com.example.qwershop.user.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

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
}