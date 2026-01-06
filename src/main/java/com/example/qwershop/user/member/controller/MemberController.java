package com.example.qwershop.user.member.controller;

import com.example.qwershop.user.member.constant.Role;
import com.example.qwershop.user.member.dto.MemberDto;
import com.example.qwershop.user.member.form.MemberJoinForm;
import com.example.qwershop.user.member.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MemberController {
    @Autowired
    private MemberService memberService;
    @PostMapping("/new")
    public String newMember(@Valid MemberJoinForm memberJoinForm,
                            BindingResult bindingResult,
                            Model model,
                            RedirectAttributes rttr) {

        if (bindingResult.hasErrors()) {
            return "user/userLog/signUp";
        }

        try {
            MemberDto dto = new MemberDto();
            dto.setId(memberJoinForm.getId());

            // 1. DTO 필드명이 pw이므로 setPw로 수정
            dto.setPw(memberJoinForm.getPassword());

            dto.setName(memberJoinForm.getName());
            dto.setEmail(memberJoinForm.getEmail());
            dto.setAddress(memberJoinForm.getAddress());

            // 2. DTO 필드명이 status이므로 setStatus로 수정
            dto.setStatus(Role.USER);

            memberService.insertMember(dto);

            rttr.addFlashAttribute("resultMessage", "회원가입을 환영합니다.");

        } catch (IllegalStateException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "user/userLog/signUp";
        }

        return "redirect:/";
    }
}
