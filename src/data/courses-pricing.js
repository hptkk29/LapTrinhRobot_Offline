// =============================================
// DANH SÁCH KHOÁ HỌC & BẢNG GIÁ — SATA ROBO
// Early Bird áp dụng đến hết 31/05/2026 (Sata1–Sata7)
// =============================================

export const courseGroups = [
  {
    group: 'Luyện thi & Cam kết thi đấu',
    courses: [
      {
        id: 'Sata1',
        name: 'Robosim Master',
        shortName: 'Sata1 — Robosim Master',
        grade: 'Lớp 1–8',
        sessions: 16,
        device: 'Robosim phần mềm',
        listPrice: 2400000,
        earlyBirdSataMath: 1800000,
        earlyBirdOutside: 2040000,
        insiderPerSession: 112500,
        badge: 'Luyện thi vòng loại',
        note: 'Early Bird đến 31/05/2026',
        value: 'Sata1 — Robosim Master — Lớp 1–8 — 16 buổi — Early Bird Satamath 1.800.000đ / HV ngoài 2.040.000đ'
      },
      {
        id: 'Sata2',
        name: 'Đấu Trường Robot',
        shortName: 'Sata2 — Đấu Trường Robot',
        grade: 'Lớp 3–8',
        sessions: 16,
        device: 'Robosim + Beta thật',
        listPrice: 3040000,
        earlyBirdSataMath: 2280000,
        earlyBirdOutside: 2584000,
        insiderPerSession: 142500,
        badge: 'Bán kết & Chung kết',
        note: 'Early Bird đến 31/05/2026',
        value: 'Sata2 — Đấu Trường Robot — Lớp 3–8 — 16 buổi — Early Bird Satamath 2.280.000đ / HV ngoài 2.584.000đ'
      },
      {
        id: 'Combo',
        name: 'Combo Sata1 + Sata2',
        shortName: 'Combo Sata1 + Sata2',
        grade: 'Lớp 1–8',
        sessions: 32,
        device: 'Robosim phần mềm + Beta thật',
        listPrice: 5440000,
        comboPrice: 3808000,
        savedAmount: 1632000,
        earlyBirdSataMath: null,
        earlyBirdOutside: null,
        insiderPerSession: null,
        badge: 'Gói đề xuất',
        note: 'Gói đề xuất — tiết kiệm 1.632.000đ so với mua lẻ',
        value: 'Combo Sata1 + Sata2 — Lớp 1–8 — 32 buổi — 3.808.000đ (tiết kiệm 1.632.000đ)'
      },
      {
        id: 'Sata8',
        name: 'Vé Vàng Chung Kết Khu Vực Miền Trung',
        shortName: 'Sata8 — Vé Vàng Chung Kết',
        grade: 'Lớp 1–8',
        sessions: 5,
        device: 'Robosim + Sa bàn thực chiến',
        listPrice: 2500000,
        fixedPrice: 2500000,
        earlyBirdSataMath: null,
        earlyBirdOutside: null,
        insiderPerSession: null,
        badge: 'Cam kết hoàn tiền 100%',
        note: 'Gói cam kết độc lập — không áp dụng giảm giá. Hoàn 100% nếu đủ điều kiện nhưng không vượt vòng loại.',
        value: 'Sata8 — Vé Vàng Chung Kết — Lớp 1–8 — 5 buổi — 2.500.000đ'
      }
    ]
  },
  {
    group: 'Khóa chuyên sâu 48 buổi',
    courses: [
      {
        id: 'Sata3',
        name: 'Ươm Mầm Tài Năng',
        shortName: 'Sata3 — Ươm Mầm Tài Năng',
        grade: 'Lớp 1–2',
        sessions: 48,
        device: 'Alpha (ZMRobo Alpha Series)',
        pricePerSession: 220000,
        listPrice: 10560000,
        earlyBirdSataMath: 7920000,
        earlyBirdOutside: 8976000,
        insiderPerSession: 165000,
        badge: 'Phù hợp cho học sinh mới bắt đầu',
        note: 'Early Bird đến 31/05/2026',
        value: 'Sata3 — Ươm Mầm Tài Năng — Lớp 1–2 — 48 buổi — Early Bird Satamath 7.920.000đ / HV ngoài 8.976.000đ'
      },
      {
        id: 'Sata4',
        name: 'Bứt Phá Giới Hạn',
        shortName: 'Sata4 — Bứt Phá Giới Hạn',
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
        value: 'Sata4 — Bứt Phá Giới Hạn — Lớp 3–4 — 48 buổi — Early Bird Satamath 8.640.000đ / HV ngoài 9.792.000đ'
      },
      {
        id: 'Sata5',
        name: 'Khơi Nguồn Sáng Tạo',
        shortName: 'Sata5 — Khơi Nguồn Sáng Tạo',
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
        value: 'Sata5 — Khơi Nguồn Sáng Tạo — Lớp 5 — 48 buổi — Early Bird Satamath 9.360.000đ / HV ngoài 10.608.000đ'
      },
      {
        id: 'Sata6',
        name: 'Chinh Phục Đấu Trường',
        shortName: 'Sata6 — Chinh Phục Đấu Trường',
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
        value: 'Sata6 — Chinh Phục Đấu Trường — Lớp 6–7 — 48 buổi — Early Bird Satamath 10.080.000đ / HV ngoài 11.424.000đ'
      },
      {
        id: 'Sata7',
        name: 'Kiến Tạo Tương Lai',
        shortName: 'Sata7 — Kiến Tạo Tương Lai',
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
        value: 'Sata7 — Kiến Tạo Tương Lai — Lớp 8 — 48 buổi — Early Bird Satamath 10.800.000đ / HV ngoài 12.240.000đ'
      }
    ]
  }
];

export const CONSULT_OPTION = {
  id: 'consult',
  name: 'Chưa biết — Cần tư vấn',
  value: 'Chưa biết — Cần tư vấn lộ trình phù hợp'
};
