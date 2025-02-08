document.addEventListener('DOMContentLoaded', function() {
    // 탭 기능 초기화
    initTabs();
    // Three.js 초기화
    initThreeJS();
});

// 탭 기능 초기화 함수
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // 초기 탭 설정
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
    }

    // 탭 클릭 이벤트
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 탭 버튼에서 active 클래스 제거
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // 클릭된 버튼에 active 클래스 추가
            button.classList.add('active');

            // 모든 탭 컨텐츠 숨기기
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // 선택된 탭 컨텐츠 표시
            const targetTab = button.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Three.js 초기화 함수
function initThreeJS() {
    const container = document.getElementById('three-container');
    if (!container) return;  // three-container가 없으면 실행하지 않음

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 기하학적 도형들 생성
    const meshes = [];

    // 큐브 생성
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00,
        shininess: 100
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -2;
    cube.castShadow = true;
    scene.add(cube);
    meshes.push(cube);

    // 구체 생성
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        shininess: 100
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    scene.add(sphere);
    meshes.push(sphere);

    // 원뿔 생성
    const coneGeometry = new THREE.ConeGeometry(0.7, 1.5, 32);
    const coneMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0000ff,
        shininess: 100
    });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.x = 2;
    cone.castShadow = true;
    scene.add(cone);
    meshes.push(cone);

    // 바닥 평면 추가
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xcccccc,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -2;
    plane.receiveShadow = true;
    scene.add(plane);

    camera.position.z = 5;
    camera.position.y = 1;

    // 애니메이션 상태
    let isRotating = true;
    let currentScale = 1;
    let isRainbow = false;
    let hue = 0;

    // 컨트롤 버튼 이벤트
    const rotateBtn = document.getElementById('rotate');
    const scaleBtn = document.getElementById('scale');
    const colorBtn = document.getElementById('color');

    if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
            isRotating = !isRotating;
        });
    }

    if (scaleBtn) {
        scaleBtn.addEventListener('click', () => {
            currentScale = currentScale === 1 ? 1.5 : 1;
            meshes.forEach(mesh => {
                mesh.scale.set(currentScale, currentScale, currentScale);
            });
        });
    }

    if (colorBtn) {
        colorBtn.addEventListener('click', () => {
            isRainbow = !isRainbow;
            if (!isRainbow) {
                cube.material.color.setHex(0x00ff00);
                sphere.material.color.setHex(0xff0000);
                cone.material.color.setHex(0x0000ff);
            }
        });
    }

    // 마우스 이벤트
    let mouseX = 0;
    let mouseY = 0;
    
    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    });

    // 애니메이션 루프
    function animate() {
        requestAnimationFrame(animate);

        if (isRotating) {
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01 * (index + 1);
                mesh.rotation.y += 0.01 * (index + 1);
            });
        }

        if (isRainbow) {
            hue += 0.005;
            const color = new THREE.Color();
            meshes.forEach((mesh, index) => {
                color.setHSL((hue + index * 0.2) % 1, 1, 0.5);
                mesh.material.color = color.clone();
            });
        }

        // 카메라 부드러운 움직임
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // 반응형 처리
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
} 