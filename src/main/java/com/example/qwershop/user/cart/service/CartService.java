package com.example.qwershop.user.cart.service;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import com.example.qwershop.user.cart.dto.CartDto;
import com.example.qwershop.user.cart.dto.CartItemDto;
import com.example.qwershop.user.cart.mapper.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartMapper cartMapper;

    public void addCart(CartItemDto cartItemDto, String userId) {
        // 1. 이미 장바구니에 있는지 확인
        Integer count = cartMapper.checkCartItem(
                cartItemDto.getItemId(), userId, cartItemDto.getColor(), cartItemDto.getSize()
        );

        if (count != null && count > 0) {
            // 2. 존재하면 수량만 더하기 (userId 추가 전달)
            cartMapper.updateCartItemCount(cartItemDto, userId);
        } else {
            // 3. 존재하지 않으면 신규 추가
            cartMapper.insertCartItem(cartItemDto, userId);
        }
    }

    public void updateCartItemCount(Long cartId, int count) {
        cartMapper.updateCount(cartId, count);
    }

    // 삭제 로직
    public void deleteCartItem(Long cartId) {
        cartMapper.deleteCartItem(cartId);
    }

    // 장바구니 아이템 소유자 확인 (보안)
    @Transactional(readOnly = true)
    public boolean validateCartItem(Long cartId, String userId) {
        int count = cartMapper.checkCartOwner(cartId, userId);
        return count > 0;
    }

    public List<CartDetailDto> getCartList(String userId) {
        return cartMapper.getCartList(userId);
    }
}