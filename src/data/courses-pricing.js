// =============================================
// DANH SÁCH KHOÁ HỌC & BẢNG GIÁ — SATA ROBO
// Early Bird áp dụng đến hết 31/05/2026 cho khóa chuyên sâu 48 buổi
// =============================================

export const courseGroups = [
  {
    group: 'Khóa chuyên sâu 48 buổi',
    courses: [
      {
        id: 'Sata3',
        name: 'Ươm Mầm Tài Năng',
        shortName: 'Ươm Mầm Tài Năng',
        grade: 'Lớp 1–2',
        sessions: 48,
        device: 'Alpha',
        pricePerSession: 220000,
        listPrice: 10560000,
        earlyBirdSataMath: 7920000,
        earlyBirdOutside: 8976000,
        insiderPerSession: 165000,
        badge: 'Phù hợp cho học sinh mới bắt đầu',
        note: 'Early Bird đến 31/05/2026',
        value: 'Ươm Mầm Tài Năng — Lớp 1–2 — 48 buổi — Early Bird Satamath 7.920.000đ / HV ngoài 8.976.000đ'
      },
      {
        id: 'Sata4',
        name: 'Bứt Phá Giới Hạn',
        shortName: 'Bứt Phá Giới Hạn',
        grade: 'Lớp 3–4',
        sessions: 48,
        device: 'Robosim + Beta',
        pricePerSession: 240000,
        listPrice: 11520000,
        earlyBirdSataMath: 8640000,
        earlyBirdOutside: 9792000,
        insiderPerSession: 180000,
        badge: null,
        note: 'Early Bird đến 31/05/2026',
        value: 'Bứt Phá Giới Hạn — Lớp 3–4 — 48 buổi — Early Bird Satamath 8.640.000đ / HV ngoài 9.792.000đ'
      },
      {
        id: 'Sata5',
        name: 'Khơi Nguồn Sáng Tạo',
        shortName: 'Khơi Nguồn Sáng Tạo',
        grade: 'Lớp 5',
        sessions: 48,
        device: 'Storm cao cấp',
        pricePerSession: 260000,
        listPrice: 12480000,
        earlyBirdSataMath: 9360000,
        earlyBirdOutside: 10608000,
        insiderPerSession: 195000,
        badge: null,
        note: 'Early Bird đến 31/05/2026',
        value: 'Khơi Nguồn Sáng Tạo — Lớp 5 — 48 buổi — Early Bird Satamath 9.360.000đ / HV ngoài 10.608.000đ'
      },
      {
        id: 'Sata6',
        name: 'Chinh Phục Đấu Trường',
        shortName: 'Chinh Phục Đấu Trường',
        grade: 'Lớp 6–7',
        sessions: 48,
        device: 'Robosim Elite + Beta cao cấp',
        pricePerSession: 280000,
        listPrice: 13440000,
        earlyBirdSataMath: 10080000,
        earlyBirdOutside: 11424000,
        insiderPerSession: 210000,
        badge: null,
        note: 'Early Bird đến 31/05/2026',
        value: 'Chinh Phục Đấu Trường — Lớp 6–7 — 48 buổi — Early Bird Satamath 10.080.000đ / HV ngoài 11.424.000đ'
      },
      {
        id: 'Sata7',
        name: 'Kiến Tạo Tương Lai',
        shortName: 'Kiến Tạo Tương Lai',
        grade: 'Lớp 8',
        sessions: 48,
        device: 'Storm AI + Cảm biến thông minh',
        pricePerSession: 300000,
        listPrice: 14400000,
        earlyBirdSataMath: 10800000,
        earlyBirdOutside: 12240000,
        insiderPerSession: 225000,
        badge: null,
        note: 'Early Bird đến 31/05/2026',
        value: 'Kiến Tạo Tương Lai — Lớp 8 — 48 buổi — Early Bird Satamath 10.800.000đ / HV ngoài 12.240.000đ'
      }
    ]
  }
];

export const CONSULT_OPTION = {
  id: 'consult',
  name: 'Chưa biết — Cần tư vấn',
  value: 'Chưa biết — Cần tư vấn lộ trình phù hợp'
};
