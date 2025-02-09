document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
            // 메뉴 아이콘 변경
            mobileMenuButton.innerHTML = navLinks.classList.contains('active') ? '×' : '☰';
            
            // 메뉴가 열렸을 때 스크롤 방지
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // 메뉴 항목 클릭시 자동으로 메뉴 닫기
        const menuItems = navLinks.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
                document.body.style.overflow = '';
            });
        });
    }

    // 스크롤시 헤더 스타일 변경
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 스크롤 애니메이션
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'var(--bg-color)';
        }
    });
}); 