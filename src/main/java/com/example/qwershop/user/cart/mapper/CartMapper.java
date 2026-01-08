
package com.example.qwershop.user.cart.mapper;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import com.example.qwershop.user.cart.dto.CartDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param; // 이 줄 추가
import java.util.List;

@Mapper
public interface CartMapper {
    List<CartDetailDto> getCartList(@Param("userId") String userId);

    // 장바구니 존재 여부 확인
    CartDto findCartItem(CartDto cartDto);

    // 수량 업데이트
    void updateCartCount(CartDto cartDto);

    // 신규 추가
    void insertCart(CartDto cartDto);
}