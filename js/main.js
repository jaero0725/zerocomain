document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';

    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');

    nav.insertBefore(mobileMenuBtn, navLinks);

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
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