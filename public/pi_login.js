document.addEventListener("DOMContentLoaded", function () {
    if (!window.Pi) {
        console.error("Pi SDK not loaded");
        alert("Pi SDK 로드 실패!");
        return;
    }

    const Pi = window.Pi;
    Pi.init({ version: "2.0", sandbox: true });

    function onIncompletePaymentFound(payment) {
        return Pi.completePayment(payment.paymentId, { txid: null });
    }

    window.piLogin = async function() {
        try {
            const scopes = ['username', 'payments'];
            const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);

            console.log("로그인 성공! UID:", authResult.user.uid);
            alert("Pi 로그인 성공! UID: " + authResult.user.uid);
        } catch (err) {
            console.error("로그인 실패:", err);
            alert("로그인 실패: " + (err && err.message ? err.message : "알 수 없는 오류"));
        }
    };
});
