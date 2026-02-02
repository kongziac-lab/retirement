import { formatDateShort } from '../utils/formatters'

export default function DateSection({
  hireDate,
  setHireDate,
  retirementDate,
  setRetirementDate,
  totalWorkingDays,
  period3Months,
}) {
  const hasHire = hireDate && hireDate.trim() !== ''
  const hasRetirement = retirementDate && retirementDate.trim() !== ''
  const hire = hasHire ? new Date(hireDate) : null
  const retirement = hasRetirement ? new Date(retirementDate) : null
  const invalidOrder =
    hasHire && hasRetirement && hire && retirement && hire.getTime() > retirement.getTime()

  return (
    <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
        📅 Step 1: 날짜 정보 입력
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="hireDate"
            className="mb-1 block text-sm font-medium text-gray-700 sm:text-base"
          >
            입사일 <span className="text-red-500">*</span>
          </label>
          <input
            id="hireDate"
            type="date"
            value={hireDate ?? ''}
            onChange={(e) => setHireDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:max-w-xs sm:text-base"
          />
        </div>

        <div>
          <label
            htmlFor="retirementDate"
            className="mb-1 block text-sm font-medium text-gray-700 sm:text-base"
          >
            퇴직일 <span className="text-red-500">*</span>
          </label>
          <input
            id="retirementDate"
            type="date"
            value={retirementDate ?? ''}
            onChange={(e) => setRetirementDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:max-w-xs sm:text-base"
          />
        </div>
      </div>

      {invalidOrder && (
        <p className="mt-3 text-sm font-medium text-red-600" role="alert">
          입사일은 퇴직일보다 이전이어야 합니다.
        </p>
      )}

      {hasHire && hasRetirement && !invalidOrder && totalWorkingDays != null && (
        <p className="mt-4 text-sm text-gray-700 sm:text-base">
          ✓ 총 재직일수: <span className="font-semibold">{totalWorkingDays.toLocaleString('ko-KR')}일</span>
        </p>
      )}

      {hasRetirement && !invalidOrder && period3Months && (
        <p className="mt-2 text-sm text-gray-700 sm:text-base">
          ✓ 3개월 기산 기간:{' '}
          <span className="font-medium">
            {formatDateShort(period3Months.startDate)} ~ {formatDateShort(period3Months.endDate)} (
            {period3Months.totalDays}일)
          </span>
          <span className="ml-2 text-xs text-gray-500">
            (퇴직일로부터 역산 3개월, 퇴직일 전날까지)
          </span>
        </p>
      )}
    </section>
  )
}
