package com.example.qwershop.admin.codeManagement.controller;

import com.example.qwershop.admin.codeManagement.service.CodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class CodeController {

    @Autowired
    private CodeService codeService;

    @GetMapping("/codeList")
    public String codeList(Model model) {
        model.addAttribute("groupList", codeService.getGroupCodeList());
        return "admin/codeList";
    }
}
