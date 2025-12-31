package com.example.qwershop.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    @GetMapping("/admin/itemList")
    public String itemLlist(){
        return "/admin/post";
    }

    @GetMapping("/admin/userList")
    public String userList(){
        return "/admin/userList";
    }

    @GetMapping("/admin/category")
    public String category(){
        return "/admin/category";
    }

}
