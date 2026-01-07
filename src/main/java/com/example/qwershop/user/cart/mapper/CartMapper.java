
package com.example.qwershop.user.cart.mapper;

import com.example.qwershop.user.cart.dto.CartDetailDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param; // 이 줄 추가
import java.util.List;

@Mapper
public interface CartMapper {
    List<CartDetailDto> getCartList(@Param("userId") String userId);
}