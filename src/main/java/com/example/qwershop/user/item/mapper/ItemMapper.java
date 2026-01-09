package com.example.qwershop.user.item.mapper;

import com.example.qwershop.user.item.dto.ItemDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface ItemMapper {
    List<ItemDto> getItemList(@Param("type") Integer type, @Param("sort") String sort);
}