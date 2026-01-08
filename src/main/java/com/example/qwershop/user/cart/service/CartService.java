package com.example.qwershop.user.cart.service;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import com.example.qwershop.user.cart.dto.CartDto;
import com.example.qwershop.user.cart.mapper.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartMapper cartMapper;

    public void addCart(CartDto cartDto) {
        // 1. 이미 장바구니에 똑같은 옵션의 상품이 있는지 확인
        CartDto existItem = cartMapper.findCartItem(cartDto);

        if (existItem != null) {
            // 2. 있으면 수량만 업데이트 (기존 ID를 넘겨줌)
            cartDto.setCartId(existItem.getCartId());
            cartMapper.updateCartCount(cartDto);
        } else {
            // 3. 없으면 새로 인설트
            cartMapper.insertCart(cartDto);
        }
    }

    public List<CartDetailDto> getCartList(String userId) {
        return cartMapper.getCartList(userId);
    }
}