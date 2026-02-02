/**
 * 숫자를 천 단위 콤마가 있는 문자열로 변환
 * @param {number} num - 변환할 숫자
 * @returns {string} 예: 1000000 → "1,000,000"
 */
export function formatNumber(num) {
  if (num == null || Number.isNaN(num)) return '';
  return Number(num).toLocaleString('ko-KR');
}

/**
 * 콤마가 있는 문자열을 숫자로 변환
 * @param {string} str - 변환할 문자열
 * @returns {number} 예: "1,000,000" → 1000000
 */
export function parseNumber(str) {
  if (str == null || typeof str !== 'string') return 0;
  const cleaned = str.replace(/,/g, '');
  const num = Number(cleaned);
  return Number.isNaN(num) ? 0 : num;
}

/**
 * 날짜를 "2024년 1월 1일" 형식으로 변환
 * @param {Date|string|number} date - 변환할 날짜
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

/**
 * 날짜를 "2024.01.01" 형식으로 변환
 * @param {Date|string|number} date - 변환할 날짜
 * @returns {string}
 */
export function formatDateShort(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}
