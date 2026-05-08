const examDuration = {
  durationPerSession: '90 phút'
};

const contestLessons = [
  'Giới thiệu cuộc thi Sáng tạo Robotics năm 2026',
  'Dự án Xe robot di chuyển',
  'Dự án Tìm hiểu về cảm biến dò line',
  'Dự án Xe robot tự hành',
  'Phân tích thể lệ thi đấu bảng Tiểu học',
  'Thiết kế lắp ráp robot thi đấu',
  'Giải đề nhiệm vụ thi đấu lần 1',
  'Giải đề nhiệm vụ thi đấu lần 2',
  'Giải đề nhiệm vụ thi đấu lần 3',
  'Giải đề nhiệm vụ thi đấu lần 4',
  'Giải đề nhiệm vụ thi đấu lần 5',
  'Tổng hợp tất cả nhiệm vụ thi đấu',
  'Tối ưu chương trình lập trình',
  'Kiểm tra phần thi lắp ráp robot',
  'Kiểm tra phần thi lập trình nhiệm vụ',
  'Phổ biến quy chế thi, tổng kết'
];

export const examRoadmap = [
  {
    id: 'Sata1',
    displayName: 'Robosim Master',
    groupName: 'Khóa luyện thi',
    educationLevel: 'Tiểu học',
    grade: 'Lớp 3–5',
    sessions: 16,
    totalDuration: '24 giờ',
    device: 'RoboSim phần mềm',
    format: 'Trực tiếp, kết hợp E-learning',
    description:
      'Bồi dưỡng kiến thức nền tảng về lập trình robot trên RoboSim, phân tích thể lệ thi đấu bảng Tiểu học, thiết kế robot thi đấu trong môi trường 3D, lập trình di chuyển đường line, thực hiện nhiệm vụ trên sa bàn, tối ưu chương trình và phổ biến quy chế thi.',
    goal:
      'Bồi dưỡng cho học sinh kiến thức và kỹ năng nền tảng về lập trình và lắp ráp Robotics, phát triển tư duy thuật toán, năng lực giải quyết vấn đề và sáng tạo, đáp ứng yêu cầu tham gia các cuộc thi Robotics dành cho học sinh Tiểu học.',
    outcomes: [
      'Hiểu cấu tạo và nguyên lý hoạt động cơ bản của robot.',
      'Lập trình robot thực hiện nhiệm vụ di chuyển, xử lý cảm biến và hoàn thành nhiệm vụ thi đấu.',
      'Phân tích đề thi, lựa chọn giải pháp kỹ thuật và tối ưu chương trình.',
      'Trình bày được quy trình lắp ráp, lập trình và vận hành robot.'
    ],
    methods: ['Blended Learning', 'Flipped Classroom', 'Luyện tập theo nhiệm vụ bài thi', 'Tự học có hướng dẫn và kiểm soát'],
    lessons: contestLessons,
    ...examDuration
  },
  {
    id: 'Sata2',
    displayName: 'Đấu trường Robot',
    groupName: 'Khóa luyện thi',
    educationLevel: 'Trung học cơ sở',
    grade: 'Lớp 6–9',
    sessions: 16,
    totalDuration: '24 giờ',
    device: 'RoboSim + Robot Beta thật',
    format: 'Trực tiếp, kết hợp E-learning',
    description:
      'Bồi dưỡng kiến thức từ cơ bản đến chuyên sâu cho học sinh THCS, lập trình robot trên RoboSim, phân tích thể lệ bảng THCS, thiết kế robot thi đấu trong không gian 3D RoboSim, lập trình thuật toán di chuyển đường line và thực hiện nhiệm vụ trên sa bàn.',
    goal:
      'Bồi dưỡng cho học sinh THCS kiến thức và kỹ năng nền tảng về lập trình và lắp ráp Robotics, phát triển năng lực tư duy thuật toán, năng lực giải quyết vấn đề, sáng tạo và bản lĩnh thi đấu.',
    outcomes: [
      'Hiểu chức năng hệ cơ khí, truyền động, cảm biến và bộ điều khiển robot.',
      'Lập trình robot xử lý nhiệm vụ thi đấu phù hợp cấp THCS.',
      'Phân tích đề bài, đề xuất giải pháp, thử nghiệm và tối ưu chương trình.',
      'Làm việc nhóm, phối hợp đội thi và trình bày giải pháp kỹ thuật.'
    ],
    methods: ['Blended Learning', 'Flipped Classroom', 'Luyện tập theo nhiệm vụ bài thi', 'Tự học có hướng dẫn và kiểm soát'],
    lessons: contestLessons.map((lesson) => lesson.replace('bảng Tiểu học', 'bảng THCS')),
    ...examDuration
  },
  {
    id: 'Combo',
    displayName: 'Full Lộ Trình Luyện Thi',
    grade: 'Lớp 3–9',
    sessions: 32,
    totalDuration: '48 giờ',
    device: 'RoboSim phần mềm + Robot Beta thật',
    description:
      'Gói Combo bao gồm toàn bộ khóa Robosim Master và Đấu trường Robot. Phụ huynh chọn gói này khi muốn con đi trọn lộ trình luyện thi từ RoboSim đến robot Beta cấp khu vực.',
    highlights: [
      'Bao gồm 16 buổi Robosim Master',
      'Bao gồm 16 buổi Đấu trường Robot',
      'Tổng 32 buổi · 90 phút/buổi · Tổng 48 giờ',
      'Giá combo 3.808.000đ, tiết kiệm 1.632.000đ'
    ],
    ...examDuration
  },
  {
    id: 'Sata8',
    displayName: 'Vé Vàng Chung Kết Khu Vực Miền Trung',
    grade: 'Lớp 3–9',
    sessions: 5,
    totalDuration: '7,5 giờ',
    device: 'RoboSim + Sa bàn thực chiến',
    description:
      'Gói chuyên binh cam kết hoàn tiền 100%, tập trung vào chiến thuật, thi thử, sửa lỗi cá nhân và tổng duyệt trước vòng loại. Đây là gói giá cố định, không áp dụng giảm giá.',
    lessons: [
      'Đào tạo chuyên sâu 1',
      'Đào tạo chuyên sâu 2',
      'Đào tạo chuyên sâu 3',
      'Đào tạo chuyên sâu 4',
      'Đào tạo chuyên sâu 5'
    ],
    ...examDuration
  }
];
