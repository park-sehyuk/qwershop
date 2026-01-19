package com.example.qwershop.admin.itemManagement.mapper;

import com.example.qwershop.admin.itemManagement.dto.CommonCodeDto;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface CodeMapper {
    // 모든 그룹 코드 조회
    List<CommonCodeDto> selectGroupList();
    
    // 특정 그룹에 속한 상세 코드 조회
    // 디테일 관련 이거 건드림될듯
    List<CommonCodeDto> selectDetailList(String groupCode);
}
