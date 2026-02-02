export default function EmployeeInfoSection({ name, setName, employeeNumber, setEmployeeNumber }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
        👤 근로자 정보 입력
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="employeeName"
            className="mb-1 block text-sm font-medium text-gray-700 sm:text-base"
          >
            이름
          </label>
          <input
            id="employeeName"
            type="text"
            value={name ?? ''}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:max-w-xs sm:text-base"
          />
        </div>

        <div>
          <label
            htmlFor="employeeNumber"
            className="mb-1 block text-sm font-medium text-gray-700 sm:text-base"
          >
            인사번호
          </label>
          <input
            id="employeeNumber"
            type="text"
            value={employeeNumber ?? ''}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            placeholder="인사번호를 입력하세요"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:max-w-xs sm:text-base"
          />
        </div>
      </div>
    </section>
  )
}
