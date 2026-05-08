import { courseGroups } from '../data/courses-pricing';

const allCourses = courseGroups.flatMap((group) => group.courses);

export const getCourseById = (productCode) =>
  allCourses.find((course) => course.id === productCode) ?? null;

export const getCourseValue = (productCode) => getCourseById(productCode)?.value ?? '';

export const selectCourse = (productCode, extra = {}) => {
  const course = getCourseById(productCode);
  if (!course) return;

  const payload = {
    productCode,
    courseValue: course.value,
    ...extra
  };

  try {
    sessionStorage.setItem('sata-selected-age-course', JSON.stringify(payload));
  } catch {
    // Ignore storage issues; the event still updates the current page.
  }

  window.dispatchEvent(new CustomEvent('sata-course-selected', { detail: payload }));
};

export const ageCourseOptions = [
  {
    label: 'Lớp 1-2',
    grade: 'Sata3',
    productCode: 'Sata3',
    courseName: 'Ươm Mầm Tài Năng',
    yearIndex: 0
  },
  {
    label: 'Lớp 3-4',
    grade: 'Sata4',
    productCode: 'Sata4',
    courseName: 'Bứt Phá Giới Hạn',
    yearIndex: 1
  },
  {
    label: 'Lớp 5',
    grade: 'Sata5',
    productCode: 'Sata5',
    courseName: 'Khơi Nguồn Sáng Tạo',
    yearIndex: 2
  },
  {
    label: 'Lớp 6-7',
    grade: 'Sata6',
    productCode: 'Sata6',
    courseName: 'Chinh Phục Đấu Trường',
    yearIndex: 3
  },
  {
    label: 'Lớp 8',
    grade: 'Sata7',
    productCode: 'Sata7',
    courseName: 'Kiến Tạo Tương Lai',
    yearIndex: 4
  }
].map((option) => ({
  ...option,
  courseValue: getCourseValue(option.productCode),
  durationSummary: (() => {
    const course = getCourseById(option.productCode);
    return course ? `${course.sessions} buổi - ${course.durationPerSession}/buổi - Tổng ${course.totalDuration}` : '';
  })()
}));

export const isValidCourseSelection = (payload) =>
  Boolean(payload?.courseValue) &&
  allCourses.some((course) => course.value === payload.courseValue) &&
  (
    payload.yearIndex === undefined ||
    (
      Number.isInteger(payload.yearIndex) &&
      payload.yearIndex >= 0 &&
      payload.yearIndex <= 4
    )
  );

export const readStoredCourseSelection = () => {
  try {
    const raw = sessionStorage.getItem('sata-selected-age-course');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidCourseSelection(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
