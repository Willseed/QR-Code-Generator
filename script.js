document.addEventListener('DOMContentLoaded', () => {
    const wifiForm = document.getElementById('wifiForm');
    const generateBtn = document.getElementById('generateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const qrcodeContainer = document.getElementById('qrcode');
    const qrcodeStringDisplay = document.getElementById('qrcodeString');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    let qrCodeInstance = null;

    togglePassword.addEventListener('click', () => {
        const currentType = passwordInput.getAttribute('type');
        if (currentType === 'password') {
            passwordInput.setAttribute('type', 'text');
            togglePassword.textContent = '👁️'; // 密碼可見，顯示睜眼圖示
        } else {
            passwordInput.setAttribute('type', 'password');
            togglePassword.textContent = '🙈'; // 密碼隱藏，顯示閉眼圖示
        }
    });

    generateBtn.addEventListener('click', () => {
        const ssid = document.getElementById('ssid').value;
        const password = document.getElementById('password').value;
        const hiddenSsid = document.getElementById('hiddenSsid').checked;
        const encryption = document.querySelector('input[name="encryption"]:checked').value;

        if (!ssid) {
            alert('請輸入 SSID (網路名稱)。');
            return;
        }

        // WIFI:T:<encryption>;S:<ssid>;P:<password>;H:<hidden>;;
        const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hiddenSsid};;`;

        qrcodeContainer.innerHTML = ''; // 清除之前的 QR 碼
        qrcodeStringDisplay.textContent = ''; // 清除之前的字串

        if (qrCodeInstance) {
            qrCodeInstance.clear(); // 清除舊的 QR 碼實例
        }
        qrCodeInstance = new QRCode(qrcodeContainer, {
            text: wifiString,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        qrcodeContainer.setAttribute('aria-label', `Wi-Fi QR 碼，SSID 為 ${ssid}`);
    });

    resetBtn.addEventListener('click', () => {
        wifiForm.reset();
        qrcodeContainer.innerHTML = '';
        qrcodeStringDisplay.textContent = '';
        if (qrCodeInstance) {
            qrCodeInstance.clear();
        }
        qrcodeContainer.setAttribute('aria-label', '產生的 QR 碼將會顯示在這裡');
        document.getElementById('ssid').focus();
    });

    // 初始焦點設定
    document.getElementById('ssid').focus();
});
