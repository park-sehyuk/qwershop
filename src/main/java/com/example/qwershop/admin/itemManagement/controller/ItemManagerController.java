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
    public String postListPage() {
        return "admin/post";
    }

    @GetMapping("/admin/addpost")
    public String addPostPage() {
        return "admin/addpost";
    }

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
            // 대표 이미지 인덱스 확인 로그
            System.out.println(">>> 선택된 대표 이미지 번호: " + dto.getMainImageIdx());

            itemManagerService.saveItemWithFiles(dto, files);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록 실패: " + e.getMessage());
        }
    }

    /**
     * 상품 수정 API
     * post.js의 saveEdit 함수에서 Multipart 전송을 위해 POST를 사용합니다.
     */
    @PostMapping(value = "/admin/api/items/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    public ResponseEntity<String> updateItem(
            @PathVariable("id") Long id,
            @RequestPart("itemData") ItemManagerDto dto,
            @RequestPart(value="files", required=false) List<MultipartFile> files) {
        try {
            System.out.println(">>> 상품 수정 요청 수신 (ID: " + id + ")");
            dto.setItemId(id); // URL 경로의 ID를 DTO에 강제 세팅하여 불일치 방지

            // 대표 이미지 인덱스 확인 로그
            System.out.println(">>> 수정 시 선택된 대표 이미지 번호: " + dto.getMainImageIdx());

            // 서비스 계층 호출 (이미지가 새로 들어오면 교체, 없으면 텍스트 정보만 수정)
            itemManagerService.updateItemWithFiles(dto, files);

            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(">>> 수정 오류: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수정 실패: " + e.getMessage());
        }
    }

    /**
     * 상품 삭제 API
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

