package com.example.qwershop.admin;

import com.example.qwershop.admin.itemManagement.service.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class AdminController {

    private final CodeService codeService;

    @GetMapping("/admin/itemList")
    public String itemLlist(){
        return "admin/post";
    }


    @GetMapping("/admin/category")
    public String category(){
        return "admin/category";
    }

//    @GetMapping("/admin/codeList")
//    public String codeList(Model model) {
//        model.addAttribute("groupList", codeService.getGroupList());
//        return "admin/codeList";
//    }

}
