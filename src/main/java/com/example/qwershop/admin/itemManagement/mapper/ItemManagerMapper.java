package com.example.qwershop.admin.itemManagement.mapper;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ItemManagerMapper {
    void insertItem(ItemManagerDto itemDto);
    List<ItemManagerDto> findAllItems();
    void updateItemFull(ItemManagerDto itemDto);
    void deleteItemImgs(Long itemId);
    void deleteItem(Long itemId);
}