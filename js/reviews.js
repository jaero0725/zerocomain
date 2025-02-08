document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/reviews.json')
        .then(response => response.json())
        .then(data => {
            const reviewsContainer = document.querySelector('.reviews-grid');
            const statsContainer = document.querySelector('.reviews-stats');
            
            // 통계 정보 표시
            if (statsContainer) {
                statsContainer.innerHTML = `
                    <div class="stats-item">
                        <span class="stats-number">${data.stats.totalReviews}</span>
                        <span class="stats-label">전체 리뷰</span>
                    </div>
                    <div class="stats-item">
                        <span class="stats-number">${data.stats.averageRating}</span>
                        <span class="stats-label">평균 평점</span>
                    </div>
                    <div class="stats-item">
                        <span class="stats-number">${data.stats.completedProjects}</span>
                        <span class="stats-label">완료 프로젝트</span>
                    </div>
                `;
            }

            // 리뷰 카드 생성
            reviewsContainer.innerHTML = data.reviews.map(review => `
                <article class="review-card">
                    <div class="review-header">
                        <div class="review-info">
                            <div class="review-rating">★ ${review.rating.toFixed(1)}</div>
                            <div class="review-date">${review.date}</div>
                        </div>
                        <div class="project-info">
                            <div class="work-duration">${review.workDuration}</div>
                            <div class="project-cost">${review.projectCost}</div>
                        </div>
                    </div>
                    <p class="review-content">${review.content}</p>
                    <div class="review-author">${review.author}</div>
                </article>
            `).join('');
        })
        .catch(error => {
            console.error('리뷰를 불러오는데 실패했습니다:', error);
        });
}); 