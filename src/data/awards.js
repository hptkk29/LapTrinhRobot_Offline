// =====================================
// SATA ROBO CHAMPIONSHIP — Giải thưởng nội bộ
// =====================================

export const internalAwards = {
  totalValue: '36.000.000đ',
  perYear: 12, // 12 kỳ thi/năm
  perEvent: '3.000.000đ',
  description:
    '12 kỳ thi hàng tháng — dành riêng cho học viên tại các trung tâm Sata Robo.',
  prizes: [
    {
      rank: 1,
      icon: '🥇',
      name: 'Giải Nhất',
      reward: '1.200.000đ + Trophy + Chứng nhận',
      note: 'Vinh danh toàn bộ fanpage Sata Robo'
    },
    {
      rank: 2,
      icon: '🥈',
      name: 'Giải Nhì',
      reward: '800.000đ + Chứng nhận',
      note: 'Ảnh lưu niệm tại Lab + gửi Zalo PH'
    },
    {
      rank: 3,
      icon: '🥉',
      name: 'Giải Ba',
      reward: '500.000đ + Chứng nhận',
      note: 'Cùng cơ chế vinh danh'
    },
    {
      rank: 'KK',
      icon: '🎖️',
      name: 'Khuyến Khích × 3',
      reward: '200.000đ × 3 (voucher/kit)',
      note: '3 học viên xuất sắc tiếp theo'
    }
  ]
};

// =====================================
// THÀNH TÍCH HỌC VIÊN — bên ngoài
// =====================================

export const externalAchievements = [
  {
    level: 'bronze',
    icon: '🥉',
    title: 'Giải Đồng Nội Bộ',
    count: '50+',
    description: 'học viên đạt giải đồng trong các kỳ thi nội bộ Sata Robo mỗi năm.'
  },
  {
    level: 'silver',
    icon: '🥈',
    title: 'Giải Bạc Thành Phố',
    count: '20+',
    description: 'học viên đạt giải bạc cấp thành phố Đà Nẵng trong các năm gần nhất.'
  },
  {
    level: 'gold',
    icon: '🥇',
    title: 'Giải Vàng Quốc Gia',
    count: '10+',
    description: 'học viên đạt giải vàng trong các kỳ thi Robotics cấp quốc gia (RBT, X-Robotics, VEX...).'
  }
];
