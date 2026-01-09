package com.example.qwershop.admin.itemManagement.mapper;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface ItemManagerMapper {
    // 상품 및 이미지 등록
    int insertItem(ItemManagerDto itemDto);
    int insertImg(@Param("itemId") Long itemId, @Param("url") String url, @Param("imgName") String imgName, @Param("isMain") String isMain);

    // 조회, 수정, 삭제 (추가된 기능)
    List<ItemManagerDto> findAllItems();
    int updateItemName(@Param("itemId") Long itemId, @Param("itemName") String itemName);
    int deleteItemImgs(Long itemId);
    int deleteItem(Long itemId);
}