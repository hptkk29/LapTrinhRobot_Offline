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
    label: '6–7 tuổi',
    grade: 'Lớp 1–2',
    productCode: 'Sata3',
    courseName: 'Ươm Mầm Tài Năng',
    yearIndex: 0
  },
  {
    label: '8–9 tuổi',
    grade: 'Lớp 3–4',
    productCode: 'Sata4',
    courseName: 'Bứt Phá Giới Hạn',
    yearIndex: 1
  },
  {
    label: '10 tuổi',
    grade: 'Lớp 5',
    productCode: 'Sata5',
    courseName: 'Khơi Nguồn Sáng Tạo',
    yearIndex: 2
  },
  {
    label: '11–12 tuổi',
    grade: 'Lớp 6–7',
    productCode: 'Sata6',
    courseName: 'Chinh Phục Đấu Trường',
    yearIndex: 3
  },
  {
    label: '13 tuổi',
    grade: 'Lớp 8',
    productCode: 'Sata7',
    courseName: 'Kiến Tạo Tương Lai',
    yearIndex: 4
  }
].map((option) => ({
  ...option,
  courseValue: getCourseValue(option.productCode)
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
