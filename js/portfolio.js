document.addEventListener('DOMContentLoaded', function() {
    // 프로젝트 데이터
    const projects = [
        {
            title: "프로젝트 1",
            description: "반응형 웹사이트 개발",
            image: "../assets/images/project1.jpg",
            technologies: ["HTML", "CSS", "JavaScript"]
        },
        {
            title: "프로젝트 2",
            description: "쇼핑몰 웹사이트 개발",
            image: "../assets/images/project2.jpg",
            technologies: ["HTML", "CSS", "JavaScript"]
        },
        {
            title: "프로젝트 3",
            description: "기업 웹사이트 리뉴얼",
            image: "../assets/images/project3.jpg",
            technologies: ["HTML", "CSS", "JavaScript"]
        }
    ];

    // 프로젝트 카드 생성 함수
    function createProjectCard(project) {
        return `
            <article class="project-card">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </article>
        `;
    }

    // 프로젝트 목록 렌더링
    const projectsContainer = document.querySelector('.projects');
    projectsContainer.innerHTML = projects.map(project => createProjectCard(project)).join('');
}); 