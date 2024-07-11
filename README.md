# 房產資訊管理系統 property-management
輕鬆擺脫繁雜Excel的租賃管理行政工具

# 專案介紹 — Description
### 適用對象：  
過去常以Excel試算表管理龐大資料的財務、法務、行政、總務人員。

### 解決痛點：  
1.試算表不易維護，經常誤刪、誤改資料。  
2.人員權限不易管理，無法落實權限控制。  
3.試算表資料龐雜時，檢視困難、傷眼傷神又易出錯。  
4.轉換行政管理系統時，行政人員抗性高。  

### 專案優勢：  
1.使用MySQL關聯式資料庫，資料格式固定，易於維護。 
2.串接AWS RDS，安全、穩定、將來可擴展性高。
2.以Passport套件管理使用者權限，落實權限控制，省去鎖試算表的麻煩。  
3.使用Express框架結合handlebars套件，打造清晰直覺的操作介面，降低資料誤改誤刪機率。  
4.介面簡潔好上手，降低內部人員訓練成本，無痛轉換行政工具。

### 功能介紹：
#### 登入/註冊使用者帳戶
<img src="readMeImg/login_signUp.png" alt="登入及註冊功能" width="200" height="200">

#### 瀏覽所有房產資料
<img src="readMeImg/browse.png" alt="瀏覽功能" width="400">  
一目了然現有資料，並可單獨檢視每筆資料細節，或針對每筆資料進行修改。

#### 檢視一筆房產資料
<img src="readMeImg/detail.png" alt="瀏覽功能" width="400">  
針對單筆資料檢視。

#### 新增一筆房產資料
<img src="readMeImg/creat.png" alt="瀏覽功能" width="400">  
【月租金】輸入金額後，系統自動計算並填入【年租金】。【服務仲介】選取後，系統自動帶入所屬公司及聯絡電話資料。防呆設計提升使用者體驗。

#### 修改一筆房產資料
<img src="readMeImg/edit.JPG" alt="瀏覽功能" width="400">  
修改資料時，介面風格一致，減少輸入錯誤機率。

#### 刪除一筆或多筆房產資料
<img src="readMeImg/delete.png" alt="瀏覽功能" width="400">  
一次刪除單筆或多筆資料，並設有防誤刪的訊息確認機制。

# 安裝指南 — Installation Guide
請依照以下步驟安裝本專案
1. 取得專案    ```git clone https://github.com/szupeichen/property-management.git```
2. 移動到專案內 ```cd property-management```
3. 運行專案     ```npm run dev```

## 運行環境需求
### 軟體環境
1. ***Node.js*** 14.x 或更高版本
2. ***npm*** 6.x 或更高版本 (通常與 Node.js 一起安裝)
3. ***MySQL*** 5.7 或更高版本
### Node.js 環境
請確保已經安裝以下主要依賴套件：
1. ***express*** ^4.17.1
2. ***sequelize*** ^6.35.1
3. ***mysql2*** ^3.6.5
### 開發依賴套件
開發過程中需要的套件如下：
1. ***dotenv*** ^16.3.1
2. ***eslint*** ^8.56.0
### 設置環境變數
```SESSION_SECRET=XXXX  
PORT=XXXX  
DB_HOST=mysql://username:password@localhost:3306/database_name  
DB_NAME=XXXX  
DB_PASSWORD=XXXX  
DB_PORT=XXXX  
DB_USER=XXXX  
FACEBOOK_ID=XXXX  
FACEBOOK_SECRET=XXXX  
FACEBOOK_CALLBACK=XXXX  
```
亦可參考專案內檔案 .env.example

## 測試帳號密碼
帳號：example@example.com
密碼：example

# 專案設計細節 — Design Details
### User Story @ Figma
請參考https://reurl.cc/Ze9gdM

### wireframe @ Figma
請參考https://reurl.cc/oRr645

### ERD @ Figma
請參考https://reurl.cc/jW324n

# 聯絡作者 — Contact With Me
謝謝你看到這裡，你可以透過以下方式與我聯絡：Email-szupei21@gmail.com
