package com.example.qwershop.admin.itemManagement.mapper;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface ItemManagerMapper {
    List<ItemManagerDto> findAllItems();
    void insertItem(ItemManagerDto dto); // 신규 추가
    void updateItem(ItemManagerDto dto);
    void deleteItemImages(Long itemId);
    void insertItemImage(
            @Param("itemId") Long itemId,
            @Param("fileName") String fileName,
            @Param("isMain") String isMain
    );
    void deleteItem(Long itemId);
}