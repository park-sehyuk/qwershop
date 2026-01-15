package com.example.qwershop.admin.itemManagement.service;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.mapper.ItemManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

    // [중요] 사용자님의 실제 IP와 이미지 서버(8081) 주소
    private final String IMAGE_SERVER_URL = "http://192.168.33.233:8081/api/images/upload";

    /**
     * 상품 등록: 상품 정보 저장 후 이미지 전송
     */
    @Transactional
    public void saveItemWithFiles(ItemManagerDto dto, List<MultipartFile> files) {
        itemManagerMapper.insertItem(dto); // 상품 기본 정보 저장 (ID 생성됨)
        if (files != null && !files.isEmpty() && !files.get(0).isEmpty()) {
            handleFilesToImageServer(dto.getItemId(), files);
        }
    }

    /**
     * 상품 수정: 정보 업데이트 후, 새 파일이 있으면 기존 이미지 기록 삭제 후 재등록
     */
    @Transactional
    public void updateItemWithFiles(ItemManagerDto dto, List<MultipartFile> files) {
        // 1. 기본 정보(이름, 가격 등) 업데이트
        itemManagerMapper.updateItemFull(dto);

        // 2. 새 파일이 들어온 경우에만 기존 이미지 정보를 지우고 다시 업로드
        if (files != null && !files.isEmpty() && !files.get(0).isEmpty()) {
            // DB에서 기존 이미지 경로들 삭제
            itemManagerMapper.deleteItemImgs(dto.getItemId());
            // 이미지 서버로 전송 및 새 경로 저장
            handleFilesToImageServer(dto.getItemId(), files);
        }
    }

    /**
     * 상품 삭제: 연관된 모든 데이터(장바구니, 주문, 리뷰 등) 삭제 후 상품 삭제
     */
    @Transactional
    public void deleteItemCompletely(Long itemId) {
        if (itemId == null) return;

        try {
            // 외래 키 제약 조건 순서에 따라 삭제 (Mapper에 해당 ID들이 정의되어 있어야 함)
            itemManagerMapper.deleteCartItems(itemId);
            itemManagerMapper.deleteItemOrders(itemId);
            itemManagerMapper.deleteItemReviews(itemId);
            itemManagerMapper.deleteItemImgs(itemId);
            itemManagerMapper.deleteItem(itemId);

            System.out.println(">>> 삭제 완료: Item ID " + itemId);
        } catch (Exception e) {
            System.err.println(">>> 삭제 중 오류 발생: " + e.getMessage());
            throw e; // 트랜잭션 롤백
        }
    }

    /**
     * 이미지 서버(8081)로 파일을 전송하는 핵심 로직
     */
    private void handleFilesToImageServer(Long itemId, List<MultipartFile> files) {
        RestTemplate restTemplate = new RestTemplate();

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            if (file == null || file.isEmpty()) continue;

            try {
                // 1. 임시 파일 생성 (서버 운영체제의 임시 폴더 활용)
                String originalName = file.getOriginalFilename();
                File tempFile = new File(System.getProperty("java.io.tmpdir") + "/" + originalName);

                try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                    fos.write(file.getBytes());
                }

                // 2. 멀티파트 요청 헤더 및 바디 설정
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.MULTIPART_FORM_DATA);

                MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
                body.add("file", new FileSystemResource(tempFile));

                HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

                // 3. 8081 서버로 전송
                Map<String, Object> response = restTemplate.postForObject(IMAGE_SERVER_URL, requestEntity, Map.class);

                // 4. 응답받은 URL을 DB(item_images 테이블)에 저장
                if (response != null && response.containsKey("imageUrl")) {
                    String imageUrl = (String) response.get("imageUrl");
                    // 첫 번째 이미지를 대표이미지(Y)로 설정
                    String isMain = (i == 0) ? "Y" : "N";
                    itemManagerMapper.insertItemImage(itemId, imageUrl, originalName, isMain);
                    System.out.println(">>> 이미지 업로드 및 DB 저장 완료: " + imageUrl);
                }

                // 사용한 임시 파일 즉시 삭제
                if (tempFile.exists()) {
                    tempFile.delete();
                }

            } catch (Exception e) {
                System.err.println(">>> 파일 전송 중 에러 발생 (" + file.getOriginalFilename() + "): " + e.getMessage());
                throw new RuntimeException("이미지 서버 전송 실패: " + e.getMessage());
            }
        }
    }

    public List<ItemManagerDto> getAllItems() {
        return itemManagerMapper.findAllItems();
    }
}