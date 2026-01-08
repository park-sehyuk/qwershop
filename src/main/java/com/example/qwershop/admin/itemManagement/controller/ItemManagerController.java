package com.example.qwershop.admin.itemManagement.controller;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.service.ItemManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class ItemManagerController {

    @Autowired
    private ItemManagerService itemManagerService;

    // 주소를 /addpost로 통일
    @GetMapping("/addpost")
    public String addPostPage() {
        // templates/admin/addpost.html 파일을 찾게 됩니다.
        return "admin/addpost";
    }

    @PostMapping("/addpost")
    public String addPost(@ModelAttribute ItemManagerDto itemDto) {
        System.out.println("=======================================");
        System.out.println("컨트롤러 수신 데이터: " + itemDto);
        System.out.println("=======================================");

        itemManagerService.registerItem(itemDto);

        return "redirect:/admin/postlist";
    }
}