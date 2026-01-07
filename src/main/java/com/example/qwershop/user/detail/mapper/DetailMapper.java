package com.example.qwershop.user.detail.mapper;

import com.example.qwershop.user.detail.dto.DetailDto;
import com.example.qwershop.user.detail.dto.GroupDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DetailMapper {

    // 상품 정보
    DetailDto selectItem(Long itemId);

    // color, size 정보
    List<GroupDto> groupType(String groupCode);

}
