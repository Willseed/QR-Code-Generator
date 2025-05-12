document.addEventListener('DOMContentLoaded', () => {
    const wifiForm = document.getElementById('wifiForm');
    const generateBtn = document.getElementById('generateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const qrcodeContainer = document.getElementById('qrcode');
    const qrcodeStringDisplay = document.getElementById('qrcodeString');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    let qrCodeInstance = null;

    const passwordError = document.getElementById('passwordError');

    // 密碼驗證用正則式
    const printablePattern = /^[\x20-\x7E]{8,63}$/;
    const hex64Pattern = /^[A-Fa-f0-9]{64}$/;
    const ascii5Or13Pattern = /^[\x20-\x7E]{5}$|^[\x20-\x7E]{13}$/;
    const hex10Or26Pattern = /^[A-Fa-f0-9]{10}$|^[A-Fa-f0-9]{26}$/;

    // 取得密碼錯誤訊息，無錯誤則回傳空字串
    function getPasswordError(encryption, password) {
        if (encryption === 'WPA') {
            if (!printablePattern.test(password) && !hex64Pattern.test(password)) {
                return 'WPA/WPA2 密碼必須是 8 到 63 個英數字元，或剛好 64 位的十六進位字串';
            }
        } else if (encryption === 'WEP') {
            if (!ascii5Or13Pattern.test(password) && !hex10Or26Pattern.test(password)) {
                return 'WEP 密碼必須是 5 或 13 個英數字元，或剛好 10 或 26 位的十六進位字串';
            }
        }
        return '';
    }

    function validateForm() {
        let valid = true;
        const ssid = document.getElementById('ssid').value.trim();
        // SSID 空值時不顯示訊息，但停用按鈕
        if (!ssid) {
            valid = false;
        }
        const encryption = document.querySelector('input[name="encryption"]:checked').value;
        const password = passwordInput.value;

        if (encryption === 'nopass') {
            passwordInput.disabled = true;
            passwordInput.value = '';
            passwordError.textContent = '';
        } else {
            passwordInput.disabled = false;
            const errMsg = getPasswordError(encryption, password);
            if (errMsg) {
                passwordError.textContent = errMsg;
                valid = false;
            } else {
                passwordError.textContent = '';
            }
        }

        generateBtn.disabled = !valid;
    }

    // 監聽欄位變動
    passwordInput.addEventListener('input', validateForm);
    document.querySelectorAll('input[name="encryption"]').forEach(radio => {
        radio.addEventListener('change', validateForm);
    });

    // 頁面載入時執行一次驗證
    validateForm();

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
            generateBtn.disabled = true;  // SSID 空白時停用按鈕
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
});
