package com.example.qwershop.admin.codeManagement.mapper;

import com.example.qwershop.admin.codeManagement.dto.DetailCodeDto;
import com.example.qwershop.admin.codeManagement.dto.GroupCodeDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CodeMapper {

    List<GroupCodeDto> selectGroupCodeList();

    List<DetailCodeDto> selectDetailCodeList(String groupCode);

    void updateDetailUseYn(DetailCodeDto dto);

}
