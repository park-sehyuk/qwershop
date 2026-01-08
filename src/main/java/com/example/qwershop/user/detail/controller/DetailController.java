package com.example.qwershop.user.detail.controller;

import com.example.qwershop.user.detail.dto.DetailDto;
import com.example.qwershop.user.detail.dto.GroupDto;
import com.example.qwershop.user.detail.service.Detailservice;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class DetailController {

    private final Detailservice detailservice;

    @GetMapping(value="/detail/{itemId}")
    public String detail(@PathVariable Long itemId
                        , Model model){

        DetailDto item = detailservice.viewItem(itemId);
        List<GroupDto> color = detailservice.findColor();
        List<GroupDto> size = detailservice.findSize();

        model.addAttribute("item", item);
        model.addAttribute("colors", color);
        model.addAttribute("sizes", size);

        return "user/production/detail";
    }
}
