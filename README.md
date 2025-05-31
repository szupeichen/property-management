維修公告：因免費DB到期，目前尋找新的DB中，暫時無法登入。

# 房產資訊管理系統 property-management
#### 輕鬆擺脫繁雜Excel的租賃管理行政工具  
點擊連結進入：https://property-management-dcb0.onrender.com  
或即刻掃描下方QR Code 體驗(初次連線可能須等候約50秒)  
測試帳號密碼：  
帳號：example@example.com  
密碼：example  
  
<img src="readMeImg/sideProjectQRcode.png" alt="QR Code" width="200" height="200">  

# 專案介紹 — Description
### 適用對象：  
過去常以Excel試算表或紙本管理龐大資料的財務、法務、行政、總務人員。

### 解決痛點：  
1.試算表不易維護，經常誤刪、誤改資料。  
2.人員權限不易管理，無法落實權限控制。  
3.試算表資料龐雜時，檢視困難、傷眼傷神又易出錯。  
4.轉換行政管理系統時，行政人員抗性高。   

### 專案介紹：
#### 登入/註冊使用者帳戶
1. 使用Passport.js 套件管理使用者權限，落實權限控制，省去鎖試算表的麻煩。
2. 搭配bcrypt.js 進行密碼加密，提高資料安全性。
3. 串接Meta OAuth2.0 第三方登入。  
<img src="readMeImg/login_signUp.png" alt="登入及註冊功能" width="200" height="200">

#### 瀏覽所有房產資料
1. 使用Express 框架結合handlebars 套件，打造清晰直覺的操作介面，降低資料誤改誤刪機率。
2. 使用MySQL 關聯式資料庫，資料格式固定，易於維護。  
3. 雲端串接AWS RDS，兼顧資料庫穩定性及可擴展性。  
<img src="readMeImg/browse.png" alt="瀏覽功能" width="400">  

#### 檢視一筆房產資料
1. 使用者可針對單筆資料檢視。  
2. 使用RESTful 風格API 串接後端路由。  
<img src="readMeImg/detail.png" alt="瀏覽功能" width="400">  

#### 新增一筆房產資料
1. 使用JQuery 動態計算並自動填入【年租金】欄位，達成防呆設計。  
2. 使用JQuery 搭配後端Async/Await 非同步運算，動態帶入仲介所屬公司及聯絡電話，優化使用者體驗。  
<img src="readMeImg/creat.png" alt="瀏覽功能" width="400">  

#### 修改一筆房產資料
1. 後端使用Promise 語法，確保資料正確性、兼顧提升資料庫效率。  
2. 後端資料庫boolean值欄位判斷，搭配前端form表格，視覺化【已出租狀態】，優化使用者體驗。   
<img src="readMeImg/edit.JPG" alt="瀏覽功能" width="400">  

#### 刪除一筆或多筆房產資料
1. 設有刪除確認機制，防止誤刪。  
2. 搭配handlebars設計權限管理制度，只有Admin可執行刪除動作。  
<img src="readMeImg/delete.png" alt="瀏覽功能" width="400">

#### 串接AWS RDS
1. 串接Amazon Web Services 關聯式資料庫
2. 確保資料庫穩定、快速、安全，並提供後續良好的可擴張性  

#### Deploy到Render平台
部署到Render.com Cloud Application Hosting platform，方便快速使用  

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

# 專案設計細節 — Design Details
User Story @ Figma  
請參考https://reurl.cc/Ze9gdM  
  
wireframe @ Figma  
請參考https://reurl.cc/oRr645  
  
ERD @ Figma  
請參考https://reurl.cc/jW324n

# 聯絡作者 — Contact With Me
謝謝你看到這裡，你可以透過以下方式與我聯絡  
Email：szupei21@gmail.com
