package com.example.qwershop.user.item.controller;

import com.example.qwershop.user.item.dto.ItemDto;
import com.example.qwershop.user.item.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/itemList")
    public String itemList(@RequestParam(name = "type", required = false) Integer type,
                           @RequestParam(name = "sort", required = false, defaultValue = "latest") String sort,
                           Model model) {

        List<ItemDto> list = itemService.getItemList(type, sort); // sort 추가 전달

        model.addAttribute("itemList", list);
        model.addAttribute("selectedType", type);
        model.addAttribute("currentSort", sort); // 현재 정렬 상태 보존

        return "user/production/itemList";
    }
}