document.addEventListener('DOMContentLoaded', function() {
    // 후기 데이터
    const reviews = [
        {
            clientName: "김OO",
            projectName: "기업 웹사이트 개발",
            date: "2024.03",
            content: "처음부터 끝까지 꼼꼼하게 진행해주셨고, 중간중간 커뮤니케이션도 원활했습니다. 특히 반응형 디자인 부분에서 많은 신경을 써주셔서 감사합니다.",
            rating: 5
        },
        {
            clientName: "이OO",
            projectName: "쇼핑몰 웹사이트 개발",
            date: "2024.02",
            content: "기존 사이트의 문제점을 정확히 파악하고 개선해주셨습니다. 사용자 경험을 고려한 디자인과 기능 개선으로 매출이 증가했습니다.",
            rating: 5
        },
        {
            clientName: "박OO",
            projectName: "반응형 웹사이트 개발",
            date: "2024.01",
            content: "모바일 최적화가 잘 되어있어 만족스럽습니다. 일정 관리도 철저히 해주셔서 계획된 시간 내에 잘 마무리되었습니다.",
            rating: 5
        }
    ];

    // 별점 생성 함수
    function createStarRating(rating) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    // 후기 카드 생성 함수
    function createReviewCard(review) {
        return `
            <article class="review-card">
                <div class="review-header">
                    <div class="client-info">
                        <div class="client-name">${review.clientName}</div>
                        <div class="project-name">${review.projectName}</div>
                    </div>
                    <div class="review-date">${review.date}</div>
                </div>
                <p class="review-content">${review.content}</p>
                <div class="review-rating">${createStarRating(review.rating)}</div>
            </article>
        `;
    }

    // 후기 목록 렌더링
    const reviewsContainer = document.querySelector('.reviews-grid');
    reviewsContainer.innerHTML = reviews.map(review => createReviewCard(review)).join('');
}); 