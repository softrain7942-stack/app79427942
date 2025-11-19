// 즉시 실행으로 변경 – DOM 기다리지 않고 바로 init
if (typeof window !== 'undefined') {
    // Pi SDK 로드 확인
    if (!window.Pi) {
        console.error("Pi SDK not loaded – Pi Browser에서 열어보세요!");
        // 버튼에 에러 표시 추가 (선택)
        const button = document.querySelector('button[onclick="piLogin()"]');
        if (button) button.textContent = 'Pi Browser에서 열기!';
        return;
    }

    const Pi = window.Pi;

    // 메인넷 모드 (승인 대기 중에도 테스트 OK)
    Pi.init({ version: "2.0", sandbox: false });

    // 미완료 결제 핸들러
    function onIncompletePaymentFound(payment) {
        console.log("미완료 결제 발견:", payment);
        return Pi.completePayment(payment.paymentId, { txid: null });
    }

    // 로그인 함수 (전역으로 노출)
    window.piLogin = async function () {
        console.log("로그인 시도 중...");
        try {
            const scopes = ['username', 'payments'];
            const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);
            console.log("로그인 성공! 전체 결과:", authResult);
            alert("Pi 로그인 성공! \nUID: " + authResult.user.uid + "\nUsername: " + authResult.user.username);
        } catch (err) {
            console.error("로그인 상세 에러:", err);
            alert("로그인 실패 ㅠㅠ\n에러: " + (err?.message || "Pi Browser에서 다시 시도해 주세요"));
        }
    };

    console.log("Pi SDK 준비 완료 – 버튼 눌러보세요!");
}
