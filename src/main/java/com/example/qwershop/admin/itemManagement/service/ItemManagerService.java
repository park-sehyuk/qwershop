package com.example.qwershop.admin.itemManagement.service;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.mapper.ItemManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ItemManagerService {

    @Autowired
    private ItemManagerMapper itemManagerMapper;

    // 팀 프로젝트 환경에 맞춰 팀원이 파주는 경로로 나중에 수정하세요.
    private final String uploadPath = "C:/shop/uploads/";

    @Transactional
    public void saveItemWithFiles(ItemManagerDto dto, List<MultipartFile> files) {
        // 상품 정보 먼저 저장 (DB에서 GeneratedKey 등을 사용한다면 그 값을 받아야 함)
        itemManagerMapper .insertItem(dto);
        handleFiles(dto.getItemId(), files);
    }

    @Transactional
    public void updateItemWithFiles(ItemManagerDto dto, List<MultipartFile> files) {
        itemManagerMapper.updateItemFull(dto);
        if (files != null && !files.isEmpty() && !files.get(0).isEmpty()) {
            itemManagerMapper.deleteItemImgs(dto.getItemId());
            handleFiles(dto.getItemId(), files);
        }
    }

    private void handleFiles(Long itemId, List<MultipartFile> files) {
        if (files == null) return;
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            if (file.isEmpty()) continue;
            String savedName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            try {
                File target = new File(uploadPath, savedName);
                if (!target.getParentFile().exists()) target.getParentFile().mkdirs();
                file.transferTo(target);
                itemManagerMapper.insertItemImage(itemId, "/images/" + savedName, i == 0 ? "Y" : "N");
            } catch (IOException e) { throw new RuntimeException(e); }
        }
    }

    public List<ItemManagerDto> getAllItems() { return itemManagerMapper.findAllItems(); }
}