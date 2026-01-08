// 1. 이미지 업로드 관련
const addImgBtn = document.getElementById('add-img-btn');
const fileInput = document.getElementById('p-image-file');
const previewContainer = document.getElementById('image-preview-container');

let selectedImages = []; // 선택된 이미지의 Base64 데이터 저장

if (addImgBtn) addImgBtn.onclick = () => fileInput.click();

if (fileInput) {
    fileInput.onchange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                selectedImages.push(event.target.result); // Base64 데이터 추가
                renderPreviews();
            };
            reader.readAsDataURL(file);
        });
        fileInput.value = ""; // 동일 파일 재선택 가능하도록 초기화
    };
}

// 미리보기 화면 렌더링
function renderPreviews() {
    if(!previewContainer) return;
    previewContainer.innerHTML = "";
    selectedImages.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'image-box';
        // 첫 번째 이미지에 '메인' 표시 (시각적 피드백)
        const badge = (index === 0) ? '<span class="main-badge" style="position:absolute; background:red; color:white; font-size:10px; padding:2px 5px;">대표</span>' : '';
        div.style.position = 'relative';
        div.innerHTML = `
            ${badge}
            <img src="${src}" style="width:100px; height:100px; object-fit:cover;">
            <button type="button" class="remove-img-btn" onclick="removeImage(${index})">×</button>
        `;
        previewContainer.appendChild(div);
    });
}

window.removeImage = function(index) {
    selectedImages.splice(index, 1);
    renderPreviews();
};

// 2. 폼 제출 로직 (사이즈 검사 제거 및 이미지 전송 최적화)
const productForm = document.getElementById('add-product-form');

if (productForm) {
    productForm.onsubmit = function(e) {
        // [수정] 사이즈 유효성 검사 로직 삭제 (더 이상 필요 없음)

        // [이미지 전송 처리]
        // 기존에 생성된 hidden input이 있다면 중복 방지를 위해 삭제
        const oldInputs = productForm.querySelectorAll('input[name^="itemUrls"]');
        oldInputs.forEach(input => input.remove());

        if (selectedImages.length === 0) {
            alert('최소 하나 이상의 이미지를 등록해주세요.');
            e.preventDefault();
            return;
        }

        // 선택된 모든 Base64 데이터를 DTO의 List<String> itemUrls와 매칭되도록 추가
        selectedImages.forEach((base64, index) => {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = `itemUrls[${index}]`;
            hiddenInput.value = base64;
            productForm.appendChild(hiddenInput);
        });

        // 최종 전송 확인
        if(!confirm('제품을 등록하시겠습니까?')) {
            e.preventDefault();
            return;
        }

        // 폼이 정상적으로 제출되면서 Service 단의 registerItem으로 넘어갑니다.
    };
}