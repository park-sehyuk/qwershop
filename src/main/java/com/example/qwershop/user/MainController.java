package com.example.qwershop.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        return "user/index";
    }

    @GetMapping("/main")
    public String mianPage(){
        return "user/index";
    }

    @GetMapping("/user/login")
    public String login(){
        return "user/userLog/login";
    }

    // @GetMapping("/signUp") -> 삭제됨
    // @PostMapping("/signUp") -> 삭제됨

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