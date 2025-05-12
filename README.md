# Wi-Fi QR 碼產生器

一個簡單的單頁應用程式，用於產生 Wi-Fi 連線的 QR 碼。

## 功能

- 輸入 SSID 和密碼。
- 選擇是否隱藏 SSID。
- 選擇加密類型 (無、WPA/WPA2、WEP)。
- 產生 Wi-Fi QR 碼。
- 重設表單。
- 深色主題和無障礙設計。

## 技術棧

- HTML
- CSS (無框架)
- Vanilla JavaScript
- [qrcode.js](https://github.com/davidshimjs/qrcodejs) 用於產生 QR 碼

## 專案結構

```text
.
├── index.html       # 主要 HTML 檔案
├── style.css        # CSS 樣式表
├── script.js        # JavaScript 邏輯
└── README.md        # 本檔案
```

## Git 版本控制

以下是基本的 Git 指令，可協助您開始使用版本控制：

1. **初始化儲存庫**:
   在您的專案資料夾中開啟終端機或命令提示字元，然後執行：

   ```bash
   git init
   ```

2. **將檔案新增到暫存區**:
   若要新增所有變更的檔案：

   ```bash
   git add .
   ```

   或者，若要新增特定檔案：

   ```bash
   git add index.html style.css script.js README.md
   ```

3. **提交變更**:

   ```bash
   git commit -m "初始提交：建立基本的 Wi-Fi QR 碼產生器"
   ```

4. **(選擇性) 連結到遠端儲存庫 (例如 GitHub)**:
   首先，在 GitHub 上建立一個新的儲存庫。
   然後，將您的本機儲存庫連結到遠端儲存庫：

   ```bash
   git remote add origin <您的 GitHub 儲存庫 URL>
   git branch -M main
   git push -u origin main
   ```

   將 `<您的 GitHub 儲存庫 URL>` 替換為您 GitHub 儲存庫的實際 URL。

5. **推送後續變更**:
   在提交變更後，將其推送到遠端儲存庫：

   ```bash
   git push origin main
   ```

## 部署到 GitHub Pages

GitHub Pages 可讓您直接從 GitHub 儲存庫託管靜態網站。

1. **確保 `index.html` 位於根目錄**:
   此專案的 `index.html` 檔案已位於根目錄，因此符合 GitHub Pages 的要求。

2. **推送到 GitHub**:
   確保您的所有程式碼都已提交並推送到 GitHub 上的 `main` (或 `master`) 分支。

3. **設定 GitHub Pages**:
   - 前往您在 GitHub 上的儲存庫。
   - 按一下「Settings」(設定) 標籤。
   - 在左側邊欄中，向下捲動並選取「Pages」(頁面)。
   - 在「Build and deployment」(建構與部署) 下的「Source」(來源) 中，選取「Deploy from a branch」(從分支部署)。
   - 在「Branch」(分支) 下，選取您的主要分支 (通常是 `main` 或 `master`)，並將資料夾保留為 `/ (root)`。
   - 按一下「Save」(儲存)。

4. **存取您的網站**:
   GitHub Pages 將會在幾分鐘內建構並部署您的網站。部署完成後，您會在 GitHub Pages 設定頁面上看到已發佈網站的 URL (通常格式為 `https://<您的使用者名稱>.github.io/<您的儲存庫名稱>/`)。

## 無障礙考量

- 使用語義 HTML 標籤。
- 為表單輸入提供標籤。
- 使用 `aria-required` 表示必填欄位。
- 使用 `aria-live` 區域來宣告動態內容變更 (例如 QR 碼產生)。
- 確保足夠的色彩對比度 (淺色文字搭配深色背景)。
- 為互動元素 (按鈕) 提供 `aria-label`。
- 確保鍵盤導覽的焦點可見性。
