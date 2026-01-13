package com.example.qwershop.admin.itemManagement.controller;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.service.ItemManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    public List<ItemManagerDto> getItemsApi() {
        return itemManagerService.getAllItems();
    }

    @PostMapping(value = "/admin/api/items", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    public ResponseEntity<String> addItem(
            @RequestPart("itemData") ItemManagerDto dto,
            @RequestPart(value="files", required=false) List<MultipartFile> files) {
        try {
            itemManagerService.saveItemWithFiles(dto, files);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록 실패: " + e.getMessage());
        }
    }

    @PatchMapping(value = "/admin/api/items/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> updateItemJson(
            @PathVariable("id") Long id,
            @RequestBody ItemManagerDto dto) {
        try {
            dto.setItemId(id);
            itemManagerService.updateItemWithFiles(dto, null);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수정 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/admin/api/items/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteItem(@PathVariable("id") Long id) {
        try {
            itemManagerService.deleteItemCompletely(id);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패: " + e.getMessage());
        }
    }
}