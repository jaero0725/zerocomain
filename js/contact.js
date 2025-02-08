document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("jjIZA0ajd0YxKPpb-");

    const contactForm = document.getElementById('contactForm');
    const submitButton = document.querySelector('.submit-btn');
    
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 필수 입력 필드 확인
        const name = contactForm.name.value;
        const email = contactForm.email.value;
        const message = contactForm.message.value;

        if (!name || !email || !message) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }

        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }

        if (confirm('견적 문의를 전송하시겠습니까?')) {
            const templateParams = {
                from_name: name,
                from_email: email,
                phone: contactForm.phone.value,
                company: contactForm.company.value,
                budget: contactForm.budget.value,
                deadline: contactForm.deadline.value,
                project_details: message,
                submit_date: new Date().toLocaleString('ko-KR'),
            };

            submitButton.textContent = '전송 중...';
            submitButton.disabled = true;
            
            emailjs.send('zeroco', 'template_yx9fknc', templateParams)
                .then(function(response) {
                    alert('견적 문의가 성공적으로 전송되었습니다.');
                    contactForm.reset();
                }, function(error) {
                    alert('전송에 실패했습니다. 다시 시도해주세요.');
                    console.error('Failed:', error);
                })
                .finally(function() {
                    submitButton.textContent = '견적 문의하기';
                    submitButton.disabled = false;
                });
        }
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