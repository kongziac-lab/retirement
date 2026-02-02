# 퇴직금 계산기

근로기준법에 따른 퇴직금을 계산하는 웹 애플리케이션입니다.

## 기능

- 📅 재직 기간 자동 계산
- 💰 3개월 평균임금 및 통상임금 계산
- 📊 퇴직금 자동 계산
- 👤 근로자 정보 입력 (이름, 인사번호)
- 📄 PDF로 계산 결과 저장

## 로컬 개발

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 빌드 결과 미리보기

```bash
npm run preview
```

## GitHub Pages 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

### 배포 방법

1. **GitHub 리포지토리 설정**
   - 리포지토리 Settings → Pages로 이동
   - Source를 "GitHub Actions"로 선택

2. **자동 배포**
   - `main` 또는 `master` 브랜치에 push하면 자동으로 배포됩니다
   - GitHub Actions 탭에서 배포 진행 상황을 확인할 수 있습니다

3. **수동 배포**
   - GitHub Actions 탭에서 "Deploy to GitHub Pages" 워크플로우를 수동으로 실행할 수 있습니다

### 배포 URL

배포가 완료되면 다음 URL에서 접근할 수 있습니다:
```
https://[사용자명].github.io/retirement/
```

## 기술 스택

- React 19
- Vite
- Tailwind CSS
- jsPDF
- html2canvas

## 라이선스

MIT
