# 🤖 laptrinhrobot.vn — Landing Page Sata Robo

Landing page **lead-gen** cho **Học viện Sata Robo** — SP2 Robotics Offline tại Đà Nẵng.

Mục tiêu KPI: số lead form / ngày từ phụ huynh có con từ lớp 1–8.

---

## 🚀 CÀI ĐẶT & CHẠY

```bash
# 1. Cài dependencies
npm install

# 2. Chạy dev server (http://localhost:5173)
npm run dev

# 3. Build production
npm run build

# 4. Preview build
npm run preview
```

**Yêu cầu:** Node.js ≥ 18

---

## 📁 CẤU TRÚC

```
laptrinhrobot-vn/
├── index.html                    ← SEO + Meta Pixel + GA4
├── public/
│   └── favicon.svg               ← Favicon Sata Robo
├── src/
│   ├── main.jsx                  ← Entry point
│   ├── App.jsx                   ← Composition 12 sections
│   ├── index.css                 ← Tailwind + global styles
│   ├── components/               ← 16 components
│   │   ├── TopCountdownBar.jsx   ← Top sticky countdown
│   │   ├── Header.jsx            ← Logo + navigation
│   │   ├── Hero.jsx              ← Section 1
│   │   ├── SpecialOfferCountdown.jsx  ← Section 2
│   │   ├── Roadmap5Years.jsx     ← Section 3 (5 năm × 4 HP)
│   │   ├── TeachingMethod.jsx    ← Section 4
│   │   ├── Locations.jsx         ← Section 5 (4 trung tâm)
│   │   ├── Commitment.jsx        ← Section 6 (6 cam kết)
│   │   ├── Gifts.jsx             ← Section 7 (4 quà tặng)
│   │   ├── InternalAwards.jsx    ← Section 8 (Championship)
│   │   ├── Testimonials.jsx      ← Section 9
│   │   ├── RegistrationForm.jsx  ← Section 10 (Form + tracking)
│   │   ├── FAQ.jsx               ← Section 11
│   │   ├── FinalCTA.jsx          ← Section 12
│   │   ├── Footer.jsx
│   │   └── FloatingCTA.jsx       ← Floating Zalo + Đăng ký
│   ├── hooks/
│   │   ├── useCountdown.js
│   │   └── useScrollPosition.js
│   ├── utils/
│   │   ├── deadlines.js          ← Rolling deadline 5/10/15/20/25
│   │   └── tracking.js           ← Meta Pixel + GA4 + Sheet
│   └── data/
│       ├── roadmap-5-years.js    ← 5 năm × 4 HP × 12 buổi
│       ├── locations.js          ← 4 trung tâm Đà Nẵng
│       ├── gifts.js              ← 4 quà tặng
│       ├── awards.js             ← Sata Robo Championship
│       ├── testimonials.js       ← 6 testimonial
│       ├── faqs.js               ← 9 FAQ
│       └── commitments.js        ← 6 cam kết
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## 🎯 TRACKING — ĐÃ CẤU HÌNH SẴN

### ✅ Meta Pixel — ID: `2157352735031955`
- Đã chèn `<script>` Meta Pixel vào `<head>` của `index.html`
- Tự fire event `PageView` khi trang load
- Khi user submit form → fire event `Lead` với data:
  - `content_name`: tên khoá học
  - `content_category`: trung tâm chọn
  - `value: 0`, `currency: "VND"`

### ✅ Google Analytics 4 — ID: `G-0K2CW1DQK1`
- Đã chèn `<script>` GA4 vào `<head>`
- Tự track pageview
- Khi user submit form → fire event `generate_lead` với params:
  - `course_name`, `center`, `currency: VND`, `value: 0`

### ✅ Google Sheet — Lưu lead tự động
- Endpoint Apps Script:
  `https://script.google.com/macros/s/AKfycbzL_pQgB0NivwwVl9Dz8EJv5CTkRFhI7v_F9zKg5lZiBFSO0jqgo4ylqWXpNgotzSdX/exec`
- Submit form → POST data lên Sheet (mode no-cors)
- Data gồm: `name, phone, email, center, course`

### ✅ Custom Events
- `FormSubmitClick` (Pixel) khi user click nút submit
- `form_submit_attempt` (GA4) tương tự
- `FloatingCTA_RegisterClick` / `FloatingCTA_ZaloClick`

---

## ⚙️ PLACEHOLDERS CẦN THAY SAU

