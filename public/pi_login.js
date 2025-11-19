// public/pi_login.js — 이거만 딱 넣고 저장하면 끝!
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
