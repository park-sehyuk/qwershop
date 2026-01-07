package com.example.qwershop.user.main.controller;

import com.example.qwershop.user.main.dto.MainItemDto;
import com.example.qwershop.user.main.service.MainItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class MainItemController {

    private final MainItemService mainItemService;

    @GetMapping("/")
    public String main( @RequestParam(required = false) String suggBrand
                        , Model model){


        List<MainItemDto> suggItems;

        if (suggBrand == null) {
            // 기본 추천
            suggItems = mainItemService.findSuggItems();
        } else {
            // 브랜드 추천
            suggItems = mainItemService.getSuggItems(suggBrand);
        }

        model.addAttribute("bestItems", mainItemService.findBestItems());
        model.addAttribute("suggItems", suggItems);
        model.addAttribute("monthlyItems", mainItemService.findMonthlyItems());

        return "user/index";
    }

}
