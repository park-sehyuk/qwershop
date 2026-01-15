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

    // 관리자 페이지 매핑
    @GetMapping("/admin/itemList")
    public String postListPage() { return "admin/post"; }

    @GetMapping("/admin/addpost")
    public String addPostPage() { return "admin/addpost"; }

    /**
     * 전체 상품 목록 조회 API
     */
    @GetMapping("/admin/api/items")
    @ResponseBody
    public List<ItemManagerDto> getItemsApi() {
        return itemManagerService.getAllItems();
    }

    /**
     * 상품 등록 API (이미지 서버 8081 연동)
     */
    @PostMapping(value = "/admin/api/items", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    public ResponseEntity<String> addItem(
            @RequestPart("itemData") ItemManagerDto dto,
            @RequestPart(value="files", required=false) List<MultipartFile> files) {
        try {
            System.out.println(">>> 상품 등록 요청 수신: " + dto.getItemName());
            itemManagerService.saveItemWithFiles(dto, files);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록 실패: " + e.getMessage());
        }
    }

    /**
     * 상품 수정 API (이미지 포함 시 Multipart 처리를 위해 POST 사용)
     * post.js의 saveEdit 함수와 매핑됩니다.
     */
    @PostMapping(value = "/admin/api/items/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    public ResponseEntity<String> updateItem(
            @PathVariable("id") Long id,
            @RequestPart("itemData") ItemManagerDto dto,
            @RequestPart(value="files", required=false) List<MultipartFile> files) {
        try {
            System.out.println(">>> 상품 수정 요청 수신 (ID: " + id + ")");
            dto.setItemId(id); // URL의 ID를 DTO에 세팅

            // 서비스 계층 호출 (이미지가 있으면 교체, 없으면 정보만 수정)
            itemManagerService.updateItemWithFiles(dto, files);

            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(">>> 수정 오류: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수정 실패: " + e.getMessage());
        }
    }

    /**
     * 상품 삭제 API (관련 이미지 기록 및 연관 데이터 전체 삭제)
     */
    @DeleteMapping("/admin/api/items/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteItem(@PathVariable("id") Long id) {
        try {
            System.out.println(">>> 상품 삭제 요청 수신 (ID: " + id + ")");
            itemManagerService.deleteItemCompletely(id);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패: " + e.getMessage());
        }
    }
}

