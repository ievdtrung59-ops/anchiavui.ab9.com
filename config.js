// ===== Cấu hình Ăn Chia Vui khi chạy trên Vercel =====
// 1) Dán cấu hình Firebase (Firebase console → Project settings → Your apps → Web app → SDK setup and configuration → Config)
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBfrkGFBdBJ4viu-kS7EL6llbpxfDH4lYY",
  authDomain: "anvuiab9.firebaseapp.com",
  projectId: "anvuiab9",
  storageBucket: "anvuiab9.firebasestorage.app",
  messagingSenderId: "531810467014",
  appId: "1:531810467014:web:07ddd3bb80926b44096bc7"
};

// 2) (Tuỳ chọn) Mã nhóm: mọi người nhập 1 lần trên mỗi máy. Để "" nếu không cần.
window.GROUP_PIN = "";

// 3) AI đọc menu: dùng API /api/read-menu (cần biến môi trường ANTHROPIC_API_KEY trên Vercel).
//    Đặt = false để tắt tính năng AI.
window.AI_ENDPOINT = "/api/read-menu";
