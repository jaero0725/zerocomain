class ThreeBackground {
    constructor() {
        this.container = document.getElementById('three-background');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance" // 성능 최적화
        });
        this.container.appendChild(this.renderer.domElement);
        
        this.init();
        this.createObjects();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(1); // 픽셀 비율 1로 고정하여 성능 향상
        this.renderer.setClearColor(0x1a1a1a, 0);
        this.camera.position.set(0, 0, 30);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    createObjects() {
        // 파티클 수 감소 및 단순화
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 100; 
        const positions = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 40;
            positions[i + 1] = (Math.random() - 0.5) * 40;
            positions[i + 2] = (Math.random() - 0.5) * 40;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.5,
            color: 0x64748b,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);

        // 고정된 연결선 생성 (한 번만 생성)
        this.createFixedLines(positions);
    }

    createFixedLines(positions) {
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x64748b,
            transparent: true,
            opacity: 0.15
        });

        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = [];

        // 가까운 파티클들만 연결 (최적화)
        for(let i = 0; i < positions.length; i += 3) {
            for(let j = i + 3; j < positions.length; j += 3) {
                const distance = Math.sqrt(
                    Math.pow(positions[i] - positions[j], 2) +
                    Math.pow(positions[i + 1] - positions[j + 1], 2) +
                    Math.pow(positions[i + 2] - positions[j + 2], 2)
                );

                if(distance < 15) {
                    linePositions.push(
                        positions[i], positions[i + 1], positions[i + 2],
                        positions[j], positions[j + 1], positions[j + 2]
                    );
                }
            }
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        this.lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.lines);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // 회전 속도 감소
        this.particles.rotation.y += 0.001;
        this.lines.rotation.y += 0.001;

        this.renderer.render(this.scene, this.camera);
    }
}

// 페이지 로드 완료 후 초기화
window.addEventListener('load', () => {
    new ThreeBackground();
}); 