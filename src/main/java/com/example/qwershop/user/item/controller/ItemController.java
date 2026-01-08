package com.example.qwershop.user.item.controller;

import com.example.qwershop.user.item.dto.ItemDto; // Dto로 매칭
import com.example.qwershop.user.item.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; // 이 임포트가 반드시 있어야 합니다!
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/itemList")
    public String itemList(@RequestParam(name = "type", required = false) Integer type, Model model) {

        // ItemDto (소문자) 사용
        List<ItemDto> list = itemService.getItemList(type);

        model.addAttribute("itemList", list);
        model.addAttribute("selectedType", type);

        return "user/production/itemList";
    }
}