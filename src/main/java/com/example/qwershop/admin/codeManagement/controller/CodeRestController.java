package com.example.qwershop.admin.codeManagement.controller;

import com.example.qwershop.admin.codeManagement.dto.DetailCodeDto;
import com.example.qwershop.admin.codeManagement.service.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/api")
public class CodeRestController {
    @Autowired
    private CodeService codeService;

    @GetMapping("/codes/{groupCode}")
    public List<DetailCodeDto> getDetailCodes(@PathVariable String groupCode) {
        return codeService.getDetailCodeList(groupCode);
    }

    @PatchMapping("/code/use-yn")
    public void updateUseYn(@RequestBody DetailCodeDto dto) {
        codeService.updateUseYn(dto);
    }

}
