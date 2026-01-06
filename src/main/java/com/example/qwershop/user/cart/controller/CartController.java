package com.example.qwershop.user.cart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CartController {

    @GetMapping("/cart")
    public String cartPage() {
        return "user/production/cart"; // templates/userLog/cart.html 을 실행함
    }
}
//
//    @GetMapping("/order")
//    public String orderPage() {
//        return "production/order"; // 주문 페이지로 이동
//    }
//}
