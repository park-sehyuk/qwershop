package com.example.qwershop.admin.itemManagement.mapper;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ItemManagerMapper {

    // 상품 기본 정보 저장
    void insertItem(ItemManagerDto dto);

    // 이미지 저장 (파라미터 4개 일치 확인)
    void insertItemImage(@Param("itemId") Long itemId,
                         @Param("itemUrl") String itemUrl,
                         @Param("imgName") String imgName,
                         @Param("isMain") String isMain);

    // 전체 목록 조회
    List<ItemManagerDto> findAllItems();

    // 상품 정보 수정
    void updateItemFull(ItemManagerDto dto);

    // [삭제 로직] 자식 테이블들 순차 삭제
    void deleteCartItems(Long itemId);
    void deleteItemOrders(Long itemId);
    void deleteItemReviews(Long itemId); // 리뷰 삭제 추가
    void deleteItemImgs(Long itemId);
    void deleteItem(Long itemId);
}
