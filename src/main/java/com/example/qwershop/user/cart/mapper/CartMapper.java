
package com.example.qwershop.user.cart.mapper;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import com.example.qwershop.user.cart.dto.CartDto;
import com.example.qwershop.user.cart.dto.CartItemDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param; // 이 줄 추가
import java.util.List;

@Mapper
public interface CartMapper {
    List<CartDetailDto> getCartList(@Param("userId") String userId);

    Integer checkCartItem(@Param("itemId") Long itemId,
                          @Param("userId") String userId,
                          @Param("color") String color,
                          @Param("size") String size);

    // userId를 함께 전달하여 특정 사용자의 장바구니만 업데이트 하도록 수정
    void updateCartItemCount(@Param("dto") CartItemDto cartItemDto, @Param("userId") String userId);

    void insertCartItem(@Param("dto") CartItemDto cartItemDto, @Param("userId") String userId);

    // 1. 수량 직접 수정
    void updateCount(@Param("cartId") Long cartId, @Param("count") int count);

    // 2. 장바구니 개별 상품 삭제
    void deleteCartItem(@Param("cartId") Long cartId);

    // 3. 권한 체크 (내 장바구니가 맞는지 확인)
    int checkCartOwner(@Param("cartId") Long cartId, @Param("userId") String userId);
}