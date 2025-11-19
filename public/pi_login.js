document.addEventListener("DOMContentLoaded", function () {
    // Pi SDK가 로드됐는지 확인
    if (!window.Pi) {
        console.error("Pi SDK not loaded");
        alert("Pi SDK 로드 실패! 인터넷 연결을 확인해 주세요.");
        return;
    }

    const Pi = window.Pi;

    // 여기만 false로 바꿈 → 메인넷 준비 완료!!
    Pi.init({ version: "2.0", sandbox: false });

    // 미완료 결제 자동 처리 (필수!)
    function onIncompletePaymentFound(payment) {
        return Pi.completePayment(payment.paymentId, { txid: null });
    }

    // 로그인 함수 (버튼에서 호출됨)
    window.piLogin = async function () {
        try {
            const scopes = ['username', 'payments'];
            const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);

            console.log("로그인 성공! UID:", authResult.user.uid);
            alert("Pi 로그인 성공! 🎉\nUID: " + authResult.user.uid);
            // 여기 나중에 너가 원하는 기능 추가하면 됨 (예: UID 저장, 페이지 이동 등)

        }  catch (err) {
            console.error("로그인 실패:", err);
            alert("로그인 실패: " + (err?.message || "알 수 없는 오류"));
        }
    };
});
