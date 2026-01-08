package com.example.qwershop.user.item.mapper;

import com.example.qwershop.user.item.dto.ItemDto;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ItemMapper {
    List<ItemDto> getItemList(Integer type);
}
