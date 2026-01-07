document.addEventListener('DOMContentLoaded', function () {

    // 1. 왼쪽 탭 전환 로직 (정보, 사이즈, 추천, 후기)
    const tabs = document.querySelectorAll('.tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // 모든 탭과 패널에서 active 클래스 제거
            tabs.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // 클릭한 탭과 해당하는 패널에 active 클래스 추가
            tab.classList.add('active');
            const targetPanel = document.getElementById(target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 2. 정보 탭 내 아코디언 토글 (상품상세, 제조/수입 등)
    const infoTab = document.getElementById('info');
    if (infoTab) {
        infoTab.addEventListener('click', (e) => {
            const head = e.target.closest('.acc-head');
            if (!head) return;

            const body = head.nextElementSibling; // 바로 아래 있는 acc-body
            if (body && body.classList.contains('acc-body')) {
                // 토글 처리
                head.classList.toggle('open');
                body.classList.toggle('open');
            }
        });
    }

    // 3. 우측 사이드바 위치 고정 및 정렬 보정 (레이아웃용)
    const rightSide = document.querySelector('.right-Side');
    const header = document.getElementById('header');
    const bigTitle = document.getElementById('big-Title');

    function adjustRightSide() {
        if (!rightSide || !bigTitle) return;

        const headerHeight = header ? header.offsetHeight : 0;
        const containerRect = bigTitle.getBoundingClientRect();

        // 뷰포트 오른쪽 끝에서 컨테이너 오른쪽 끝까지의 거리 계산
        const rightOffset = window.innerWidth - containerRect.right + 20;

        rightSide.style.top = (headerHeight + 20) + 'px';
        rightSide.style.right = `${Math.max(20, rightOffset)}px`;
    }

    window.addEventListener('resize', adjustRightSide);
    adjustRightSide(); // 초기 실행

    // 4. 사이즈 바 선택 기능 (HTML에 버튼들이 있다고 가정)
    const sizeBar = document.querySelector('.size-Bar');
    const sizeOptions = document.querySelector('.size-options');
    const sizeText = document.querySelector('.sizeText');

    if (sizeBar && sizeOptions) {
        sizeBar.addEventListener('click', () => {
            sizeOptions.style.display = sizeOptions.style.display === 'block' ? 'none' : 'block';
        });

        sizeOptions.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn && btn.dataset.size) {
                sizeText.textContent = btn.dataset.size;
                sizeOptions.style.display = 'none';

                // 선택 효과
                sizeOptions.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            }
        });
    }
});