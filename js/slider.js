document.addEventListener('DOMContentLoaded', function() {
    // 프로젝트 데이터 불러오기
    fetch('./data/projects.json')
        .then(response => response.json())
        .then(data => {
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            
            // 프로젝트 슬라이드 생성
            data.projects.forEach(project => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                    <div class="project-card">
                        <div class="image-container">
                            <img src="${project.image || ''}" alt="${project.title}">
                        </div>
                        <div class="project-content">
                            <h3>${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <div class="tech-stack">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                swiperWrapper.appendChild(slide);
            });

            // Swiper 초기화
            new Swiper('.swiper', {
                slidesPerView: 3,  // 기본값 설정
                spaceBetween: 20,
                loop: false,  // loop를 false로 변경
                speed: 800,   // 전환 속도 조정
                grabCursor: true,
                autoplay: false,  // 자동 재생 비활성화
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }
            });
        })
        .catch(error => {
            console.error('프로젝트 데이터를 불러오는데 실패했습니다:', error);
        });
}); 