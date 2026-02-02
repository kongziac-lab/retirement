import { useMemo, useState, useRef } from 'react'
import {
  calculate3MonthsPeriod,
  calculateWorkingDays,
  get3MonthsLabels,
} from '../utils/dateUtils'
import { parseNumber } from '../utils/formatters'
import {
  calculateAverageDailyWage,
  calculateOrdinaryDailyWage,
  calculateRetirementPay,
} from '../utils/calculations'
import DateSection from './DateSection'
import EmployeeInfoSection from './EmployeeInfoSection'
import SalarySection from './SalarySection'
import WageInfoSection from './WageInfoSection'
import ResultSection from './ResultSection'
import PrintableResult from './PrintableResult'

export default function RetirementCalculator() {
  const [name, setName] = useState('')
  const [employeeNumber, setEmployeeNumber] = useState('')
  const [hireDate, setHireDate] = useState('')
  const [retirementDate, setRetirementDate] = useState('')
  const [salary1, setSalary1] = useState('')
  const [salary2, setSalary2] = useState('')
  const [salary3, setSalary3] = useState('')
  const [monthlyOrdinaryWage, setMonthlyOrdinaryWage] = useState('')
  const [monthlyWorkingHours, setMonthlyWorkingHours] = useState('209')
  const [isPrinting, setIsPrinting] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const printRef = useRef()

  const totalWorkingDays = useMemo(() => {
    if (!hireDate || !retirementDate) return null
    const hire = new Date(hireDate)
    const retirement = new Date(retirementDate)
    if (hire.getTime() > retirement.getTime()) return null
    return calculateWorkingDays(hire, retirement)
  }, [hireDate, retirementDate])

  const period3Months = useMemo(() => {
    if (!retirementDate) return null
    const retirement = new Date(retirementDate)
    return calculate3MonthsPeriod(retirement)
  }, [retirementDate])

  const monthLabels = useMemo(() => {
    if (!retirementDate) return ['', '', '']
    return get3MonthsLabels(new Date(retirementDate))
  }, [retirementDate])

  const totalSalary = useMemo(() => {
    const a = parseNumber(salary1)
    const b = parseNumber(salary2)
    const c = parseNumber(salary3)
    return a + b + c
  }, [salary1, salary2, salary3])

  const averageDailyWage = useMemo(() => {
    if (!period3Months || !totalSalary || period3Months.totalDays <= 0) return null
    return calculateAverageDailyWage(totalSalary, period3Months.totalDays)
  }, [totalSalary, period3Months])

  const ordinaryDailyWage = useMemo(() => {
    const wage = parseNumber(monthlyOrdinaryWage)
    const hours = parseInt(monthlyWorkingHours || '0', 10)
    if (!wage || !hours || hours <= 0) return null
    return calculateOrdinaryDailyWage(wage, hours)
  }, [monthlyOrdinaryWage, monthlyWorkingHours])

  const calculationResult = useMemo(() => {
    if (
      averageDailyWage == null ||
      ordinaryDailyWage == null ||
      totalWorkingDays == null ||
      totalWorkingDays <= 0
    )
      return null
    return calculateRetirementPay(averageDailyWage, ordinaryDailyWage, totalWorkingDays)
  }, [averageDailyWage, ordinaryDailyWage, totalWorkingDays])

  const handlePrint = async () => {
    if (!printRef.current) {
      console.error('PDF 생성 대상 요소를 찾을 수 없습니다.')
      return
    }

    setIsGeneratingPDF(true)
    setIsPrinting(true)

    try {
      // 동적으로 패키지 로드
      const [{ default: jsPDF }, html2canvas] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ])

      // 잠시 대기하여 렌더링 완료 보장
      await new Promise((resolve) => setTimeout(resolve, 100))

      // HTML 요소를 캔버스로 변환
      const canvas = await html2canvas.default(printRef.current, {
        scale: 2, // 고해상도를 위한 스케일
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      // 캔버스를 이미지로 변환
      const imgData = canvas.toDataURL('image/png')

      // A4 크기로 PDF 생성 (mm 단위)
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgScaledWidth = imgWidth * ratio
      const imgScaledHeight = imgHeight * ratio

      // 이미지를 PDF에 추가
      pdf.addImage(
        imgData,
        'PNG',
        (pdfWidth - imgScaledWidth) / 2,
        (pdfHeight - imgScaledHeight) / 2,
        imgScaledWidth,
        imgScaledHeight
      )

      // PDF 파일명 생성
      const fileName = `퇴직금계산서_${new Date().toISOString().split('T')[0]}.pdf`

      // PDF 다운로드
      pdf.save(fileName)
    } catch (error) {
      console.error('PDF 저장 오류:', error)
      if (error.message && error.message.includes('Failed to fetch dynamically imported module')) {
        alert('PDF 생성 라이브러리를 불러올 수 없습니다. 네트워크 연결을 확인하고 패키지를 설치해주세요.\n\n터미널에서 실행: npm install jspdf html2canvas')
      } else {
        alert('PDF 저장 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
    } finally {
      setIsGeneratingPDF(false)
      setIsPrinting(false)
    }
  }

  const handleReset = () => {
    setName('')
    setEmployeeNumber('')
    setHireDate('')
    setRetirementDate('')
    setSalary1('')
    setSalary2('')
    setSalary3('')
    setMonthlyOrdinaryWage('')
    setMonthlyWorkingHours('209')
  }

  const handleExample = () => {
    const today = new Date()
    const twoYearsAgo = new Date(today)
    twoYearsAgo.setFullYear(today.getFullYear() - 2)

    setHireDate(twoYearsAgo.toISOString().split('T')[0])
    setRetirementDate(today.toISOString().split('T')[0])
    setSalary1('3,000,000')
    setSalary2('3,000,000')
    setSalary3('3,000,000')
    setMonthlyOrdinaryWage('3,000,000')
    setMonthlyWorkingHours('209')
  }

  const hasAllRequiredData =
    hireDate &&
    retirementDate &&
    salary1 &&
    salary2 &&
    salary3 &&
    monthlyOrdinaryWage &&
    monthlyWorkingHours &&
    totalWorkingDays != null &&
    !isNaN(totalWorkingDays) &&
    calculationResult != null

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          퇴직금 계산기
        </h1>

        <div className="space-y-6">
          <EmployeeInfoSection
            name={name}
            setName={setName}
            employeeNumber={employeeNumber}
            setEmployeeNumber={setEmployeeNumber}
          />
          <DateSection
            hireDate={hireDate}
            setHireDate={setHireDate}
            retirementDate={retirementDate}
            setRetirementDate={setRetirementDate}
            totalWorkingDays={totalWorkingDays}
            period3Months={period3Months}
          />
          <SalarySection
            salary1={salary1}
            setSalary1={setSalary1}
            salary2={salary2}
            setSalary2={setSalary2}
            salary3={salary3}
            setSalary3={setSalary3}
            monthLabels={monthLabels}
            totalSalary={totalSalary}
          />
          <WageInfoSection
            monthlyOrdinaryWage={monthlyOrdinaryWage}
            setMonthlyOrdinaryWage={setMonthlyOrdinaryWage}
            monthlyWorkingHours={monthlyWorkingHours}
            setMonthlyWorkingHours={setMonthlyWorkingHours}
          />

          {hasAllRequiredData && (
            <>
              <ResultSection
                name={name}
                employeeNumber={employeeNumber}
                hireDate={hireDate}
                retirementDate={retirementDate}
                totalWorkingDays={totalWorkingDays}
                period3Months={period3Months}
                salary1={salary1}
                salary2={salary2}
                salary3={salary3}
                monthLabels={monthLabels}
                totalSalary={totalSalary}
                averageDailyWage={averageDailyWage}
                ordinaryDailyWage={ordinaryDailyWage}
                appliedWage={calculationResult.appliedWage}
                appliedWageType={calculationResult.appliedWageType}
                retirementPay={calculationResult.retirementPay}
                monthlyOrdinaryWage={monthlyOrdinaryWage}
                monthlyWorkingHours={monthlyWorkingHours}
              />

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={handlePrint}
                  disabled={isGeneratingPDF}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white shadow-md transition hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
                >
                  {isGeneratingPDF ? '⏳ PDF 생성 중...' : '📄 PDF로 저장'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-lg bg-gray-500 px-4 py-3 font-medium text-white shadow-md transition hover:bg-gray-600 active:bg-gray-700 sm:px-6"
                >
                  🔄 전체 초기화
                </button>
                <button
                  onClick={handleExample}
                  className="flex-1 rounded-lg bg-gray-400 px-4 py-3 font-medium text-white shadow-md transition hover:bg-gray-500 active:bg-gray-600 sm:px-6"
                >
                  📝 예시 데이터
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 인쇄용 컴포넌트 (화면에 보이지 않음) */}
      {hasAllRequiredData && (
        <PrintableResult
          ref={printRef}
          isPrinting={isPrinting}
          data={{
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
            appliedWage: calculationResult.appliedWage,
            appliedWageType: calculationResult.appliedWageType,
            retirementPay: calculationResult.retirementPay,
            monthlyOrdinaryWage,
            monthlyWorkingHours,
          }}
        />
      )}
    </div>
  )
}
