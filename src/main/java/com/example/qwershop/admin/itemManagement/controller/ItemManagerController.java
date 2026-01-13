package com.example.qwershop.admin.itemManagement.controller;

import com.example.qwershop.admin.itemManagement.service.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequiredArgsConstructor
public class ItemManagerController {

    private final CodeService codeService;

    //@GetMapping("/admin/itemList")
// ... existing code ...
//    @GetMapping("/admin/category")
//    public String category(){
//        return "admin/category";
//    }

    // group_code 테이블 데이터 호출 api
    @GetMapping("/admin/codeList")
    public String codeList(Model model) {
        model.addAttribute("groupList", codeService.getGroupList());
        return "admin/codeList";
    }

}
