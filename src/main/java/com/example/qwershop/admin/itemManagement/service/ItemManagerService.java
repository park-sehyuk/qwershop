package com.example.qwershop.admin.itemManagement.service;

import com.example.qwershop.admin.itemManagement.dto.ItemManagerDto;
import com.example.qwershop.admin.itemManagement.mapper.ItemManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.util.List;
import java.util.UUID;

@Service
public class ItemManagerService {
    @Autowired
    private ItemManagerMapper itemManagerMapper;

    private final String uploadPath = "C:/shop/uploads/";

    @Transactional
    public void saveItemWithFiles(ItemManagerDto dto, List<MultipartFile> files) {
        itemManagerMapper.insertItem(dto);
        if (files != null && !files.isEmpty()) {
            handleFiles(dto.getItemId(), files);
        }
    }

    @Transactional
    public void updateItemWithFiles(ItemManagerDto dto, List<MultipartFile> files) {
        itemManagerMapper.updateItemFull(dto);
        if (files != null && !files.isEmpty() && !files.get(0).isEmpty()) {
            itemManagerMapper.deleteItemImgs(dto.getItemId());
            handleFiles(dto.getItemId(), files);
        }
    }

    @Transactional
    public void deleteItemCompletely(Long itemId) {
        if (itemId == null) return;
        itemManagerMapper.deleteCartItems(itemId);
        itemManagerMapper.deleteItemOrders(itemId);
        itemManagerMapper.deleteItemImgs(itemId);
        itemManagerMapper.deleteItem(itemId);
    }

    private void handleFiles(Long itemId, List<MultipartFile> files) {
        if (files == null || itemId == null) return;
        File dir = new File(uploadPath);
        if (!dir.exists()) dir.mkdirs();

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            if (file == null || file.isEmpty()) continue;

            String savedName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            try {
                file.transferTo(new File(uploadPath, savedName));
                // [체크] 4개의 파라미터를 보냅니다.
                itemManagerMapper.insertItemImage(itemId, "/images/" + savedName, savedName, (i == 0) ? "Y" : "N");
            } catch (Exception e) { throw new RuntimeException(e); }
        }
    }

    public List<ItemManagerDto> getAllItems() {
        return itemManagerMapper.findAllItems();
    }
}