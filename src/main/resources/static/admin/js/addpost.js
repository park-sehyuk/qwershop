document.addEventListener('DOMContentLoaded', () => {

    const imageInput = document.getElementById('imageFiles');
    const previewContainer = document.getElementById('preview-container');
    const form = document.getElementById('add-product-form');

    // 🔥 핵심 상태: 선택된 파일 누적
    let selectedImages = [];

    /* ==========================
       이미지 선택 (누적)
    ========================== */
    imageInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            selectedImages.push(file);
        });

        renderPreview();

        // 같은 파일 다시 선택 가능하게 초기화
        imageInput.value = '';
    });

    /* ==========================
       미리보기 렌더링
    ========================== */
    function renderPreview() {
        previewContainer.innerHTML = '';

        selectedImages.forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = () => {
                const div = document.createElement('div');
                div.className = 'preview-item';

                div.innerHTML = `
          <img src="${reader.result}">
          ${index === 0 ? '<span class="badge">대표</span>' : ''}
          <button type="button">삭제</button>
        `;

                div.querySelector('button').onclick = () => {
                    selectedImages.splice(index, 1);
                    renderPreview();
                };

                previewContainer.appendChild(div);
            };

            reader.readAsDataURL(file);
        });
    }

    /* ==========================
       폼 제출
    ========================== */
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (selectedImages.length === 0) {
            alert('이미지를 한 장 이상 선택하세요');
            return;
        }

        const formData = new FormData(form);

        // 이미지 추가 (순서 유지!)
        selectedImages.forEach(file => {
            formData.append('images', file);
        });

        const res = await fetch('/admin/api/items', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            alert('등록 성공');
            location.href = '/admin/itemList';
        } else {
            alert('등록 실패');
        }
    });
});
