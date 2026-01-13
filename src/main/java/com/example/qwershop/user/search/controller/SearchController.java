package com.example.qwershop.user.search.controller;

import com.example.qwershop.user.main.dto.MainItemDto;
import com.example.qwershop.user.main.service.MainItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class SearchController {

    private final MainItemService mainItemService;

    @GetMapping("/search")
    public String search(@RequestParam(value = "query", required = false, defaultValue = "") String query, Model model) {

        List<MainItemDto> searchResults = mainItemService.searchItems(query);

        model.addAttribute("searchResults", searchResults);
        model.addAttribute("query", query);

        return "user/search/searchResult";
    }
}