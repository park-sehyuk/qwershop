package com.example.qwershop.admin.codeManagement.service;

import com.example.qwershop.admin.codeManagement.dto.DetailCodeDto;
import com.example.qwershop.admin.codeManagement.dto.GroupCodeDto;
import com.example.qwershop.admin.codeManagement.mapper.CodeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodeService {

    @Autowired
    private CodeMapper codeMapper;

    public List<GroupCodeDto> getGroupCodeList() {
        return codeMapper.selectGroupCodeList();
    }

    public List<DetailCodeDto> getDetailCodeList(String groupCode) {
        return codeMapper.selectDetailCodeList(groupCode);
    }

    public void updateUseYn(DetailCodeDto dto) {
        codeMapper.updateDetailUseYn(dto);
    }

}
