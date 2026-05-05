// =============================================
// LỘ TRÌNH ĐÀO TẠO 5 NĂM — SATA ROBO
// 5 năm × 4 học phần/năm × 12 buổi/HP = 240 buổi tổng
// =============================================

export const roadmap5Years = [
  // ============== NĂM 1 — ƯƠM MẦM TÀI NĂNG ==============
  {
    year: 1,
    name: 'Ươm Mầm Tài Năng',
    ageRange: '6 – 7 tuổi',
    grade: 'Lớp 1 – 2',
    description:
      'Bước đầu khám phá thế giới công nghệ. Con làm quen với tư duy lập trình qua trò chơi và câu chuyện sinh động — gieo hạt mầm yêu thích từ những giờ học đầu tiên.',
    totalSessions: 48,
    totalHours: 96,
    color: 'primary-orange',
    note: 'Chặng này tập trung gieo niềm yêu thích với công nghệ — chưa hướng đến thi đấu.',
    modules: [
      {
        id: 'HP1',
        name: 'Khám Phá Lập Trình Kéo Thả',
        sessions: 12,
        hours: 24,
        description:
          'Con làm quen với Scratch — học những lệnh đầu tiên qua trò chơi và câu chuyện thân thuộc.',
        skills: [
          'Tư duy logic cơ bản',
          'Lệnh di chuyển & âm thanh',
          'Vòng lặp đơn giản',
          'Tư duy sáng tạo qua trò chơi',
          'Làm việc nhóm'
        ],
        sessionList: [
          { num: 1, content: 'Làm quen Scratch — Bố mẹ đi cùng con buổi đầu', type: 'Lý thuyết' },
          { num: 2, content: 'Thiệp sinh nhật cho mẹ — Lệnh di chuyển', type: 'Thực hành' },
          { num: 3, content: 'Chú gà tìm con — Điều kiện đơn giản', type: 'Thực hành' },
          { num: 4, content: 'An toàn giao thông — Vòng lặp', type: 'Thực hành' },
          { num: 5, content: 'Trò chơi đua xe Scratch', type: 'Thực hành' },
          { num: 6, content: 'Câu chuyện cổ tích interactive', type: 'Dự án' },
          { num: 7, content: 'Hoạt hình về gia đình', type: 'Thực hành' },
          { num: 8, content: 'Mini game đầu tiên của con', type: 'Dự án' },
          { num: 9, content: 'Kể chuyện bằng Scratch', type: 'Thực hành' },
          { num: 10, content: 'Thử thách sáng tạo cá nhân', type: 'Thực hành' },
          { num: 11, content: 'Hoàn thiện dự án cuối học phần', type: 'Dự án' },
          { num: 12, content: 'Trình bày & Demo cho phụ huynh', type: 'Thi đấu' }
        ],
        achievement:
          'Con tự xây dựng 1 game Scratch hoặc câu chuyện hoạt hình hoàn chỉnh, trình bày trước phụ huynh.'
      },
      {
        id: 'HP2',
        name: 'Phát Triển Tư Duy Toán Học Với Lập Trình',
        sessions: 12,
        hours: 24,
        description:
          'Kết hợp toán học và lập trình — con học đếm, cộng trừ, hình học qua các dự án Scratch.',
        skills: [
          'Tư duy toán học',
          'Biến số cơ bản',
          'Toán hình & toạ độ',
          'Phép so sánh',
          'Giải quyết vấn đề'
        ],
        sessionList: [
          { num: 1, content: 'Toán đếm cùng nhân vật Scratch', type: 'Lý thuyết' },
          { num: 2, content: 'Bài toán cộng trừ tương tác', type: 'Thực hành' },
          { num: 3, content: 'Vẽ hình bằng câu lệnh', type: 'Thực hành' },
          { num: 4, content: 'Hệ toạ độ — Robot tìm kho báu', type: 'Thực hành' },
          { num: 5, content: 'Trò chơi đố toán — biến số', type: 'Thực hành' },
          { num: 6, content: 'Bảng cửu chương vui nhộn', type: 'Dự án' },
          { num: 7, content: 'Đồng hồ digital tự lập trình', type: 'Thực hành' },
          { num: 8, content: 'Máy tính bỏ túi mini', type: 'Dự án' },
          { num: 9, content: 'Trò chơi toán học sáng tạo', type: 'Thực hành' },
          { num: 10, content: 'Mê cung toán học', type: 'Thực hành' },
          { num: 11, content: 'Hoàn thiện ứng dụng toán', type: 'Dự án' },
          { num: 12, content: 'Demo & nhận chứng nhận HP2', type: 'Thi đấu' }
        ],
        achievement: 'Con xây dựng được 1 ứng dụng học toán cá nhân hoá hoàn chỉnh.'
      },
      {
        id: 'HP3',
        name: 'Kể Chuyện Và Hoạt Hình Số',
        sessions: 12,
        hours: 24,
        description:
          'Con phát triển khả năng kể chuyện qua hoạt hình số — kết hợp lập trình với kể chuyện sáng tạo.',
        skills: [
          'Kể chuyện sáng tạo',
          'Animation cơ bản',
          'Âm thanh & lồng tiếng',
          'Cốt truyện đa nhánh',
          'Trình bày'
        ],
        sessionList: [
          { num: 1, content: 'Cấu trúc một câu chuyện hay', type: 'Lý thuyết' },
          { num: 2, content: 'Tạo nhân vật chính của con', type: 'Thực hành' },
          { num: 3, content: 'Animation di chuyển nhân vật', type: 'Thực hành' },
          { num: 4, content: 'Bối cảnh & sân khấu số', type: 'Thực hành' },
          { num: 5, content: 'Lồng tiếng & âm thanh', type: 'Thực hành' },
          { num: 6, content: 'Cốt truyện đa nhánh', type: 'Dự án' },
          { num: 7, content: 'Hiệu ứng đặc biệt', type: 'Thực hành' },
          { num: 8, content: 'Kể chuyện về gia đình', type: 'Dự án' },
          { num: 9, content: 'Phát triển nhân vật phụ', type: 'Thực hành' },
          { num: 10, content: 'Hoạt cảnh phức tạp', type: 'Thực hành' },
          { num: 11, content: 'Hoàn thiện phim hoạt hình ngắn', type: 'Dự án' },
          { num: 12, content: 'Buổi chiếu phim phụ huynh', type: 'Thi đấu' }
        ],
        achievement: 'Phim hoạt hình ngắn 2-3 phút do con tự lập trình và lồng tiếng.'
      },
      {
        id: 'HP4',
        name: 'Mini Game Đầu Đời',
        sessions: 12,
        hours: 24,
        description:
          'Tổng hợp tất cả kiến thức năm 1 — con tự thiết kế và lập trình 1 mini game hoàn chỉnh từ đầu đến cuối.',
        skills: [
          'Game design tư duy',
          'Tổng hợp kiến thức',
          'Tự lực thiết kế',
          'Test & sửa lỗi',
          'Phát hành dự án'
        ],
        sessionList: [
          { num: 1, content: 'Game mình thích là game gì?', type: 'Lý thuyết' },
          { num: 2, content: 'Brainstorm ý tưởng game', type: 'Thực hành' },
          { num: 3, content: 'Thiết kế nhân vật game', type: 'Thực hành' },
          { num: 4, content: 'Cơ chế chơi cơ bản', type: 'Thực hành' },
          { num: 5, content: 'Hệ thống điểm số', type: 'Thực hành' },
          { num: 6, content: 'Mức độ khó tăng dần', type: 'Dự án' },
          { num: 7, content: 'Boss & thử thách', type: 'Thực hành' },
          { num: 8, content: 'Âm thanh & nhạc nền', type: 'Dự án' },
          { num: 9, content: 'Test game với bạn bè', type: 'Thực hành' },
          { num: 10, content: 'Sửa lỗi & cân bằng', type: 'Thực hành' },
          { num: 11, content: 'Hoàn thiện game cuối năm', type: 'Dự án' },
          { num: 12, content: 'Lễ tốt nghiệp Năm 1 + Demo game', type: 'Thi đấu' }
        ],
        achievement:
          'Con tốt nghiệp Năm 1 với 1 game hoàn chỉnh + bộ portfolio 4 dự án — sẵn sàng bước vào Năm 2 với robot vật lý.'
      }
    ]
  },

  // ============== NĂM 2 — BỨT PHÁ GIỚI HẠN ==============
  {
    year: 2,
    name: 'Bứt Phá Giới Hạn',
    ageRange: '8 – 9 tuổi',
    grade: 'Lớp 3 – 4',
    description:
      'Con bước vào thế giới robot thực tế — lắp ráp, lập trình và điều khiển robot vật lý. Bắt đầu được tham gia thi đấu Bảng R1.',
    totalSessions: 48,
    totalHours: 96,
    color: 'primary-purple',
    note: 'Chặng này con đủ tuổi để dự thi vòng loại Robotics Bảng R1.',
    modules: [
      {
        id: 'HP1',
        name: 'Lắp Ráp Robot Đầu Tiên',
        sessions: 12,
        hours: 24,
        description: 'Con làm quen bộ kit robot vật lý — lắp ráp, hiểu các bộ phận và chức năng.',
        skills: ['Cơ khí cơ bản', 'Đọc sơ đồ lắp ráp', 'Hiểu cảm biến', 'Động cơ & bánh xe', 'Kiên nhẫn'],
        sessionList: [
          { num: 1, content: 'Mở hộp & tham quan kit robot', type: 'Lý thuyết' },
          { num: 2, content: 'Khung sườn robot — bước 1', type: 'Thực hành' },
          { num: 3, content: 'Lắp động cơ & bánh xe', type: 'Thực hành' },
          { num: 4, content: 'Cảm biến — mắt và tai của robot', type: 'Thực hành' },
          { num: 5, content: 'Đèn LED & loa robot', type: 'Thực hành' },
          { num: 6, content: 'Lắp hoàn chỉnh robot đầu tiên', type: 'Dự án' },
          { num: 7, content: 'Kiểm tra & test phần cứng', type: 'Thực hành' },
          { num: 8, content: 'Cá nhân hoá robot — sticker, tên', type: 'Dự án' },
          { num: 9, content: 'Phân biệt 5 loại cảm biến', type: 'Thực hành' },
          { num: 10, content: 'Robot di chuyển cơ bản', type: 'Thực hành' },
          { num: 11, content: 'Chinh phục thử thách lắp ráp', type: 'Dự án' },
          { num: 12, content: 'Trình diễn robot cá nhân', type: 'Thi đấu' }
        ],
        achievement: 'Con sở hữu 1 robot vật lý đã lắp ráp hoàn chỉnh — robot đầu tiên trong đời.'
      },
      {
        id: 'HP2',
        name: 'Lập Trình Robot Di Chuyển',
        sessions: 12,
        hours: 24,
        description: 'Học cách điều khiển robot bằng code — robot tiến lùi, rẽ trái phải, tránh vật cản.',
        skills: ['Block-based coding', 'Điều khiển động cơ', 'Cảm biến khoảng cách', 'Vòng lặp robot', 'Logic điều kiện'],
        sessionList: [
          { num: 1, content: 'Phần mềm lập trình robot', type: 'Lý thuyết' },
          { num: 2, content: 'Robot tiến — robot lùi', type: 'Thực hành' },
          { num: 3, content: 'Rẽ trái, rẽ phải — đo góc', type: 'Thực hành' },
          { num: 4, content: 'Robot vẽ hình vuông', type: 'Thực hành' },
          { num: 5, content: 'Robot vẽ đa giác', type: 'Thực hành' },
          { num: 6, content: 'Cảm biến khoảng cách', type: 'Dự án' },
          { num: 7, content: 'Robot tránh vật cản', type: 'Thực hành' },
          { num: 8, content: 'Robot tự đỗ xe', type: 'Dự án' },
          { num: 9, content: 'Mê cung — robot tự thoát', type: 'Thực hành' },
          { num: 10, content: 'Lập trình theo chuỗi nhiệm vụ', type: 'Thực hành' },
          { num: 11, content: 'Hoàn thiện robot tự lái', type: 'Dự án' },
          { num: 12, content: 'Đua robot mini — nội bộ lớp', type: 'Thi đấu' }
        ],
        achievement: 'Robot di chuyển tự động vượt qua mê cung do giảng viên thiết kế.'
      },
      {
        id: 'HP3',
        name: 'Sa Hình Thi Đấu R1 — Cấp Độ Cơ Bản',
        sessions: 12,
        hours: 24,
        description:
          'Con làm quen với sa hình thi đấu Robotics chuẩn quốc tế — luyện kỹ năng giải nhiệm vụ trên thời gian thực.',
        skills: ['Đọc sa hình', 'Lên chiến lược', 'Quản lý thời gian', 'Sửa lỗi nhanh', 'Tinh thần thi đấu'],
        sessionList: [
          { num: 1, content: 'Giới thiệu cuộc thi Robotics R1', type: 'Lý thuyết' },
          { num: 2, content: 'Đọc & phân tích sa hình', type: 'Thực hành' },
          { num: 3, content: 'Nhiệm vụ 1 — gắp vật', type: 'Thực hành' },
          { num: 4, content: 'Nhiệm vụ 2 — đẩy vật về đích', type: 'Thực hành' },
          { num: 5, content: 'Nhiệm vụ 3 — cảm biến màu', type: 'Thực hành' },
          { num: 6, content: 'Kết hợp 3 nhiệm vụ liên tiếp', type: 'Dự án' },
          { num: 7, content: 'Tối ưu thời gian chạy', type: 'Thực hành' },
          { num: 8, content: 'Backup plan khi thi đấu', type: 'Dự án' },
          { num: 9, content: 'Mock test 1', type: 'Thực hành' },
          { num: 10, content: 'Phân tích lỗi & cải thiện', type: 'Thực hành' },
          { num: 11, content: 'Mock test 2 — hoàn chỉnh', type: 'Dự án' },
          { num: 12, content: 'Vòng loại nội bộ Sata Robo R1', type: 'Thi đấu' }
        ],
        achievement: 'Con đủ năng lực dự thi Bảng R1 cấp Đà Nẵng và Quốc Gia.'
      },
      {
        id: 'HP4',
        name: 'Sáng Tạo Dự Án Robot Cá Nhân',
        sessions: 12,
        hours: 24,
        description:
          'Con tự nghĩ ra 1 dự án robot giải quyết vấn đề thực tế — robot hữu ích cho gia đình hoặc cộng đồng.',
        skills: ['Tư duy thiết kế', 'Giải quyết vấn đề thực tế', 'Pitch ý tưởng', 'Thử nghiệm', 'Báo cáo'],
        sessionList: [
          { num: 1, content: 'Robot trong cuộc sống — case study', type: 'Lý thuyết' },
          { num: 2, content: 'Brainstorm vấn đề cần giải quyết', type: 'Thực hành' },
          { num: 3, content: 'Phác hoạ robot ý tưởng', type: 'Thực hành' },
          { num: 4, content: 'Lập kế hoạch xây dựng', type: 'Thực hành' },
          { num: 5, content: 'Lắp ráp prototype', type: 'Thực hành' },
          { num: 6, content: 'Lập trình logic chính', type: 'Dự án' },
          { num: 7, content: 'Test & ghi nhận kết quả', type: 'Thực hành' },
          { num: 8, content: 'Cải tiến phiên bản 2', type: 'Dự án' },
          { num: 9, content: 'Hoàn thiện thẩm mỹ', type: 'Thực hành' },
          { num: 10, content: 'Chuẩn bị bài thuyết trình', type: 'Thực hành' },
          { num: 11, content: 'Tổng duyệt & quay video demo', type: 'Dự án' },
          { num: 12, content: 'Hội nghị Sáng Tạo Sata Robo Năm 2', type: 'Thi đấu' }
        ],
        achievement: 'Con có 1 dự án robot cá nhân — sẵn sàng dự các cuộc thi sáng tạo cấp quốc gia.'
      }
    ]
  },

  // ============== NĂM 3 — KHƠI NGUỒN SÁNG TẠO ==============
  {
    year: 3,
    name: 'Khơi Nguồn Sáng Tạo',
    ageRange: '10 tuổi',
    grade: 'Lớp 5',
    description:
      'Năm chuyển giao — con củng cố nền tảng vững vàng trước khi bước vào THCS. Hoàn thiện kỹ năng Bảng R1, chuẩn bị nâng lên R2.',
    totalSessions: 48,
    totalHours: 96,
    color: 'primary-orange',
    note: 'Năm bản lề — nền tảng vững để bước vào đấu trường R2.',
    modules: [
      {
        id: 'HP1',
        name: 'Lập Trình Python Cơ Bản',
        sessions: 12,
        hours: 24,
        description: 'Con chuyển từ Block sang gõ code thật — học Python cơ bản qua dự án thú vị.',
        skills: ['Cú pháp Python', 'Biến & kiểu dữ liệu', 'Vòng lặp & điều kiện', 'Hàm cơ bản', 'Debug code'],
        sessionList: [
          { num: 1, content: 'Hello World — Python đầu tiên', type: 'Lý thuyết' },
          { num: 2, content: 'Biến số & in ra màn hình', type: 'Thực hành' },
          { num: 3, content: 'Phép tính & toán tử', type: 'Thực hành' },
          { num: 4, content: 'Câu lệnh điều kiện if-else', type: 'Thực hành' },
          { num: 5, content: 'Vòng lặp for & while', type: 'Thực hành' },
          { num: 6, content: 'Mini game đoán số', type: 'Dự án' },
          { num: 7, content: 'Danh sách & tuple', type: 'Thực hành' },
          { num: 8, content: 'Hàm — viết code tái sử dụng', type: 'Dự án' },
          { num: 9, content: 'Thư viện turtle — vẽ hình', type: 'Thực hành' },
          { num: 10, content: 'Game tic-tac-toe Python', type: 'Thực hành' },
          { num: 11, content: 'Tổng hợp dự án Python HP1', type: 'Dự án' },
          { num: 12, content: 'Đánh giá & nhận chứng nhận', type: 'Thi đấu' }
        ],
        achievement: 'Con thành thạo Python cơ bản — đọc và viết được code Python ngắn.'
      },
      {
        id: 'HP2',
        name: 'Robot Nâng Cao R1',
        sessions: 12,
        hours: 24,
        description: 'Hoàn thiện kỹ năng thi đấu Bảng R1 — chuẩn bị tham gia các kỳ thi cấp quốc gia.',
        skills: ['Sa hình R1 nâng cao', 'Tối ưu code', 'Đa nhiệm vụ', 'Chiến thuật thi đấu', 'Sửa lỗi áp lực'],
        sessionList: [
          { num: 1, content: 'Phân tích đề thi R1 năm trước', type: 'Lý thuyết' },
          { num: 2, content: 'Sa hình R1 nâng cao — bước 1', type: 'Thực hành' },
          { num: 3, content: 'Sa hình R1 nâng cao — bước 2', type: 'Thực hành' },
          { num: 4, content: 'Lập trình robot đa nhiệm', type: 'Thực hành' },
          { num: 5, content: 'Cảm biến nâng cao — kết hợp', type: 'Thực hành' },
          { num: 6, content: 'Quản lý pin & rủi ro', type: 'Dự án' },
          { num: 7, content: 'Chiến thuật rút thời gian', type: 'Thực hành' },
          { num: 8, content: 'Mock test áp lực thật', type: 'Dự án' },
          { num: 9, content: 'Phân tích đối thủ', type: 'Thực hành' },
          { num: 10, content: 'Tinh thần thi đấu', type: 'Thực hành' },
          { num: 11, content: 'Tổng duyệt R1 cuối', type: 'Dự án' },
          { num: 12, content: 'Sata Robo R1 Championship', type: 'Thi đấu' }
        ],
        achievement: 'Con có khả năng dự thi giải R1 cấp Quốc Gia (RBT, X-Robotics, VEX IQ).'
      },
      {
        id: 'HP3',
        name: 'Khám Phá AI Cho Trẻ Em',
        sessions: 12,
        hours: 24,
        description: 'Giới thiệu AI một cách thân thiện — con học cách máy nhận diện hình ảnh, giọng nói.',
        skills: ['AI căn bản', 'Computer Vision', 'Speech Recognition', 'Đạo đức AI', 'Tư duy phản biện'],
        sessionList: [
          { num: 1, content: 'AI là gì? Câu chuyện thực tế', type: 'Lý thuyết' },
          { num: 2, content: 'Teachable Machine — dạy AI', type: 'Thực hành' },
          { num: 3, content: 'AI nhận diện hình ảnh', type: 'Thực hành' },
          { num: 4, content: 'AI nhận diện giọng nói', type: 'Thực hành' },
          { num: 5, content: 'AI nhận diện cử chỉ', type: 'Thực hành' },
          { num: 6, content: 'Robot + AI — kết hợp', type: 'Dự án' },
          { num: 7, content: 'AI sáng tạo hình ảnh', type: 'Thực hành' },
          { num: 8, content: 'AI sáng tạo âm nhạc', type: 'Dự án' },
          { num: 9, content: 'AI có thể sai — nhìn ra giới hạn', type: 'Thực hành' },
          { num: 10, content: 'Đạo đức khi dùng AI', type: 'Thực hành' },
          { num: 11, content: 'Dự án AI giải quyết vấn đề', type: 'Dự án' },
          { num: 12, content: 'Triển lãm AI Sata Robo', type: 'Thi đấu' }
        ],
        achievement: 'Con tự huấn luyện được 1 mô hình AI nhỏ giải quyết bài toán cụ thể.'
      },
      {
        id: 'HP4',
        name: 'Dự Án Khoa Học Liên Môn',
        sessions: 12,
        hours: 24,
        description:
          'Tích hợp Robotics + AI + Khoa học để giải quyết 1 bài toán thực — chuẩn bị portfolio cho năm 4.',
        skills: ['Tư duy liên môn', 'Phương pháp khoa học', 'Tham luận', 'Quản lý dự án', 'Trình bày học thuật'],
        sessionList: [
          { num: 1, content: 'Phương pháp khoa học STEM', type: 'Lý thuyết' },
          { num: 2, content: 'Chọn vấn đề & giả thuyết', type: 'Thực hành' },
          { num: 3, content: 'Nghiên cứu & thu thập', type: 'Thực hành' },
          { num: 4, content: 'Thiết kế giải pháp', type: 'Thực hành' },
          { num: 5, content: 'Lắp ráp prototype', type: 'Thực hành' },
          { num: 6, content: 'Lập trình điều khiển', type: 'Dự án' },
          { num: 7, content: 'Thí nghiệm & ghi nhận', type: 'Thực hành' },
          { num: 8, content: 'Phân tích kết quả', type: 'Dự án' },
          { num: 9, content: 'Cải tiến lần 2', type: 'Thực hành' },
          { num: 10, content: 'Viết báo cáo khoa học', type: 'Thực hành' },
          { num: 11, content: 'Chuẩn bị poster & demo', type: 'Dự án' },
          { num: 12, content: 'Hội nghị STEM Sata Robo Năm 3', type: 'Thi đấu' }
        ],
        achievement: 'Con có 1 dự án nghiên cứu khoa học hoàn chỉnh — đủ chuẩn nộp các cuộc thi sáng tạo trẻ.'
      }
    ]
  },

  // ============== NĂM 4 — CHINH PHỤC ĐẤU TRƯỜNG ==============
  {
    year: 4,
    name: 'Chinh Phục Đấu Trường',
    ageRange: '11 – 12 tuổi',
    grade: 'Lớp 6 – 7',
    description:
      'Con bước vào THCS — chính thức thi đấu Bảng R2 cấp quốc gia. Đào tạo cường độ cao, hướng đến huy chương.',
    totalSessions: 48,
    totalHours: 96,
    color: 'primary-purple',
    note: 'Năm thi đấu chính — hướng đến giải Quốc Gia và Quốc Tế.',
    modules: [
      {
        id: 'HP1',
        name: 'Robot R2 — Nền Tảng',
        sessions: 12,
        hours: 24,
        description: 'Tiếp cận sa hình R2 với độ phức tạp cao — robot lớn hơn, nhiệm vụ khó hơn.',
        skills: ['Cấu trúc robot R2', 'Hệ truyền động phức tạp', 'Cảm biến đa kênh', 'Code Python sâu', 'Tinh thần thi đấu'],
        sessionList: [
          { num: 1, content: 'Khác biệt R1 vs R2', type: 'Lý thuyết' },
          { num: 2, content: 'Lắp ráp robot R2 chuẩn', type: 'Thực hành' },
          { num: 3, content: 'Hệ truyền động đa bánh', type: 'Thực hành' },
          { num: 4, content: 'Cảm biến đa kênh đồng bộ', type: 'Thực hành' },
          { num: 5, content: 'Lập trình PID đơn giản', type: 'Thực hành' },
          { num: 6, content: 'Robot tự cân bằng', type: 'Dự án' },
          { num: 7, content: 'Cánh tay robot', type: 'Thực hành' },
          { num: 8, content: 'Robot phân loại vật thể', type: 'Dự án' },
          { num: 9, content: 'Tích hợp Bluetooth', type: 'Thực hành' },
          { num: 10, content: 'Điều khiển từ xa', type: 'Thực hành' },
          { num: 11, content: 'Tổng hợp robot R2 hoàn chỉnh', type: 'Dự án' },
          { num: 12, content: 'Demo & đánh giá robot R2', type: 'Thi đấu' }
        ],
        achievement: 'Con có robot R2 chuẩn thi đấu — sẵn sàng cho mọi giải đấu.'
      },
      {
        id: 'HP2',
        name: 'Chiến Thuật Thi Đấu R2',
        sessions: 12,
        hours: 24,
        description: 'Học cách lập kế hoạch thi đấu, phân tích đối thủ và backup plan dưới áp lực.',
        skills: ['Game theory', 'Phân tích đối thủ', 'Backup plans', 'Quản lý áp lực', 'Teamwork thi đấu'],
        sessionList: [
          { num: 1, content: 'Phân tích đề thi quốc gia 2024', type: 'Lý thuyết' },
          { num: 2, content: 'Lập kế hoạch tổng thể', type: 'Thực hành' },
          { num: 3, content: 'Phân tích nhiệm vụ điểm cao', type: 'Thực hành' },
          { num: 4, content: 'Chiến lược ưu tiên', type: 'Thực hành' },
          { num: 5, content: 'Backup plan A-B-C', type: 'Thực hành' },
          { num: 6, content: 'Mock match 1 — không áp lực', type: 'Dự án' },
          { num: 7, content: 'Phân tích trận thua', type: 'Thực hành' },
          { num: 8, content: 'Mock match 2 — áp lực thật', type: 'Dự án' },
          { num: 9, content: 'Tâm lý vững khi thi', type: 'Thực hành' },
          { num: 10, content: 'Teamwork đôi/tổ', type: 'Thực hành' },
          { num: 11, content: 'Mock match cuối cùng', type: 'Dự án' },
          { num: 12, content: 'Sata Robo R2 Cup Nội Bộ', type: 'Thi đấu' }
        ],
        achievement: 'Con đủ năng lực và bản lĩnh dự giải Robotics Quốc Gia (RBT, VEX, WRO).'
      },
      {
        id: 'HP3',
        name: 'AI Ứng Dụng Trong Robot',
        sessions: 12,
        hours: 24,
        description: 'Tích hợp Computer Vision và Machine Learning vào robot vật lý — đỉnh cao kỹ thuật.',
        skills: ['OpenCV cơ bản', 'TensorFlow Lite', 'Robot tự nhận diện', 'Edge AI', 'Tích hợp hardware-software'],
        sessionList: [
          { num: 1, content: 'AI + Robot — case study WRC', type: 'Lý thuyết' },
          { num: 2, content: 'OpenCV — xử lý ảnh cơ bản', type: 'Thực hành' },
          { num: 3, content: 'Robot nhận diện màu sắc', type: 'Thực hành' },
          { num: 4, content: 'Robot nhận diện hình dáng', type: 'Thực hành' },
          { num: 5, content: 'Robot nhận diện vật thể', type: 'Thực hành' },
          { num: 6, content: 'Train mô hình ML đơn giản', type: 'Dự án' },
          { num: 7, content: 'Triển khai mô hình lên robot', type: 'Thực hành' },
          { num: 8, content: 'Robot phân loại rác thông minh', type: 'Dự án' },
          { num: 9, content: 'Robot theo dõi đối tượng', type: 'Thực hành' },
          { num: 10, content: 'Robot trợ lý gia đình mini', type: 'Thực hành' },
          { num: 11, content: 'Hoàn thiện robot AI', type: 'Dự án' },
          { num: 12, content: 'Triển lãm Robot AI', type: 'Thi đấu' }
        ],
        achievement: 'Con sở hữu 1 robot tích hợp AI — đủ chuẩn dự các cuộc thi WRC, FIRST LEGO League.'
      },
      {
        id: 'HP4',
        name: 'Đỉnh Cao Cuộc Thi',
        sessions: 12,
        hours: 24,
        description: 'Tổng duyệt cường độ cao trước mùa thi — luyện như VĐV chuyên nghiệp.',
        skills: ['Peak performance', 'Stress management', 'Live problem solving', 'Pitch trước BGK', 'Thi đấu thực tế'],
        sessionList: [
          { num: 1, content: 'Lịch trình thi đấu năm 2026', type: 'Lý thuyết' },
          { num: 2, content: 'Tổng duyệt R2 lần 1', type: 'Thực hành' },
          { num: 3, content: 'Phân tích lỗi & sửa', type: 'Thực hành' },
          { num: 4, content: 'Tổng duyệt R2 lần 2', type: 'Thực hành' },
          { num: 5, content: 'Sửa lỗi áp lực', type: 'Thực hành' },
          { num: 6, content: 'Tổng duyệt cuối kỳ', type: 'Dự án' },
          { num: 7, content: 'Kỹ năng pitch trước BGK', type: 'Thực hành' },
          { num: 8, content: 'Q&A áp lực', type: 'Dự án' },
          { num: 9, content: 'Thi đấu giao hữu liên trung tâm', type: 'Thực hành' },
          { num: 10, content: 'Phục hồi & tâm lý', type: 'Thực hành' },
          { num: 11, content: 'Tổng kết hành trình R2', type: 'Dự án' },
          { num: 12, content: 'Sata Robo Grand Final Năm 4', type: 'Thi đấu' }
        ],
        achievement:
          'Con tham gia ít nhất 1 giải Quốc Gia chính thức trong năm — có cơ hội cao đạt huy chương.'
      }
    ]
  },

  // ============== NĂM 5 — KIẾN TẠO TƯƠNG LAI ==============
  {
    year: 5,
    name: 'Kiến Tạo Tương Lai',
    ageRange: '13 tuổi',
    grade: 'Lớp 8',
    description:
      'Đỉnh cao của hành trình — con xây portfolio, chuẩn bị du học STEM, định hướng nghề nghiệp công nghệ tương lai.',
    totalSessions: 48,
    totalHours: 96,
    color: 'primary-orange',
    note: 'Định hướng nghề nghiệp & chuẩn bị du học STEM.',
    modules: [
      {
        id: 'HP1',
        name: 'Portfolio Cá Nhân Số',
        sessions: 12,
        hours: 24,
        description: 'Xây dựng website portfolio cá nhân — showcase tất cả dự án 4 năm qua.',
        skills: ['HTML & CSS', 'Web design cơ bản', 'Storytelling kỹ thuật', 'Thiết kế UX', 'Cá nhân hoá thương hiệu'],
        sessionList: [
          { num: 1, content: 'Portfolio là gì? Vì sao cần?', type: 'Lý thuyết' },
          { num: 2, content: 'HTML cơ bản', type: 'Thực hành' },
          { num: 3, content: 'CSS — làm đẹp trang', type: 'Thực hành' },
          { num: 4, content: 'Thiết kế trang chủ', type: 'Thực hành' },
          { num: 5, content: 'Trang dự án cá nhân', type: 'Thực hành' },
          { num: 6, content: 'Trang giới thiệu bản thân', type: 'Dự án' },
          { num: 7, content: 'Tích hợp video demo', type: 'Thực hành' },
          { num: 8, content: 'Liên kết GitHub & social', type: 'Dự án' },
          { num: 9, content: 'Responsive design', type: 'Thực hành' },
          { num: 10, content: 'Test & sửa', type: 'Thực hành' },
          { num: 11, content: 'Deploy lên hosting miễn phí', type: 'Dự án' },
          { num: 12, content: 'Ra mắt portfolio public', type: 'Thi đấu' }
        ],
        achievement: 'Con có 1 website portfolio public — sẵn sàng đính kèm hồ sơ học bổng.'
      },
      {
        id: 'HP2',
        name: 'Dự Án Khởi Nghiệp Trẻ',
        sessions: 12,
        hours: 24,
        description:
          'Con học tư duy khởi nghiệp — biến 1 ý tưởng tech thành dự án có giá trị thực, với người dùng thật.',
        skills: ['Tư duy khởi nghiệp', 'User research', 'MVP', 'Pitch deck', 'Đo lường thành công'],
        sessionList: [
          { num: 1, content: 'Khởi nghiệp tech là gì?', type: 'Lý thuyết' },
          { num: 2, content: 'Tìm vấn đề trong cuộc sống', type: 'Thực hành' },
          { num: 3, content: 'Phỏng vấn user thực', type: 'Thực hành' },
          { num: 4, content: 'Phác hoạ giải pháp MVP', type: 'Thực hành' },
          { num: 5, content: 'Xây dựng MVP', type: 'Thực hành' },
          { num: 6, content: 'Test MVP với user thật', type: 'Dự án' },
          { num: 7, content: 'Đo lường feedback', type: 'Thực hành' },
          { num: 8, content: 'Iterate sản phẩm', type: 'Dự án' },
          { num: 9, content: 'Marketing cơ bản', type: 'Thực hành' },
          { num: 10, content: 'Pitch deck startup', type: 'Thực hành' },
          { num: 11, content: 'Demo Day chuẩn bị', type: 'Dự án' },
          { num: 12, content: 'Sata Robo Demo Day', type: 'Thi đấu' }
        ],
        achievement: 'Con có 1 dự án MVP đang hoạt động với user thực — bằng chứng năng lực khởi nghiệp.'
      },
      {
        id: 'HP3',
        name: 'Chuẩn Bị Du Học STEM',
        sessions: 12,
        hours: 24,
        description:
          'Hỗ trợ định hướng nghề nghiệp + chuẩn bị hồ sơ học bổng STEM nước ngoài (Singapore, Mỹ, Châu Âu).',
        skills: ['Tiếng Anh kỹ thuật', 'Viết essay STEM', 'Giới thiệu thành tích', 'Chuẩn bị thi quốc tế', 'Mentor 1-1'],
        sessionList: [
          { num: 1, content: 'Bản đồ học bổng STEM 2030', type: 'Lý thuyết' },
          { num: 2, content: 'Tiếng Anh kỹ thuật', type: 'Thực hành' },
          { num: 3, content: 'Tự thuật bản thân', type: 'Thực hành' },
          { num: 4, content: 'Essay học bổng — bước 1', type: 'Thực hành' },
          { num: 5, content: 'Essay học bổng — bước 2', type: 'Thực hành' },
          { num: 6, content: 'Phỏng vấn mock', type: 'Dự án' },
          { num: 7, content: 'Giới thiệu thành tích', type: 'Thực hành' },
          { num: 8, content: 'Recommendation letter', type: 'Dự án' },
          { num: 9, content: 'Tài chính du học', type: 'Thực hành' },
          { num: 10, content: 'Q&A với cựu du học sinh', type: 'Thực hành' },
          { num: 11, content: 'Hoàn thiện hồ sơ mẫu', type: 'Dự án' },
          { num: 12, content: 'Hội thảo Định Hướng Du Học', type: 'Thi đấu' }
        ],
        achievement: 'Con có hồ sơ mẫu hoàn chỉnh + roadmap du học rõ ràng đến lớp 12.'
      },
      {
        id: 'HP4',
        name: 'Tổng Kết Hành Trình 5 Năm',
        sessions: 12,
        hours: 24,
        description:
          'Năm cuối — con tổng hợp tất cả kiến thức 5 năm, làm dự án Capstone đỉnh cao và lễ tốt nghiệp đặc biệt.',
        skills: ['Capstone project', 'Mentor cho khối nhỏ', 'Lãnh đạo dự án', 'Trình bày trước cộng đồng', 'Đánh giá đồng nghiệp'],
        sessionList: [
          { num: 1, content: 'Lập kế hoạch Capstone', type: 'Lý thuyết' },
          { num: 2, content: 'Phân tích yêu cầu', type: 'Thực hành' },
          { num: 3, content: 'Thiết kế kiến trúc', type: 'Thực hành' },
          { num: 4, content: 'Lắp ráp phần cứng', type: 'Thực hành' },
          { num: 5, content: 'Phát triển phần mềm', type: 'Thực hành' },
          { num: 6, content: 'Tích hợp AI/Cloud', type: 'Dự án' },
          { num: 7, content: 'Test & QA toàn diện', type: 'Thực hành' },
          { num: 8, content: 'Mentor cho học viên Năm 1', type: 'Dự án' },
          { num: 9, content: 'Hoàn thiện capstone', type: 'Thực hành' },
          { num: 10, content: 'Tổng duyệt thuyết trình', type: 'Thực hành' },
          { num: 11, content: 'Quay video documentary', type: 'Dự án' },
          { num: 12, content: '🎓 LỄ TỐT NGHIỆP SATA ROBO 5 NĂM', type: 'Thi đấu' }
        ],
        achievement:
          '🏆 Con tốt nghiệp với 1 capstone đỉnh cao + portfolio 5 năm + chứng nhận Sata Robo Honors — sẵn sàng cho hành trình chuyên nghiệp tiếp theo.'
      }
    ]
  }
];
