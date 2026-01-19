package com.example.qwershop.admin.itemManagement.service;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.mapper.ItemManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;

@Service
public class ItemManagerService {

    @Autowired
    private ItemManagerMapper itemManagerMapper;

    @Value("${image-server.upload-url}")
    private String imageServerUrl;

    /**
     * 상품 등록: 상품 정보 저장 후 이미지 전송
     */
    @Transactional
    public void saveItemWithFiles(ItemManagerDto dto, List<MultipartFile> files) {
        itemManagerMapper.insertItem(dto);
        if (files != null && !files.isEmpty() && !files.get(0).isEmpty()) {
            // dto에 담긴 mainImageIdx를 함께 전달
            handleFilesToImageServer(dto.getItemId(), files, dto.getMainImageIdx());
        }
    }

    /**
     * 상품 수정: 정보 업데이트 후, 새 파일이 있으면 기존 이미지 기록 삭제 후 재등록
     */
    @Transactional
    public void updateItemWithFiles(ItemManagerDto dto, List<MultipartFile> files) {
        itemManagerMapper.updateItemFull(dto);

        if (files != null && !files.isEmpty() && !files.get(0).isEmpty()) {
            itemManagerMapper.deleteItemImgs(dto.getItemId());
            // 수정 시에도 선택한 대표 이미지 인덱스 적용
            handleFilesToImageServer(dto.getItemId(), files, dto.getMainImageIdx());
        }
    }

    /**
     * 상품 삭제
     */
    @Transactional
    public void deleteItemCompletely(Long itemId) {
        if (itemId == null) return;
        try {
            itemManagerMapper.deleteCartItems(itemId);
            itemManagerMapper.deleteItemOrders(itemId);
            itemManagerMapper.deleteItemReviews(itemId);
            itemManagerMapper.deleteItemImgs(itemId);
            itemManagerMapper.deleteItem(itemId);
            System.out.println(">>> 삭제 완료: Item ID " + itemId);
        } catch (Exception e) {
            System.err.println(">>> 삭제 중 오류 발생: " + e.getMessage());
            throw e;
        }
    }

    /**
     * 이미지 서버(8081)로 파일을 전송하는 핵심 로직
     * @param mainImageIdx 사용자가 화면에서 선택한 대표 이미지 번호
     */
    private void handleFilesToImageServer(Long itemId, List<MultipartFile> files, Integer mainImageIdx) {
        RestTemplate restTemplate = new RestTemplate();

        // 인덱스 값이 넘어오지 않았을 경우를 대비해 기본값 0 세팅
        int targetMainIdx = (mainImageIdx != null) ? mainImageIdx : 0;

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            if (file == null || file.isEmpty()) continue;

            try {
                String originalName = file.getOriginalFilename();
                File tempFile = new File(System.getProperty("java.io.tmpdir") + "/" + originalName);

                try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                    fos.write(file.getBytes());
                }

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.MULTIPART_FORM_DATA);

                MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
                body.add("file", new FileSystemResource(tempFile));

                HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
                Map<String, Object> response = restTemplate.postForObject(imageServerUrl, requestEntity, Map.class);

                if (response != null && response.containsKey("imageUrl")) {
                    String imageUrl = (String) response.get("imageUrl");

                    // 핵심 로직: 현재 루프 인덱스(i)가 사용자가 선택한 대표 인덱스(targetMainIdx)와 같으면 'Y'
                    String isMain = (i == targetMainIdx) ? "Y" : "N";

                    itemManagerMapper.insertItemImage(itemId, imageUrl, originalName, isMain);
                    System.out.println(">>> [" + isMain + "] 이미지 업로드 성공: " + imageUrl);
                }

                if (tempFile.exists()) {
                    tempFile.delete();
                }

            } catch (Exception e) {
                System.err.println(">>> 파일 전송 중 에러 발생: " + e.getMessage());
                throw new RuntimeException("이미지 서버 전송 실패: " + e.getMessage());
            }
        }
    }

    public List<ItemManagerDto> getAllItems() {
        return itemManagerMapper.findAllItems();
    }
}