import {
  subMonths,
  subDays,
  startOfMonth,
  differenceInDays,
  format,
} from 'date-fns';

/**
 * 퇴직일 기준 역산 3개월 기간 계산 (근로기준법 기준)
 * 시작일: 퇴직일로부터 정확히 3개월 전 날짜
 * 종료일: 퇴직일 전날
 * 예: 퇴직일이 2024년 7월 16일이면 → 2024년 4월 16일 ~ 7월 15일
 * @param {Date|string} retirementDate - 퇴직일
 * @returns {{ startDate: Date, endDate: Date, totalDays: number }}
 */
export function calculate3MonthsPeriod(retirementDate) {
  const retirement = retirementDate instanceof Date ? retirementDate : new Date(retirementDate);
  // 퇴직일로부터 정확히 3개월 전 날짜
  const start = subMonths(retirement, 3);
  // 퇴직일 전날 (퇴직일은 제외)
  const end = subDays(retirement, 1);
  const totalDays = differenceInDays(end, start) + 1;
  return { startDate: start, endDate: end, totalDays };
}

/**
 * 입사일과 퇴직일 사이의 총 재직일수 (양 끝 포함)
 * @param {Date|string} startDate - 입사일
 * @param {Date|string} endDate - 퇴직일
 * @returns {number}
 */
export function calculateWorkingDays(startDate, endDate) {
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);
  return differenceInDays(end, start) + 1;
}

/**
 * 날짜를 "2024년 1월" 형식으로 반환
 * @param {Date|string} date
 * @returns {string}
 */
export function getMonthLabel(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return format(d, 'yyyy년 M월');
}

/**
 * 퇴직일 기준 역산 3개월 기간에 해당하는 월 라벨 배열
 * 시작일이 속한 월부터 정확히 3개월치 월 라벨 반환
 * @param {Date|string} retirementDate - 퇴직일
 * @returns {string[]} 예: 퇴직일이 2024년 7월 16일이면 ["2024년 4월", "2024년 5월", "2024년 6월"]
 */
export function get3MonthsLabels(retirementDate) {
  const retirement = retirementDate instanceof Date ? retirementDate : new Date(retirementDate);
  const { startDate } = calculate3MonthsPeriod(retirement);
  
  const labels = [];
  // 시작일이 속한 월부터 정확히 3개월치
  for (let i = 0; i < 3; i++) {
    const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    labels.push(getMonthLabel(monthDate));
  }
  
  return labels;
}
