// 1. 이미지 업로드 관련 로직
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
                selectedImages.push(event.target.result);
                renderPreviews();
            };
            reader.readAsDataURL(file);
        });
        fileInput.value = "";
    };
}

function renderPreviews() {
    if(!previewContainer) return;
    previewContainer.innerHTML = "";
    selectedImages.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'image-box';
        const badge = (index === 0) ? '<span class="main-badge" style="position:absolute; background:red; color:white; font-size:10px; padding:2px 5px; z-index:10;">대표</span>' : '';
        div.style.position = 'relative';
        div.innerHTML = `
            ${badge}
            <img src="${src}" style="width:100px; height:100px; object-fit:cover; border-radius:5px;">
            <button type="button" class="remove-img-btn" onclick="removeImage(${index})" style="position:absolute; top:0; right:0; cursor:pointer;">×</button>
        `;
        previewContainer.appendChild(div);
    });
}

window.removeImage = function(index) {
    selectedImages.splice(index, 1);
    renderPreviews();
};

// 2. 폼 제출 로직 (JSON 전송 방식으로 변경)
const productForm = document.getElementById('add-product-form');

if (productForm) {
    productForm.onsubmit = async function(e) {
        e.preventDefault(); // 기본 폼 제출(새로고침) 방지

        if (selectedImages.length === 0) {
            alert('최소 하나 이상의 이미지를 등록해주세요.');
            return;
        }

        if(!confirm('제품을 등록하시겠습니까?')) return;

        // 폼 데이터를 JSON 객체로 생성
        const formData = new FormData(productForm);
        const data = {};

        // 일반 필드들을 객체에 담기
        formData.forEach((value, key) => {
            // itemUrls[0] 형태의 키는 제외 (따로 처리)
            if(!key.includes('itemUrls')) {
                data[key] = value;
            }
        });

        // 이미지(Base64 리스트) 추가
        data.itemUrls = selectedImages;

        try {
            const response = await fetch('/admin/addpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // 서버에 JSON임을 알림
                },
                body: JSON.stringify(data) // JSON 문자열로 변환
            });

            if (response.ok) {
                alert("상품이 성공적으로 등록되었습니다.");
                location.href = "/admin/itemList"; // 등록 후 목록 페이지로 이동
            } else {
                const errorText = await response.text();
                alert("등록 실패: " + errorText);
            }
        } catch (error) {
            console.error('전송 에러:', error);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };
}