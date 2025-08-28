# 모바일 청첩장 템플릿

Vite + React + TypeScript로 제작된 모바일 최적화 청첩장 웹 애플리케이션입니다.

## 주요 기능

- 📱 모바일 최적화 디자인
- 🎨 부드러운 애니메이션 효과 (Framer Motion)
- 📸 갤러리 기능
- 📅 캘린더 표시
- 📍 장소 안내
- 📞 연락처 및 계좌번호
- ✅ TDD (Test-Driven Development) 적용

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 테스트 실행

```bash
npm test
```

### 프로덕션 빌드

```bash
npm run build
```

## 커스터마이징

### 청첩장 정보 수정

`src/data/weddingData.ts` 파일을 수정하여 자신의 정보로 변경하세요:

```typescript
export const weddingData: WeddingData = {
  couple: {
    groom: {
      name: "신랑이름",
      fullName: "신랑풀네임",
      father: "신랑아버지",
      mother: "신랑어머니",
      order: "장남" // 또는 "차남" 등
    },
    bride: {
      name: "신부이름",
      fullName: "신부풀네임",
      father: "신부아버지",
      mother: "신부어머니",
      order: "장녀" // 또는 "차녀" 등
    }
  },
  wedding: {
    date: "2025-03-15", // YYYY-MM-DD 형식
    time: "14:30", // HH:mm 형식
    venue: {
      name: "웨딩홀이름",
      hall: "홀이름",
      address: "주소",
      phone: "전화번호"
    }
  },
  // ... 나머지 정보
}
```

### 이미지 추가

`public/images` 폴더에 이미지를 추가하고 `weddingData.ts`에서 경로를 업데이트하세요:

```typescript
gallery: {
  mainImage: "/images/main.jpg",
  images: [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    // ...
  ]
}
```

### 스타일 커스터마이징

`src/styles/index.css`에서 색상과 스타일을 수정할 수 있습니다:

```css
:root {
  --primary-color: #b08968;  /* 메인 색상 */
  --secondary-color: #f3e9dc; /* 보조 색상 */
  --text-dark: #2c2c2c;      /* 텍스트 색상 */
  /* ... */
}
```

## 프로젝트 구조

```
src/
├── components/         # 리액트 컴포넌트
│   ├── Hero.tsx       # 메인 화면
│   ├── Calendar.tsx   # 캘린더
│   ├── Gallery.tsx    # 갤러리
│   ├── Location.tsx   # 장소 안내
│   ├── Message.tsx    # 초대 메시지
│   └── Contact.tsx    # 연락처 & 계좌번호
├── data/
│   └── weddingData.ts # 청첩장 데이터
├── types/
│   └── wedding.ts     # 타입 정의
├── styles/
│   └── index.css      # 스타일
└── test/
    └── setup.ts       # 테스트 설정
```

## 기술 스택

- **React** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Framer Motion** - 애니메이션
- **Vitest** - 테스트 프레임워크
- **Lucide React** - 아이콘
- **Day.js** - 날짜 처리

## 배포

### GitHub Pages (권장)

자세한 배포 방법은 [DEPLOY.md](./DEPLOY.md) 파일을 참고하세요.

**빠른 배포:**
```bash
# GitHub Actions 자동 배포 (권장)
git push origin main

# 또는 수동 배포
npm run deploy
```

**배포 URL:**
```
https://[username].github.io/wedding-invitation/
```

### 기타 배포 옵션

- Netlify
- Vercel  
- AWS S3 + CloudFront

## 라이센스

MIT