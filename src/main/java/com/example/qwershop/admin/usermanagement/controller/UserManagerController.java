package com.example.qwershop.admin.usermanagement.controller;

import com.example.qwershop.admin.usermanagement.dto.SelectUsersDto;
import com.example.qwershop.admin.usermanagement.service.UserManagerService;
import com.example.qwershop.user.member.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserManagerController {

    private final UserManagerService userManagerService;

    @GetMapping("/admin/userList")
    public String userList(Model model) {

        List<SelectUsersDto> userList = userManagerService.getAllUsers();

        log.info("userList 리턴된 유저 리스트 확인 : {}", userList);

        model.addAttribute("users", userList);
        return "admin/userList";
    }

    @GetMapping("/admin/userDetail/{id}")
    @ResponseBody
    public ResponseEntity<MemberDto> userDetail(@PathVariable("id") String id) {
        MemberDto user = userManagerService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}