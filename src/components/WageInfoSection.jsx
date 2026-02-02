import { formatNumber } from '../utils/formatters'

export default function WageInfoSection({
  monthlyOrdinaryWage,
  setMonthlyOrdinaryWage,
  monthlyWorkingHours,
  setMonthlyWorkingHours,
}) {
  const handleWageChange = (value, setter) => {
    const cleaned = value.replace(/,/g, '')
    if (cleaned === '') {
      setter('')
      return
    }
    if (/^\d*$/.test(cleaned)) {
      setter(formatNumber(parseInt(cleaned, 10) || 0))
    }
  }

  const handleHoursChange = (value, setter) => {
    if (value === '') {
      setter('')
      return
    }
    if (/^\d*$/.test(value)) {
      setter(value === '' ? '' : parseInt(value, 10).toString())
    }
  }

  return (
    <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
        ⚙️ Step 3: 통상임금 정보
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="monthlyOrdinaryWage"
            className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700 sm:text-base"
          >
            월 통상임금
            <span
              className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600 transition hover:bg-gray-300"
              title="기본급 + 고정수당 (상여금, 식대 등 제외)"
              aria-label="도움말: 기본급 + 고정수당 (상여금, 식대 등 제외)"
            >
              ?
            </span>
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id="monthlyOrdinaryWage"
              type="text"
              inputMode="numeric"
              value={monthlyOrdinaryWage ?? ''}
              onChange={(e) => handleWageChange(e.target.value, setMonthlyOrdinaryWage)}
              placeholder="예: 3,000,000"
              className="w-full min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:max-w-xs sm:text-base"
            />
            <span className="text-sm text-gray-600 sm:text-base">원</span>
          </div>
        </div>

        <div>
          <label
            htmlFor="monthlyWorkingHours"
            className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700 sm:text-base"
          >
            월 소정근로시간
            <span
              className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600 transition hover:bg-gray-300"
              title="주 40시간 기준 약 209시간 (주휴 포함)"
              aria-label="도움말: 주 40시간 기준 약 209시간 (주휴 포함)"
            >
              ?
            </span>
          </label>
          <input
            id="monthlyWorkingHours"
            type="text"
            inputMode="numeric"
            value={monthlyWorkingHours ?? ''}
            onChange={(e) => handleHoursChange(e.target.value, setMonthlyWorkingHours)}
            placeholder="209"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:max-w-xs sm:text-base"
          />
        </div>
      </div>
    </section>
  )
}
