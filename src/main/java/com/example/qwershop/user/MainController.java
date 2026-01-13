package com.example.qwershop.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {


    // [이동됨] /user/login -> LoginController로 이동

    @GetMapping("/find")
    public String find(){
        return "user/userLog/find";
    }

    @GetMapping("/findpw")
    public String findPw (){
        return "user/userLog/findPw";
    }

    
}