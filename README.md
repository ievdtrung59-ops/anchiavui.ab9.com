# Ăn Chia Vui – triển khai trên Vercel (không cần đăng nhập claude.ai)

## 1. Tạo Firebase (miễn phí)
1. https://console.firebase.google.com → **Add project**.
2. **Build → Firestore Database → Create database** (chọn vùng `asia-southeast1`, chế độ production).
3. Tab **Rules** → dán nội dung file `firestore.rules` → **Publish**.
4. **Build → Authentication → Get started → Sign-in method → Anonymous → Enable**.
5. **Project settings (⚙️) → Your apps → Web (</>)** → đăng ký app → copy khối `firebaseConfig`.

## 2. Sửa `config.js`
- Dán các giá trị `firebaseConfig` vào `window.FIREBASE_CONFIG`.
- (Tuỳ chọn) đặt `window.GROUP_PIN = "mã-nhóm"` để người ngoài có link cũng không vào được ngay.

## 3. AI đọc menu (tuỳ chọn)
- Vercel → Project → **Settings → Environment Variables** → thêm `ANTHROPIC_API_KEY` (lấy ở https://console.anthropic.com).
- Không dùng thì đặt `window.AI_ENDPOINT = false` trong `config.js`.

## 4. Deploy
Đưa cả thư mục này (index.html, config.js, api/, vercel.json) lên Vercel như bạn đang làm → Redeploy.

## Lưu ý
- Dữ liệu trên claude.ai cũ KHÔNG tự chuyển sang Firebase – bản Vercel bắt đầu sổ mới.
- Không đăng nhập nghĩa là ai có link (và mã nhóm nếu đặt) đều xem/sửa được.
