package com.example.qwershop.admin.itemManagement.controller;

import com.example.qwershop.admin.itemManagement.dto.CommonCodeDto;
import com.example.qwershop.admin.itemManagement.service.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CodeRestController {
    private final CodeService codeService;

    @GetMapping("/admin/api/codes/{groupCode}")
    public List<CommonCodeDto> getDetails(@PathVariable String groupCode) {
        return codeService.getDetailList(groupCode);
    }
}