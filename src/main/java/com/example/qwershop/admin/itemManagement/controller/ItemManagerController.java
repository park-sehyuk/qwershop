package com.example.qwershop.admin.itemManagement.controller;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.service.ItemManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Controller
public class ItemManagerController {

    @Autowired
    private ItemManagerService itemManagerService;

    @GetMapping("/admin/itemList")
    public String postListPage() { return "admin/post"; }

    @GetMapping("/admin/addpost")
    public String addPostPage() { return "admin/addpost"; }

    @GetMapping("/admin/api/items")
    @ResponseBody
    public List<ItemManagerDto> getItemsApi() { return itemManagerService.getAllItems(); }

    // [추가] 제품 등록 API
    @PostMapping(value = "/admin/api/items", consumes = {"multipart/form-data"})
    @ResponseBody
    public ResponseEntity<String> addItem(
            @RequestPart("itemData") ItemManagerDto itemDto,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        itemManagerService.saveItemWithFiles(itemDto, files);
        return ResponseEntity.ok("success");
    }

    // [수정] 제품 수정 API
    @PatchMapping(value = "/admin/api/items/{id}", consumes = {"multipart/form-data"})
    @ResponseBody
    public ResponseEntity<String> updateItem(
            @PathVariable("id") Long id,
            @RequestPart("itemData") ItemManagerDto itemDto,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        itemDto.setItemId(id);
        itemManagerService.updateItemWithFiles(itemDto, files);
        return ResponseEntity.ok("success");
    }
}