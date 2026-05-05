import { Lightbulb, FolderOpen, Award } from 'lucide-react';

const methods = [
  {
    icon: Lightbulb,
    iconBg: 'bg-yellow-100 text-yellow-600',
    title: 'PROBLEM-BASED LEARNING',
    description:
      'Học viên được giới thiệu với vấn đề thực tế, tiến hành nghiên cứu và vận dụng kiến thức để phân tích và giải quyết.'
  },
  {
    icon: FolderOpen,
    iconBg: 'bg-purple-100 text-primary-purple',
    title: 'PROJECT-BASED LEARNING',
    description:
      'Học viên xác định vấn đề, đề xuất giải pháp và thực hiện dự án thực tế với mẫu giải pháp, kiểm thử và hoàn thiện.'
  },
  {
    icon: Award,
    iconBg: 'bg-orange-100 text-primary-orange',
    title: 'MASTERY LEARNING',
    description:
      'Học viên được hỗ trợ đạt mức độ thành thạo cụ thể về kiến thức và kỹ năng trước khi chuyển sang bước tiếp theo.'
  }
];

export default function TeachingMethod() {
  return (
    <section className="section-padding bg-soft-cream">
      <div className="container-site">
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <div className="badge-orange mb-4">PHƯƠNG PHÁP ĐỘC QUYỀN</div>
          <h2 className="heading-2 mb-4">
            <span className="text-gradient-orange-purple">PHƯƠNG PHÁP GIẢNG DẠY ĐỘC QUYỀN</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Học viện Sata Robo kết hợp <strong>3 phương pháp giảng dạy tiên tiến</strong>,
            giữ ưu điểm của mô hình truyền thống và tích hợp công nghệ hiện đại.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto mb-10">
          {methods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <div key={idx} className="card-base p-6 sm:p-7 text-center">
                <div className={`inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4 ${method.iconBg}`}>
                  <Icon className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-text-dark mb-3">
                  {method.title}
                </h3>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {method.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-primary-purple/30 p-5 sm:p-6 text-center shadow-card">
          <p className="text-base sm:text-lg text-text-dark leading-relaxed">
            <strong>3 phương pháp này đảm bảo:</strong> Con KHÔNG học để đối phó.<br />
            Con học để <span className="text-primary-orange font-bold">THẬT SỰ HIỂU</span> và{' '}
            <span className="text-primary-purple font-bold">THẬT SỰ LÀM ĐƯỢC.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
