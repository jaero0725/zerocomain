// 전역 변수로 선언
let productViewer = null;

class ProductViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found:', containerId);
            return;
        }

        // Scene 설정
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);

        // Camera 설정
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Renderer 설정
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        // 조명 설정
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // 기본 큐브 생성
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            shininess: 100
        });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        // 자동 회전
        this.autoRotate = true;

        // 애니메이션 시작
        this.animate();

        // 윈도우 리사이즈 이벤트
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.autoRotate) {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    changeColor(color) {
        this.cube.material.color.setHex(color);
    }
}

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('demo-modal');
    const viewerButtons = document.querySelectorAll('.view-demo');
    const closeButton = document.querySelector('.close-modal');

    viewerButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('active');
            if (!productViewer) {
                productViewer = new ProductViewer('modal-three-viewer');
            }
        });
    });

    closeButton?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // 색상 변경 버튼
    document.getElementById('change-color')?.addEventListener('click', () => {
        if (productViewer) {
            const colors = [0xff0000, 0x00ff00, 0x0000ff];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            productViewer.changeColor(randomColor);
        }
    });
}); 