package com.example.qwershop.admin.itemManagement.mapper;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface ItemManagerMapper {
    // 상품 기본 정보 관련
    void insertItem(ItemManagerDto itemDto);
    List<ItemManagerDto> findAllItems();
    void updateItemFull(ItemManagerDto itemDto);
    void deleteItem(Long itemId);

    // 이미지 관련 (기존 DTO 활용 방식)
    void deleteItemImgs(Long itemId);

    // 개별 파라미터로 처리하여 추가 DTO 생성을 방지
    void insertItemImage(@Param("itemId") Long itemId,
                         @Param("itemUrl") String itemUrl,
                         @Param("isMain") String isMain);
}