import { formatNumber, formatDate, formatDateShort } from '../utils/formatters'

export default function ResultSection({
  name,
  employeeNumber,
  hireDate,
  retirementDate,
  totalWorkingDays,
  period3Months,
  salary1,
  salary2,
  salary3,
  monthLabels,
  totalSalary,
  averageDailyWage,
  ordinaryDailyWage,
  appliedWage,
  appliedWageType,
  retirementPay,
  monthlyOrdinaryWage,
  monthlyWorkingHours,
}) {
  const labels = monthLabels ?? ['', '', '']

  return (
    <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-6 text-center text-xl font-bold text-gray-800 sm:text-2xl">
        📊 계산 결과
      </h2>

      <div className="space-y-6">
        {/* 근로자 정보 섹션 */}
        {(name || employeeNumber) && (
          <div className="border-b border-gray-200 pb-4">
            <h3 className="mb-3 text-base font-semibold text-gray-700 sm:text-lg">
              👤 근로자 정보
            </h3>
            <div className="space-y-1 text-sm text-gray-600 sm:text-base">
              {name && <p>이름: <span className="font-medium text-gray-800">{name}</span></p>}
              {employeeNumber && (
                <p>인사번호: <span className="font-medium text-gray-800">{employeeNumber}</span></p>
              )}
            </div>
          </div>
        )}

        {/* 재직 기간 섹션 */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="mb-3 text-base font-semibold text-gray-700 sm:text-lg">
            📅 재직 기간
          </h3>
          <div className="space-y-1 text-sm text-gray-600 sm:text-base">
            <p>입사일: {hireDate ? formatDate(new Date(hireDate)) : '-'}</p>
            <p>퇴직일: {retirementDate ? formatDate(new Date(retirementDate)) : '-'}</p>
            <p>
              총 재직일수:{' '}
              <span className="font-medium text-gray-800">
                {totalWorkingDays ? formatNumber(totalWorkingDays) : '-'}일
              </span>
            </p>
          </div>
        </div>

        {/* 3개월 기산 기간 섹션 */}
        {period3Months && (
          <div className="border-b border-gray-200 pb-4">
            <h3 className="mb-3 text-base font-semibold text-gray-700 sm:text-lg">
              📅 3개월 기산 기간
            </h3>
            <div className="text-sm text-gray-600 sm:text-base">
              <p>
                {formatDateShort(period3Months.startDate)} ~{' '}
                {formatDateShort(period3Months.endDate)}
              </p>
              <p className="mt-1">
                총 일수:{' '}
                <span className="font-medium text-gray-800">
                  {formatNumber(period3Months.totalDays)}일
                </span>
              </p>
            </div>
          </div>
        )}

        {/* 3개월 임금 총액 섹션 */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="mb-3 text-base font-semibold text-gray-700 sm:text-lg">
            1️⃣ 3개월 임금 총액
          </h3>
          <div className="space-y-1 text-sm text-gray-600 sm:text-base">
            {labels[0] && (
              <p>
                {labels[0]}: {formatNumber(parseInt(salary1.replace(/,/g, '') || 0))}원
              </p>
            )}
            {labels[1] && (
              <p>
                {labels[1]}: {formatNumber(parseInt(salary2.replace(/,/g, '') || 0))}원
              </p>
            )}
            {labels[2] && (
              <p>
                {labels[2]}: {formatNumber(parseInt(salary3.replace(/,/g, '') || 0))}원
              </p>
            )}
            <p className="mt-2 font-bold text-gray-800">
              합계: {formatNumber(totalSalary)}원
            </p>
          </div>
        </div>

        {/* 1일 평균임금 섹션 */}
        {averageDailyWage != null && period3Months && (
          <div className="border-b border-gray-200 pb-4">
            <h3 className="mb-3 text-base font-semibold text-gray-700 sm:text-lg">
              2️⃣ 1일 평균임금
            </h3>
            <p className="text-sm text-gray-600 sm:text-base">
              {formatNumber(totalSalary)}원 ÷ {formatNumber(period3Months.totalDays)}일 ={' '}
              <span className="font-semibold text-gray-800">
                {formatNumber(averageDailyWage)}원
              </span>
            </p>
          </div>
        )}

        {/* 1일 통상임금 섹션 */}
        {ordinaryDailyWage != null && monthlyOrdinaryWage && monthlyWorkingHours && (
          <div className="border-b border-gray-200 pb-4">
            <h3 className="mb-3 text-base font-semibold text-gray-700 sm:text-lg">
              3️⃣ 1일 통상임금
            </h3>
            <p className="text-sm text-gray-600 sm:text-base">
              {formatNumber(parseInt(monthlyOrdinaryWage.replace(/,/g, '') || 0))}원 ÷{' '}
              {formatNumber(parseInt(monthlyWorkingHours || 0))}시간 × 8시간 ={' '}
              <span className="font-semibold text-gray-800">
                {formatNumber(ordinaryDailyWage)}원
              </span>
            </p>
          </div>
        )}

        {/* 적용 기준 섹션 */}
        {appliedWage != null && appliedWageType && (
          <div className="border-b border-gray-200 pb-4">
            <h3 className="mb-3 text-base font-semibold text-gray-700 sm:text-lg">
              4️⃣ 적용 기준
            </h3>
            <p className="text-sm text-gray-600 sm:text-base">
              더 큰 값:{' '}
              <span className="font-semibold text-gray-800">
                {formatNumber(appliedWage)}원
              </span>{' '}
              ({appliedWageType === 'average' ? '평균임금' : '통상임금'} 적용) ✓
            </p>
          </div>
        )}

        {/* 최종 퇴직금 섹션 */}
        {retirementPay != null && totalWorkingDays && (
          <div className="rounded-lg bg-blue-50 p-4 sm:p-6">
            <h3 className="mb-3 text-lg font-bold text-gray-800 sm:text-xl">
              💰 최종 퇴직금
            </h3>
            <p className="mb-2 text-sm text-gray-600 sm:text-base">
              {formatNumber(appliedWage)}원 × 30일 × {formatNumber(totalWorkingDays)}일 ÷ 365일
            </p>
            <p className="text-2xl font-bold text-blue-600 sm:text-3xl">
              {formatNumber(retirementPay)}원
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
