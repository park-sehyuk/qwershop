/**
 * 제품 등록 스크립트 (대표 이미지 선정 기능 추가 버전)
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-product-form');
    const inputContainer = document.getElementById('image-input-container');
    const openGalleryBtn = document.getElementById('open-gallery-btn');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryGrid = document.getElementById('gallery-grid');
    const closeGalleryBtn = document.getElementById('close-gallery-btn');

    let selectedImageNames = [];

    // 1. 갤러리 모달 제어 (기존과 동일)
    openGalleryBtn.addEventListener('click', async () => {
        try {
            const res = await fetch('/admin/api/internal-files?t=' + new Date().getTime());
            if (!res.ok) throw new Error("파일 목록을 불러오지 못했습니다.");
            const fileList = await res.json();
            galleryGrid.innerHTML = '';
            if (fileList.length === 0) {
                galleryGrid.innerHTML = '<p style="grid-column: span 3; text-align:center; padding:20px;">저장소에 이미지가 없습니다.</p>';
            }
            fileList.forEach(fileName => {
                const img = document.createElement('img');
                img.src = `/admin/posting/${fileName}`;
                img.onclick = () => {
                    addImageToList(fileName);
                    closeModal();
                };
                galleryGrid.appendChild(img);
            });
            modalControl(true);
        } catch (error) {
            alert("서버 이미지 목록을 가져오는데 실패했습니다.");
        }
    });

    function addImageToList(fileName) {
        if (selectedImageNames.includes(fileName)) {
            alert("이미 리스트에 포함된 파일입니다.");
            return;
        }
        selectedImageNames.push(fileName);
        renderImageList();
    }

    // 2. 선택된 이미지 리스트 UI 렌더링 (클릭 시 대표 이미지 변경 로직 추가)
    function renderImageList() {
        inputContainer.innerHTML = '';

        if (selectedImageNames.length === 0) {
            inputContainer.innerHTML = '<p style="color:#999; text-align:center; padding: 20px 0;">갤러리에서 이미지를 선택해주세요.</p>';
            return;
        }

        selectedImageNames.forEach((name, index) => {
            const div = document.createElement('div');
            div.className = 'image-input-item';
            // 대표 이미지일 경우 배경색 차이 부여 및 클릭 가능하게 설정
            div.style = `
                display: flex; align-items: center; padding: 10px; border: 1px solid ${index === 0 ? '#007bff' : '#ddd'};
                margin-bottom: 8px; border-radius: 6px; background: ${index === 0 ? '#f0f7ff' : '#fff'};
                cursor: pointer; transition: all 0.2s;
            `;

            // 항목 클릭 시 해당 이미지를 대표(배열 맨 앞)로 이동
            div.onclick = (e) => {
                if (e.target.classList.contains('remove-btn')) return; // 삭제 버튼 클릭 시 제외
                if (index !== 0) {
                    const target = selectedImageNames.splice(index, 1)[0];
                    selectedImageNames.unshift(target); // 맨 앞으로 이동
                    renderImageList();
                }
            };

            div.innerHTML = `
                <div style="width: 60px; height: 60px; overflow: hidden; border-radius: 4px; border: 2px solid ${index === 0 ? '#007bff' : '#eee'}; background:#eee;">
                    <img src="/admin/posting/${name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="flex: 1; margin-left: 12px;">
                    <span style="font-size: 14px; font-weight: 600; color: ${index === 0 ? '#007bff' : '#333'}; display:block;">${name}</span>
                    ${index === 0 ? '<span style="color:#007bff; font-size:11px; font-weight:bold;">★ 대표 이미지 (클릭하여 변경 가능)</span>' : '<span style="color:#666; font-size:11px;">추가 이미지 (클릭 시 대표로 설정)</span>'}
                </div>
                <button type="button" class="remove-btn" style="cursor:pointer; background:#ff4d4d; color:white; border:none; border-radius:4px; padding:5px 10px;">삭제</button>
            `;

            div.querySelector('.remove-btn').onclick = (e) => {
                e.stopPropagation(); // div 클릭 이벤트 전파 방지
                selectedImageNames.splice(index, 1);
                renderImageList();
            };

            inputContainer.appendChild(div);
        });
    }

    // 3. 모달 제어 함수
    function modalControl(show) {
        galleryModal.style.display = show ? 'block' : 'none';
        galleryOverlay.style.display = show ? 'block' : 'none';
        document.body.style.overflow = show ? 'hidden' : 'auto';
    }
    const closeModal = () => modalControl(false);
    if(closeGalleryBtn) closeGalleryBtn.onclick = closeModal;
    if(galleryOverlay) galleryOverlay.onclick = closeModal;

    // 4. 최종 폼 제출 (기존과 동일)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (selectedImageNames.length === 0) return alert("최소 한 장의 이미지를 선택해야 합니다.");

        const csrfHeaderEl = document.querySelector('meta[name="_csrf_header"]');
        const csrfTokenEl = document.querySelector('meta[name="_csrf"]');

        const itemData = {
            itemName: document.getElementById('itemName').value,
            itemBrand: document.getElementById('itemBrand').value,
            itemPrice: parseInt(document.getElementById('itemPrice').value) || 0,
            itemStock: parseInt(document.getElementById('itemStock').value) || 0,
            dbCategory: parseInt(document.getElementById('itemCategory').value),
            dbType: parseInt(document.getElementById('itemTypeSelect').value),
            imageNames: selectedImageNames // 배열 순서 그대로 전송 (0번이 대표)
        };

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (csrfHeaderEl && csrfTokenEl) headers[csrfHeaderEl.content] = csrfTokenEl.content;

            const res = await fetch('/admin/api/items', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(itemData)
            });

            if (res.ok) {
                alert("성공적으로 등록되었습니다.");
                location.href = "/admin/itemList";
            } else {
                alert("등록 실패");
            }
        } catch (error) {
            alert("통신 오류가 발생했습니다.");
        }
    });

    renderImageList();
});