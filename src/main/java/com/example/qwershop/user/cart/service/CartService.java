package com.example.qwershop.user.cart.service;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import com.example.qwershop.user.cart.mapper.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartMapper cartMapper;

    public List<CartDetailDto> getCartList(String userId) {
        return cartMapper.getCartList(userId);
    }
}