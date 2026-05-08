// =============================================
// DANH SÁCH KHÓA HỌC & BẢNG GIÁ — SATA ROBO
// Early Bird áp dụng từ 01/05 đến hết 31/05/2026 cho Sata1–Sata7.
// =============================================

const withDuration = (course) => ({
  durationPerSession: '90 phút',
  totalDuration:
    course.sessions === 5 ? '7,5 giờ' :
    course.sessions === 16 ? '24 giờ' :
    course.sessions === 32 ? '48 giờ' :
    '72 giờ',
  ...course
});

export const courseGroups = [
  {
    group: 'Khóa luyện thi & cam kết thi đấu',
    description: 'Dành cho học sinh muốn luyện thi Sáng tạo Robotics 2026 theo lộ trình ngắn hạn, tập trung vào RoboSim, robot Beta và chiến thuật thi đấu.',
    courses: [
      withDuration({
        id: 'Sata1',
        name: 'Robosim Master',
        shortName: 'Sata1 — Robosim Master',
        displayName: 'Robosim Master',
        groupName: 'Khóa luyện thi',
        educationLevel: 'Tiểu học',
        grade: 'Lớp 3–5',
        sessions: 16,
        device: 'RoboSim phần mềm',
        format: 'Trực tiếp, kết hợp E-learning',
        listPrice: 2400000,
        earlyBirdSataMath: 1800000,
        earlyBirdOutside: 2040000,
        insiderPerSession: 112500,
        pricePerSession: 150000,
        badge: 'Luyện thi RoboSim',
        note: 'Bồi dưỡng nền tảng RoboSim, phân tích thể lệ bảng Tiểu học, thiết kế robot 3D, lập trình line, tối ưu nhiệm vụ và phổ biến quy chế thi.',
        value: 'Sata1 — Robosim Master — Lớp 3–5 — 16 buổi — 90 phút/buổi — Tổng 24 giờ — Early Bird Satamath 1.800.000đ / HV ngoài 2.040.000đ'
      }),
      withDuration({
        id: 'Sata2',
        name: 'Đấu trường Robot',
        shortName: 'Sata2 — Đấu trường Robot',
        displayName: 'Đấu trường Robot',
        groupName: 'Khóa luyện thi',
        educationLevel: 'Trung học cơ sở',
        grade: 'Lớp 6–9',
        sessions: 16,
        device: 'RoboSim + Robot Beta thật',
        format: 'Trực tiếp, kết hợp E-learning',
        listPrice: 3040000,
        earlyBirdSataMath: 2280000,
        earlyBirdOutside: 2584000,
        insiderPerSession: 142500,
        pricePerSession: 190000,
        badge: 'Luyện thi Beta cấp khu vực',
        note: 'Bồi dưỡng từ cơ bản đến chuyên sâu cho học sinh THCS, luyện RoboSim, thiết kế robot thi đấu 3D, thuật toán line và nhiệm vụ sa bàn.',
        value: 'Sata2 — Đấu trường Robot — Lớp 6–9 — 16 buổi — 90 phút/buổi — Tổng 24 giờ — Early Bird Satamath 2.280.000đ / HV ngoài 2.584.000đ'
      }),
      withDuration({
        id: 'Combo',
        name: 'Combo Sata1 + Sata2',
        shortName: 'Combo Sata1 + Sata2',
        displayName: 'Full Lộ Trình Luyện Thi',
        grade: 'Lớp 3–9',
        sessions: 32,
        device: 'RoboSim phần mềm + Robot Beta thật',
        format: 'Trực tiếp, kết hợp E-learning',
        listPrice: 5440000,
        comboPrice: 3808000,
        savedAmount: 1632000,
        earlyBirdSataMath: null,
        earlyBirdOutside: null,
        insiderPerSession: 119000,
        badge: 'Gói đề xuất',
        note: 'Bao gồm Robosim Master và Đấu trường Robot cho phụ huynh muốn con học trọn lộ trình luyện thi từ RoboSim đến robot Beta.',
        value: 'Combo Sata1 + Sata2 — Lớp 3–9 — 32 buổi — 90 phút/buổi — Tổng 48 giờ — 3.808.000đ (tiết kiệm 1.632.000đ)'
      }),
      withDuration({
        id: 'Sata8',
        name: 'Vé Vàng Chung Kết Khu Vực Miền Trung',
        shortName: 'Sata8 — Vé Vàng Chung Kết',
        displayName: 'Vé Vàng Chung Kết Khu Vực Miền Trung',
        grade: 'Lớp 3–9',
        sessions: 5,
        device: 'RoboSim + Sa bàn thực chiến',
        listPrice: 2500000,
        fixedPrice: 2500000,
        earlyBirdSataMath: null,
        earlyBirdOutside: null,
        insiderPerSession: null,
        badge: 'Cam kết hoàn tiền 100%',
        note: 'Gói giá cố định, không giảm giá. Hoàn tiền 100% nếu học viên đủ điều kiện nhưng không vượt vòng loại.',
        value: 'Sata8 — Vé Vàng Chung Kết — Lớp 3–9 — 5 buổi — 90 phút/buổi — Tổng 7,5 giờ — 2.500.000đ'
      })
    ]
  },
  {
    group: 'Khóa chuyên sâu 48 buổi',
    description: 'Lộ trình Robotics dài hạn 5 năm, dành cho học sinh từ lớp 1 đến lớp 8, phát triển tư duy công nghệ, kỹ năng robot và năng lực thuyết trình dự án.',
    courses: [
      withDuration({
        id: 'Sata3',
        name: 'Ươm Mầm Tài Năng',
        shortName: 'Sata3 — Ươm Mầm Tài Năng',
        displayName: 'Ươm Mầm Tài Năng',
        academicName: 'Robotics Ươm Mầm Tài Năng',
        grade: 'Lớp 1–2',
        ageRange: '6–7 tuổi',
        sessions: 48,
        device: 'Alpha A + C & Cảm biến siêu âm',
        pricePerSession: 220000,
        listPrice: 10560000,
        earlyBirdSataMath: 7920000,
        earlyBirdOutside: 8976000,
        insiderPerSession: 165000,
        installmentSataMath: 660000,
        installmentOutside: 748000,
        badge: 'Khởi đầu Robotics',
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 1–2.',
        value: 'Sata3 — Ươm Mầm Tài Năng — Lớp 1–2 — 48 buổi — 90 phút/buổi — Tổng 72 giờ — Early Bird Satamath 7.920.000đ / HV ngoài 8.976.000đ'
      }),
      withDuration({
        id: 'Sata4',
        name: 'Bứt Phá Giới Hạn',
        shortName: 'Sata4 — Bứt Phá Giới Hạn',
        displayName: 'Bứt Phá Giới Hạn',
        academicName: 'Robotics Bứt Phá Giới Hạn',
        grade: 'Lớp 3–4',
        ageRange: '8–9 tuổi',
        sessions: 48,
        device: 'RoboSim + Beta Set + Saban',
        pricePerSession: 240000,
        listPrice: 11520000,
        earlyBirdSataMath: 8640000,
        earlyBirdOutside: 9792000,
        insiderPerSession: 180000,
        installmentSataMath: 720000,
        installmentOutside: 816000,
        badge: null,
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 3–4.',
        value: 'Sata4 — Bứt Phá Giới Hạn — Lớp 3–4 — 48 buổi — 90 phút/buổi — Tổng 72 giờ — Early Bird Satamath 8.640.000đ / HV ngoài 9.792.000đ'
      }),
      withDuration({
        id: 'Sata5',
        name: 'Khơi Nguồn Sáng Tạo',
        shortName: 'Sata5 — Khơi Nguồn Sáng Tạo',
        displayName: 'Khơi Nguồn Sáng Tạo',
        academicName: 'Robotics Khơi Nguồn Sáng Tạo',
        grade: 'Lớp 5',
        ageRange: '10 tuổi',
        sessions: 48,
        device: 'Hệ thống chuyên gia Storm',
        pricePerSession: 260000,
        listPrice: 12480000,
        earlyBirdSataMath: 9360000,
        earlyBirdOutside: 10608000,
        insiderPerSession: 195000,
        installmentSataMath: 780000,
        installmentOutside: 884000,
        badge: null,
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 5.',
        value: 'Sata5 — Khơi Nguồn Sáng Tạo — Lớp 5 — 48 buổi — 90 phút/buổi — Tổng 72 giờ — Early Bird Satamath 9.360.000đ / HV ngoài 10.608.000đ'
      }),
      withDuration({
        id: 'Sata6',
        name: 'Chinh Phục Đấu Trường',
        shortName: 'Sata6 — Chinh Phục Đấu Trường',
        displayName: 'Chinh Phục Đấu Trường',
        academicName: 'Robotics Chinh Phục Đấu Trường',
        grade: 'Lớp 6–7',
        ageRange: '11–12 tuổi',
        sessions: 48,
        device: 'RoboSim + Beta Set + Saban Competition Standard',
        pricePerSession: 280000,
        listPrice: 13440000,
        earlyBirdSataMath: 10080000,
        earlyBirdOutside: 11424000,
        insiderPerSession: 210000,
        installmentSataMath: 840000,
        installmentOutside: 952000,
        badge: null,
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 6–7.',
        value: 'Sata6 — Chinh Phục Đấu Trường — Lớp 6–7 — 48 buổi — 90 phút/buổi — Tổng 72 giờ — Early Bird Satamath 10.080.000đ / HV ngoài 11.424.000đ'
      }),
      withDuration({
        id: 'Sata7',
        name: 'Kiến Tạo Tương Lai',
        shortName: 'Sata7 — Kiến Tạo Tương Lai',
        displayName: 'Kiến Tạo Tương Lai',
        academicName: 'Robotics Chắp Cánh Tương Lai',
        grade: 'Lớp 8',
        ageRange: '13 tuổi',
        sessions: 48,
        device: 'Storm + AI (Computer Vision Modules)',
        pricePerSession: 300000,
        listPrice: 14400000,
        earlyBirdSataMath: 10800000,
        earlyBirdOutside: 12240000,
        insiderPerSession: 225000,
        installmentSataMath: 900000,
        installmentOutside: 1020000,
        badge: null,
        note: 'Khóa chuyên sâu 48 buổi cho học sinh lớp 8. Nội dung học thuật theo chương trình Robotics Chắp Cánh Tương Lai.',
        value: 'Sata7 — Kiến Tạo Tương Lai — Lớp 8 — 48 buổi — 90 phút/buổi — Tổng 72 giờ — Early Bird Satamath 10.800.000đ / HV ngoài 12.240.000đ'
      })
    ]
  }
];

export const CONSULT_OPTION = {
  id: 'consult',
  name: 'Chưa biết — Cần tư vấn',
  value: 'Chưa biết — Cần tư vấn lộ trình phù hợp'
};
