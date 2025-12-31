package com.example.qwershop.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/main")
    public String mianPage(){

        return "user/index";
    }

    @GetMapping("/login")
    public String login(){
        return "user/userLog/login";
    }

    @GetMapping("/signUp")
    public String singUp(){
        return "user/userLog/signUp";
    }

    @GetMapping("/find")
    public String find(){
        return "user/userLog/find";
    }

    @GetMapping("/findpw")
    public String findPw (){
        return "user/userLog/findPw";
    }

    @GetMapping("/search")
    public String search(){
        return "user/search/searchResult";
    }

    @GetMapping("/itemList")
    public String itemList(){
        return "user/production/itemList";
    }

    @GetMapping("/detail")
    public String detail(){
        return "user/production/detail";
    }
}
