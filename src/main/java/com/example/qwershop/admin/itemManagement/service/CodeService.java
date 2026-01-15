package com.example.qwershop.admin.itemManagement.service;

import com.example.qwershop.admin.itemManagement.dto.CommonCodeDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.qwershop.admin.itemManagement.mapper.CodeMapper;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CodeService {


    @Autowired
    private final CodeMapper codeMapper;

    public List<CommonCodeDto> getGroupList() {

        List<CommonCodeDto> groupList = codeMapper.selectGroupList();

        //log.info("Retrieved group list with {} items", groupList);

        return groupList;
    }

    // 디테일 관련 이거 건드림될듯
    public List<CommonCodeDto> getDetailList(String groupCode) {


        return codeMapper.selectDetailList(groupCode);
    }
}
