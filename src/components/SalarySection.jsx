import { formatNumber } from '../utils/formatters'

export default function SalarySection({
  salary1,
  setSalary1,
  salary2,
  setSalary2,
  salary3,
  setSalary3,
  monthLabels,
  totalSalary,
}) {
  const labels = monthLabels ?? ['', '', '']

  const handleSalaryChange = (value, setter) => {
    const cleaned = value.replace(/,/g, '')
    if (cleaned === '') {
      setter('')
      return
    }
    if (/^\d*$/.test(cleaned)) {
      setter(formatNumber(parseInt(cleaned, 10) || 0))
    }
  }

  return (
    <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
        💰 Step 2: 3개월 임금 입력
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="salary1"
            className="mb-1 block text-sm font-medium text-gray-700 sm:text-base"
          >
            {labels[0] || '1개월차'}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id="salary1"
              type="text"
              inputMode="numeric"
              value={salary1 ?? ''}
              onChange={(e) => handleSalaryChange(e.target.value, setSalary1)}
              placeholder="예: 3,000,000"
              className="w-full min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:max-w-xs sm:text-base"
            />
            <span className="text-sm text-gray-600 sm:text-base">원</span>
          </div>
        </div>

        <div>
          <label
            htmlFor="salary2"
            className="mb-1 block text-sm font-medium text-gray-700 sm:text-base"
          >
            {labels[1] || '2개월차'}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id="salary2"
              type="text"
              inputMode="numeric"
              value={salary2 ?? ''}
              onChange={(e) => handleSalaryChange(e.target.value, setSalary2)}
              placeholder="예: 3,000,000"
              className="w-full min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:max-w-xs sm:text-base"
            />
            <span className="text-sm text-gray-600 sm:text-base">원</span>
          </div>
        </div>

        <div>
          <label
            htmlFor="salary3"
            className="mb-1 block text-sm font-medium text-gray-700 sm:text-base"
          >
            {labels[2] || '3개월차'}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id="salary3"
              type="text"
              inputMode="numeric"
              value={salary3 ?? ''}
              onChange={(e) => handleSalaryChange(e.target.value, setSalary3)}
              placeholder="예: 3,000,000"
              className="w-full min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:max-w-xs sm:text-base"
            />
            <span className="text-sm text-gray-600 sm:text-base">원</span>
          </div>
        </div>
      </div>

      {totalSalary != null && (
        <div className="mt-4 rounded-lg bg-blue-50 px-3 py-2 sm:px-4 sm:py-3">
          <p className="text-sm font-bold text-gray-800 sm:text-base">
            ✓ 3개월 임금 총액: {formatNumber(totalSalary)}원
          </p>
        </div>
      )}
    </section>
  )
}
