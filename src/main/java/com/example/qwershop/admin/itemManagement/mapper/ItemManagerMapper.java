package com.example.qwershop.admin.itemManagement.mapper;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ItemManagerMapper {
    // 상품 기본 정보 저장
    int insertItem(ItemManagerDto itemDto);

    // 상품 이미지 정보 저장 (imgName 파라미터 추가)
    int insertImg(@Param("itemId") Long itemId,
                  @Param("url") String url,
                  @Param("imgName") String imgName,
                  @Param("isMain") String isMain);
}