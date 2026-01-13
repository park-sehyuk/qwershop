package com.example.qwershop.user.member.controller;

import com.example.qwershop.user.member.constant.Role;
import com.example.qwershop.user.member.dto.MemberDto;
import com.example.qwershop.user.member.form.MemberJoinForm;
import com.example.qwershop.user.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // [/user/login/error] 메서드도 삭제했습니다. LoginController와 중복되면 안 됩니다.

    @GetMapping("/userUpdate")
    public String userUpdatePage(Principal principal, Model model) {
        if (principal == null) {
            return "redirect:/user/login";
        }

        String loginId = principal.getName();
        MemberDto memberDto = memberService.findMember(loginId);

        model.addAttribute("user", memberDto);
        return "user/userUpdate";
    }

    @PostMapping("/userUpdate")
    public String updateMember(@Valid MemberDto memberDto,
                               BindingResult bindingResult,
                               Model model,
                               RedirectAttributes rttr) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("user", memberDto);
            return "user/userUpdate";
        }

        try {
            memberService.updateMember(memberDto);
            rttr.addFlashAttribute("resultMessage", "정보가 수정되었습니다.");
            return "redirect:/";
        } catch (Exception e) {
            model.addAttribute("user", memberDto);
            model.addAttribute("errorMessage", e.getMessage());
            return "user/userUpdate";
        }
    }

    @PostMapping("/user/find-id")
    @ResponseBody
    public String findId(@RequestParam("name") String name,
                         @RequestParam("phone") String phone) {
        return memberService.findIdByNameAndPhone(name, phone);
    }

    @GetMapping("/find")
    public String find(){
        return "user/userLog/find";
    }

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
            dto.setPw(memberJoinForm.getPassword());
            dto.setName(memberJoinForm.getName());
            dto.setEmail(memberJoinForm.getEmail());
            dto.setAddress(memberJoinForm.getAddress());
            dto.setStatus(Role.USER);

            memberService.insertMember(dto);
            rttr.addFlashAttribute("resultMessage", "회원가입을 환영합니다.");
            return "redirect:/user/login";

        } catch (IllegalStateException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "user/userLog/signUp";
        }
    }
}