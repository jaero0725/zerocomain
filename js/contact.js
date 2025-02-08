document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 폼 데이터 수집
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            projectType: document.getElementById('project-type').value,
            deadline: document.getElementById('deadline').value,
            description: document.getElementById('description').value,
            reference: document.getElementById('reference').value
        };

        // 여기에 실제 폼 제출 로직 구현
        // 예: 이메일 발송 또는 서버로 데이터 전송
        console.log('폼 데이터:', formData);
        
        // 사용자에게 알림
        alert('견적 문의가 접수되었습니다. 검토 후 연락드리겠습니다.');
        
        // 폼 초기화
        contactForm.reset();
    });

    // 입력 필드 유효성 검사
    const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('invalid');
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                this.classList.remove('invalid');
            }
        });
    });
}); 