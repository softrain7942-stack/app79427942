// PC 테스트용 더미 Pi 객체
if (typeof window !== 'undefined' && !window.Pi) {
    window.Pi = {
        authenticate: async () => ({ user: { uid: 'TEST-UID' } })
    };
}

// 실제 Pi SDK가 존재하면 초기화
if (typeof window !== 'undefined' && window.Pi) {
    const Pi = window.Pi;
    Pi.init({ version: "2.0", sandbox: false });

    function onIncompletePaymentFound(payment) {
        return Pi.completePayment(payment.paymentId, { txid: null });
    }

    window.piLogin = async function () {
        try {
            const scopes = ['username', 'payments'];
            const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);
            alert("Pi 로그인 성공! \nUID: " + authResult.user.uid);
        } catch (err) {
            alert("로그인 실패: " + (err?.message || "Pi 브라우저에서 열어주세요"));
        }
    };
}