### 🔧 1. Link nhóm Zalo phụ huynh
Trong `src/components/RegistrationForm.jsx`:
```javascript
const ZALO_GROUP_LINK = 'https://zalo.me/g/[ZALO_GROUP_LINK]';
```
Thay `[ZALO_GROUP_LINK]` bằng link nhóm Zalo phụ huynh thật.

### 🔧 2. Logo và OG Image
Trong `index.html`:
```html
<meta property="og:image" content="https://laptrinhrobot.vn/og-image.jpg" />
```
Upload file `og-image.jpg` (1200×630px) vào thư mục `public/`.

Logo SVG hiện tại là placeholder (`public/favicon.svg`). Có thể thay bằng logo thật nếu có file SVG/PNG.

### 🔧 3. Google Maps embed (4 trung tâm)
Trong `src/data/locations.js` — 4 URL `mapEmbed` hiện đang là placeholder gần đúng.
Cách lấy URL chuẩn:
1. Vào Google Maps → tìm địa chỉ trung tâm
2. Click "Chia sẻ" → "Nhúng bản đồ" → copy URL từ thuộc tính `src` của iframe

### 🔧 4. Số liệu giải thưởng nội bộ (`src/data/awards.js`)
Đang là placeholder: `50+`, `20+`, `10+`. Cập nhật số thật.

### 🔧 5. Nội dung 4 học phần × 5 năm (`src/data/roadmap-5-years.js`)
Hiện chỉ có Năm 1 HP1 đầy đủ 12 buổi. Các HP khác cần điền nội dung chi tiết (mỗi HP gồm `name`, `description`, `skills[5]`, `sessionList[12]`, `achievement`).

---

## 🎨 DESIGN SYSTEM

| Màu | Hex | Dùng cho |
|---|---|---|
| `primary-orange` | `#F97316` | CTA chính, accent |
| `primary-purple` | `#7C3AED` | CTA phụ, badge |
| `primary-purple-dark` | `#6B21A8` | Hover state |
| `soft-yellow` | `#FEF3C7` | Nền box highlight |
| `soft-cream` | `#FFF7ED` | Nền section |
| `soft-purple` | `#F3E8FF` | Nền box |
| `urgent` | `#DC2626` | Lỗi, urgency |
| `success` | `#10B981` | Xác nhận, hợp lệ |

**Font:** Be Vietnam Pro (Google Fonts, đã import trong `index.html`)

**Utility classes** (trong `index.css`): `container-site`, `heading-1`, `heading-2`, `btn-primary`, `btn-secondary`, `btn-outline`, `card-base`, `badge-orange`, `badge-purple`, `badge-green`, `badge-red`, `text-gradient-orange-purple`, `bg-gradient-orange-purple`.

---

## 📱 RESPONSIVE BREAKPOINTS

- Mobile: < 640px (`sm:`)
- Tablet: 640–1024px (`md:`, `lg:`)
- Desktop: ≥ 1024px (`lg:`, `xl:`)

Đã test với 3 viewport: 375px (iPhone), 768px (iPad), 1280px (Desktop).

---

## 🚢 DEPLOYMENT

### Vercel (khuyến nghị)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy thư mục dist/
```

### Hosting truyền thống (FTP)
1. `npm run build` → output trong `dist/`
2. Upload toàn bộ nội dung `dist/` lên hosting
3. Đảm bảo hosting hỗ trợ SPA (redirect mọi route về `index.html`)

**Lưu ý:** Domain `laptrinhrobot.vn` cần trỏ về hosting và bật HTTPS.

---

## 🧪 VERIFY TRACKING SAU KHI DEPLOY

### Meta Pixel
1. Cài extension **Meta Pixel Helper** trên Chrome
2. Vào `laptrinhrobot.vn` → biểu tượng phải hiện màu xanh
3. Submit form thử → check event `Lead` xuất hiện
4. Vào **Events Manager** Facebook → xem real-time events

### GA4
1. Vào **GA4 → Reports → Realtime**
2. Vào website → check user xuất hiện
3. Submit form → check event `generate_lead` trong DebugView

### Google Sheet
1. Mở Google Sheet được kết nối với Apps Script
2. Submit form thử → row mới phải xuất hiện sau 5–10 giây

---

## 📞 LIÊN HỆ HỖ TRỢ

- **Hotline:** 0818.823.720
- **Email:** satarobo@gmail.com
- **Trụ sở:** 258 Lê Thanh Nghị, Hoà Cường, Đà Nẵng

---

© 2026 Công ty Cổ phần Công nghệ Giáo dục Sata Robo
