document.addEventListener('DOMContentLoaded', function() {

    // 프로젝트 카드 생성 함수
    function createProjectCard(project) {
        return `
            <article class="project-card">
                <div class="image-container">
                    <img src="${project.image || ''}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
    }

    // 프로젝트 목록 렌더링
    const projectsContainer = document.querySelector('.projects');
    projectsContainer.innerHTML = projects.map(project => createProjectCard(project)).join('');
}); 