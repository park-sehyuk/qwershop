package com.example.qwershop.admin.itemManagement.mapper;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface ItemManagerMapper {
    // 상품 기본 정보 저장
    void insertItem(ItemManagerDto dto);

    // [중요] 파라미터 4개 (itemId, itemUrl, imgName, isMain)
    void insertItemImage(@Param("itemId") Long itemId,
                         @Param("itemUrl") String itemUrl,
                         @Param("imgName") String imgName,
                         @Param("isMain") String isMain);

    // 전체 목록 조회
    List<ItemManagerDto> findAllItems();

    // 상품 정보 수정
    void updateItemFull(ItemManagerDto dto);

    // 외래키 삭제 로직
    void deleteCartItems(Long itemId);
    void deleteItemOrders(Long itemId);
    void deleteItemImgs(Long itemId);
    void deleteItem(Long itemId);
}