/**
 * 3개월 임금 총액과 3개월 총 일수로 1일 평균임금 계산 (반올림)
 * @param {number} totalWage3Months - 3개월 임금 총액
 * @param {number} totalDays3Months - 3개월 총 일수
 * @returns {number}
 */
export function calculateAverageDailyWage(totalWage3Months, totalDays3Months) {
  if (!totalDays3Months || totalDays3Months <= 0) return 0;
  return Math.round(totalWage3Months / totalDays3Months);
}

/**
 * 1일 통상임금 계산 (근로기준법 시행령 제6조 기준)
 * 시간급 통상임금 = 월 통상임금 / 월 소정근로시간
 * 1일 통상임금 = 시간급 통상임금 × 1일 소정근로시간수 (8시간)
 * @param {number} monthlyWage - 월 통상임금
 * @param {number} monthlyHours - 월 소정근로시간
 * @returns {number}
 */
export function calculateOrdinaryDailyWage(monthlyWage, monthlyHours) {
  if (!monthlyHours || monthlyHours <= 0) return 0;
  const hourlyWage = monthlyWage / monthlyHours; // 시간급 통상임금
  const dailyWage = hourlyWage * 8; // 1일 통상임금 (8시간 기준)
  return Math.round(dailyWage);
}

/**
 * 퇴직금 계산: 평균임금과 통상임금 중 큰 값을 기준으로
 * 퇴직금 = 기준임금 × 30 × 총재직일수 / 365
 * @param {number} averageDailyWage - 1일 평균임금
 * @param {number} ordinaryDailyWage - 1일 통상임금
 * @param {number} totalWorkingDays - 총 재직일수
 * @returns {{ averageDailyWage: number, ordinaryDailyWage: number, appliedWage: number, appliedWageType: 'average'|'ordinary', retirementPay: number }}
 */
export function calculateRetirementPay(
  averageDailyWage,
  ordinaryDailyWage,
  totalWorkingDays
) {
  const appliedWage =
    ordinaryDailyWage > averageDailyWage ? ordinaryDailyWage : averageDailyWage;
  const appliedWageType =
    ordinaryDailyWage > averageDailyWage ? 'ordinary' : 'average';
  const retirementPay =
    totalWorkingDays <= 0
      ? 0
      : Math.floor((appliedWage * 30 * totalWorkingDays) / 365);

  return {
    averageDailyWage,
    ordinaryDailyWage,
    appliedWage,
    appliedWageType,
    retirementPay,
  };
}
