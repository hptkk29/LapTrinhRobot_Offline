// =============================================
// DANH SACH KHOA HOC & BANG GIA — SATA ROBO
// Early Bird ap dung tu 01/05 den het 31/05/2026 cho Sata1–Sata7.
// =============================================

export const courseGroups = [
  {
    group: 'Khóa luyện thi & cam kết thi đấu',
    description: 'Dành cho học sinh muốn luyện thi Sáng tạo Robotics 2026 theo lộ trình ngắn hạn, tập trung vào RoboSim, robot Beta và chiến thuật thi đấu.',
    courses: [
      {
        id: 'Sata1',
        name: 'Robosim Master',
        shortName: 'Sata1 — Robosim Master',
        displayName: 'Robosim Master',
        grade: 'Lớp 1–8',
        sessions: 16,
        device: 'RoboSim phần mềm',
        listPrice: 2400000,
        earlyBirdSataMath: 1800000,
        earlyBirdOutside: 2040000,
        insiderPerSession: 112500,
        pricePerSession: 150000,
        badge: 'Luyện thi RoboSim',
        note: 'Khóa luyện thi RoboSim dành cho vòng loại trực tuyến.',
        value: 'Sata1 — Robosim Master — Lớp 1–8 — 16 buổi — Early Bird Satamath 1.800.000đ / HV ngoài 2.040.000đ'
      },
      {
        id: 'Sata2',
        name: 'Đấu trường Robot',
        shortName: 'Sata2 — Đấu trường Robot',
        displayName: 'Đấu trường Robot',
        grade: 'Lớp 3–8',
        sessions: 16,
        device: 'RoboSim + Robot Beta thật',
        listPrice: 3040000,
        earlyBirdSataMath: 2280000,
        earlyBirdOutside: 2584000,
        insiderPerSession: 142500,
        pricePerSession: 190000,
        badge: 'Luyện thi Beta cấp khu vực',
        note: 'Khóa luyện thi robot Beta thật dành cho cấp khu vực, bán kết và chung kết.',
        value: 'Sata2 — Đấu trường Robot — Lớp 3–8 — 16 buổi — Early Bird Satamath 2.280.000đ / HV ngoài 2.584.000đ'
      },
      {
        id: 'Combo',
        name: 'Combo Sata1 + Sata2',
        shortName: 'Combo Sata1 + Sata2',
        displayName: 'Full Lộ Trình Luyện Thi',
        grade: 'Lớp 1–8',
        sessions: 32,
        device: 'RoboSim phần mềm + Robot Beta thật',
        listPrice: 5440000,
        comboPrice: 3808000,
        savedAmount: 1632000,
        earlyBirdSataMath: null,
        earlyBirdOutside: null,
        insiderPerSession: 119000,
        badge: 'Gói đề xuất',
        note: 'Gói này bao gồm cả Sata1 — Robosim Master và Sata2 — Đấu trường Robot. Phụ huynh chỉ cần chọn gói Combo nếu muốn con học trọn lộ trình luyện thi từ vòng loại RoboSim đến robot Beta cấp khu vực.',
        value: 'Combo Sata1 + Sata2 — Lớp 1–8 — 32 buổi — 3.808.000đ (tiết kiệm 1.632.000đ)'
      },
      {
        id: 'Sata8',
        name: 'Vé Vàng Chung Kết Khu Vực Miền Trung',
        shortName: 'Sata8 — Vé Vàng Chung Kết',
        displayName: 'Vé Vàng Chung Kết Khu Vực Miền Trung',
        grade: 'Lớp 1–8',
        sessions: 5,
        device: 'RoboSim + Sa bàn thực chiến',
        listPrice: 2500000,
        fixedPrice: 2500000,
        earlyBirdSataMath: null,
        earlyBirdOutside: null,
        insiderPerSession: null,
        badge: 'Cam kết hoàn tiền 100%',
        note: 'Gói cam kết độc lập, không áp dụng giảm giá. Hoàn 100% học phí gói Sata8 nếu học viên đủ điều kiện nhưng không vượt vòng loại.',
        value: 'Sata8 — Vé Vàng Chung Kết — Lớp 1–8 — 5 buổi — 2.500.000đ'
      }
    ]
  },
  {
    group: 'Khóa chuyên sâu 48 buổi',
    description: 'Lộ trình Robotics dài hạn 5 năm, dành cho học sinh từ lớp 1 đến lớp 8, phát triển tư duy công nghệ, kỹ năng robot và năng lực thuyết trình dự án.',
    courses: [
      {
        id: 'Sata3',
        name: 'Ươm Mầm Tài Năng',
        shortName: 'Sata3 — Ươm Mầm Tài Năng',
        displayName: 'Ươm Mầm Tài Năng',
        grade: 'Lớp 1–2',
        sessions: 48,
        device: 'Alpha',
        pricePerSession: 220000,
        listPrice: 10560000,
        earlyBirdSataMath: 7920000,
        earlyBirdOutside: 8976000,
        insiderPerSession: 165000,
        installmentSataMath: 660000,
        installmentOutside: 748000,
        badge: 'Khởi đầu Robotics',
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 1–2.',
        value: 'Sata3 — Ươm Mầm Tài Năng — Lớp 1–2 — 48 buổi — Early Bird Satamath 7.920.000đ / HV ngoài 8.976.000đ'
      },
      {
        id: 'Sata4',
        name: 'Bứt Phá Giới Hạn',
        shortName: 'Sata4 — Bứt Phá Giới Hạn',
        displayName: 'Bứt Phá Giới Hạn',
        grade: 'Lớp 3–4',
        sessions: 48,
        device: 'RoboSim + Beta',
        pricePerSession: 240000,
        listPrice: 11520000,
        earlyBirdSataMath: 8640000,
        earlyBirdOutside: 9792000,
        insiderPerSession: 180000,
        installmentSataMath: 720000,
        installmentOutside: 816000,
        badge: null,
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 3–4.',
        value: 'Sata4 — Bứt Phá Giới Hạn — Lớp 3–4 — 48 buổi — Early Bird Satamath 8.640.000đ / HV ngoài 9.792.000đ'
      },
      {
        id: 'Sata5',
        name: 'Khơi Nguồn Sáng Tạo',
        shortName: 'Sata5 — Khơi Nguồn Sáng Tạo',
        displayName: 'Khơi Nguồn Sáng Tạo',
        grade: 'Lớp 5',
        sessions: 48,
        device: 'Storm cao cấp',
        pricePerSession: 260000,
        listPrice: 12480000,
        earlyBirdSataMath: 9360000,
        earlyBirdOutside: 10608000,
        insiderPerSession: 195000,
        installmentSataMath: 780000,
        installmentOutside: 884000,
        badge: null,
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 5.',
        value: 'Sata5 — Khơi Nguồn Sáng Tạo — Lớp 5 — 48 buổi — Early Bird Satamath 9.360.000đ / HV ngoài 10.608.000đ'
      },
      {
        id: 'Sata6',
        name: 'Chinh Phục Đấu Trường',
        shortName: 'Sata6 — Chinh Phục Đấu Trường',
        displayName: 'Chinh Phục Đấu Trường',
        grade: 'Lớp 6–7',
        sessions: 48,
        device: 'RoboSim Elite + Beta cao cấp',
        pricePerSession: 280000,
        listPrice: 13440000,
        earlyBirdSataMath: 10080000,
        earlyBirdOutside: 11424000,
        insiderPerSession: 210000,
        installmentSataMath: 840000,
        installmentOutside: 952000,
        badge: null,
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 6–7.',
        value: 'Sata6 — Chinh Phục Đấu Trường — Lớp 6–7 — 48 buổi — Early Bird Satamath 10.080.000đ / HV ngoài 11.424.000đ'
      },
      {
        id: 'Sata7',
        name: 'Kiến Tạo Tương Lai',
        shortName: 'Sata7 — Kiến Tạo Tương Lai',
        displayName: 'Kiến Tạo Tương Lai',
        grade: 'Lớp 8',
        sessions: 48,
        device: 'Storm AI + Cảm biến thông minh',
        pricePerSession: 300000,
        listPrice: 14400000,
        earlyBirdSataMath: 10800000,
        earlyBirdOutside: 12240000,
        insiderPerSession: 225000,
        installmentSataMath: 900000,
        installmentOutside: 1020000,
        badge: null,
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 8.',
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
