import { forwardRef } from 'react'
import { formatNumber, formatDate, formatDateShort } from '../utils/formatters'

const PrintableResult = forwardRef(({ data, isPrinting }, ref) => {
  const today = new Date()
  const {
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
  } = data

  const labels = monthLabels ?? ['', '', '']

  return (
    <div
      ref={ref}
      className="mx-auto max-w-[210mm] bg-white p-4 text-gray-900 print-section"
      style={
        isPrinting
          ? { position: 'static', visibility: 'visible' }
          : { position: 'absolute', left: '-9999px', top: '0', visibility: 'hidden' }
      }
    >
      {/* 제목과 발급일 */}
      <div className="mb-3 flex items-center justify-between border-b border-gray-300 pb-2">
        <h1 className="text-xl font-bold">퇴직금 계산 결과서</h1>
        <div className="text-xs text-gray-600">발급일: {formatDate(today)}</div>
      </div>

      <div className="space-y-2">
        {/* 근로자 정보 */}
        {(name || employeeNumber) && (
          <div className="border-b border-gray-300 pb-2">
            <h3 className="mb-1 text-xs font-semibold text-gray-800">👤 근로자 정보</h3>
            <div className="space-y-0.5 text-xs text-gray-700">
              {name && <p>이름: <span className="font-medium">{name}</span></p>}
              {employeeNumber && (
                <p>인사번호: <span className="font-medium">{employeeNumber}</span></p>
              )}
            </div>
          </div>
        )}

        {/* 재직 기간 및 3개월 기산 기간 - 그리드 레이아웃 */}
        <div className="grid grid-cols-2 gap-3 border-b border-gray-300 pb-2">
          <div>
            <h3 className="mb-1 text-xs font-semibold text-gray-800">📅 재직 기간</h3>
            <div className="space-y-0.5 text-xs text-gray-700">
              <p>입사일: {hireDate ? formatDate(new Date(hireDate)) : '-'}</p>
              <p>퇴직일: {retirementDate ? formatDate(new Date(retirementDate)) : '-'}</p>
              <p>
                총 재직일수:{' '}
                <span className="font-medium">
                  {totalWorkingDays ? formatNumber(totalWorkingDays) : '-'}일
                </span>
              </p>
            </div>
          </div>
          {period3Months && (
            <div>
              <h3 className="mb-1 text-xs font-semibold text-gray-800">📅 3개월 기산 기간</h3>
              <div className="text-xs text-gray-700">
                <p>
                  {formatDateShort(period3Months.startDate)} ~{' '}
                  {formatDateShort(period3Months.endDate)}
                </p>
                <p className="mt-0.5">
                  총 일수:{' '}
                  <span className="font-medium">{formatNumber(period3Months.totalDays)}일</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 3개월 임금 총액 섹션 */}
        <div className="border-b border-gray-300 pb-2">
          <h3 className="mb-1 text-xs font-semibold text-gray-800">1️⃣ 3개월 임금 총액</h3>
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-700">
            {labels[0] && (
              <p>
                {labels[0]}:<br />
                <span className="font-medium">
                  {formatNumber(parseInt(salary1.replace(/,/g, '') || 0))}원
                </span>
              </p>
            )}
            {labels[1] && (
              <p>
                {labels[1]}:<br />
                <span className="font-medium">
                  {formatNumber(parseInt(salary2.replace(/,/g, '') || 0))}원
                </span>
              </p>
            )}
            {labels[2] && (
              <p>
                {labels[2]}:<br />
                <span className="font-medium">
                  {formatNumber(parseInt(salary3.replace(/,/g, '') || 0))}원
                </span>
              </p>
            )}
          </div>
          <p className="mt-1 text-xs font-bold text-gray-800">합계: {formatNumber(totalSalary)}원</p>
        </div>

        {/* 계산 항목들 - 그리드 레이아웃 */}
        <div className="grid grid-cols-2 gap-3 border-b border-gray-300 pb-2">
          {/* 1일 평균임금 섹션 */}
          {averageDailyWage != null && period3Months && (
            <div>
              <h3 className="mb-1 text-xs font-semibold text-gray-800">2️⃣ 1일 평균임금</h3>
              <p className="text-xs text-gray-700">
                {formatNumber(totalSalary)}원 ÷ {formatNumber(period3Months.totalDays)}일 ={' '}
                <span className="font-semibold">{formatNumber(averageDailyWage)}원</span>
              </p>
            </div>
          )}

          {/* 1일 통상임금 섹션 */}
          {ordinaryDailyWage != null && monthlyOrdinaryWage && monthlyWorkingHours && (
            <div>
              <h3 className="mb-1 text-xs font-semibold text-gray-800">3️⃣ 1일 통상임금</h3>
              <p className="text-xs text-gray-700">
                {formatNumber(parseInt(monthlyOrdinaryWage.replace(/,/g, '') || 0))}원 ÷{' '}
                {formatNumber(parseInt(monthlyWorkingHours || 0))}시간 × 8시간 ={' '}
                <span className="font-semibold">{formatNumber(ordinaryDailyWage)}원</span>
              </p>
            </div>
          )}

          {/* 적용 기준 섹션 */}
          {appliedWage != null && appliedWageType && (
            <div className="col-span-2">
              <h3 className="mb-1 text-xs font-semibold text-gray-800">4️⃣ 적용 기준</h3>
              <p className="text-xs text-gray-700">
                더 큰 값:{' '}
                <span className="font-semibold">{formatNumber(appliedWage)}원</span> (
                {appliedWageType === 'average' ? '평균임금' : '통상임금'} 적용) ✓
              </p>
            </div>
          )}
        </div>

        {/* 최종 퇴직금 섹션 */}
        {retirementPay != null && totalWorkingDays && (
          <div className="rounded bg-blue-50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-sm font-bold text-gray-800">💰 최종 퇴직금</h3>
                <p className="text-xs text-gray-700">
                  {formatNumber(appliedWage)}원 × 30일 × {formatNumber(totalWorkingDays)}일 ÷ 365일
                </p>
              </div>
              <p className="text-xl font-bold text-blue-600">{formatNumber(retirementPay)}원</p>
            </div>
          </div>
        )}
      </div>

      {/* 주의사항 */}
      <div className="mt-2 border-t border-gray-300 pt-1 text-[10px] text-gray-500">
        <p>※ 본 계산서는 근로기준법에 따른 퇴직금 계산 결과입니다.</p>
        <p>※ 실제 지급액은 기업의 퇴직연금 규정에 따라 다를 수 있습니다.</p>
      </div>
    </div>
  )
})

PrintableResult.displayName = 'PrintableResult'

export default PrintableResult
