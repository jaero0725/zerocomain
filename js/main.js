document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 메뉴 항목 클릭시 자동으로 닫기
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
        }
    });

    // 스크롤시 메뉴 닫기
    window.addEventListener('scroll', function() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
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