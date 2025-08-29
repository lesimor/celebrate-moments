# Celebrate Moments - 소중한 순간을 함께

Vite + React + TypeScript로 제작된 모바일 초대장 플랫폼입니다.
청첩장, 부고 등 다양한 이벤트를 위한 모바일 초대장을 손쉽게 만들고 공유할 수 있습니다.

## 주요 기능

### 시스템 기능
- 🔐 사용자 인증 시스템 (로그인/회원가입)
- 📊 이벤트 통합 관리 대시보드
- 🎨 다양한 테마 선택 (모던, 클래식, 밝은, 차분한)
- 📱 완벽한 모바일 반응형 디자인
- 🔗 공유 기능 (카카오톡, 링크 복사, QR 코드)

### 청첩장 기능
- 💑 신랑/신부 정보 관리
- 📸 갤러리 (메인 이미지 및 다중 이미지)
- 📅 결혼식 일정 캘린더
- 📍 예식장 위치 안내
- 💳 계좌번호 정보
- 💌 초대 메시지

### 부고 기능
- 🕯️ 고인 정보 관리
- 📅 장례 일정 안내
- 📍 장례식장 위치
- 💐 조의금 계좌 정보
- 📝 부고 메시지
- 🙏 온라인 조문록

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

## 사용 방법

### 1. 사용자 계정 생성
- 홈페이지에서 "시작하기" 버튼 클릭
- 이메일과 비밀번호로 회원가입

### 2. 이벤트 생성
- 로그인 후 대시보드에서 "새 이벤트 만들기" 선택
- 청첩장 또는 부고 선택
- 필요한 정보 입력 및 테마 선택

### 3. 이벤트 관리
- 생성된 이벤트 목록 확인
- 수정, 삭제, 공유 기능 사용
- QR 코드 생성 및 링크 공유

## 커스터마이징

### 테마 스타일 수정

각 테마별 스타일 파일을 수정하여 커스터마이징할 수 있습니다:

- `src/styles/HomePage.css` - 기본 테마
- `src/styles/HomePageModern.css` - 모던 테마
- `src/styles/HomePageBright.css` - 밝은 테마
- `src/styles/HomePageCalm.css` - 차분한 테마
- `src/styles/funeral.css` - 부고 테마

### 색상 테마 변경

`src/styles/index.css`에서 기본 색상을 수정할 수 있습니다:

```css
:root {
  --primary-color: #b08968;
  --secondary-color: #f3e9dc;
  --text-dark: #2c2c2c;
  --background-light: #fafafa;
}
```

## 프로젝트 구조

```
src/
├── components/        # 리액트 컴포넌트
│   ├── Calendar.tsx   # 캘린더
│   ├── Contact.tsx    # 연락처 & 계좌번호
│   ├── Gallery.tsx    # 갤러리
│   ├── Hero.tsx       # 메인 화면
│   ├── Location.tsx   # 장소 안내
│   ├── Message.tsx    # 초대 메시지
│   ├── ProtectedRoute.tsx  # 인증 라우트
│   ├── ShareModal.tsx # 공유 모달
│   └── funeral/       # 부고 관련 컴포넌트
│       ├── FuneralCondolences.tsx
│       ├── FuneralContact.tsx
│       ├── FuneralHero.tsx
│       ├── FuneralInfo.tsx
│       ├── FuneralLocation.tsx
│       └── FuneralMessage.tsx
├── contexts/
│   └── AuthContext.tsx # 인증 컨텍스트
├── data/
│   ├── weddingData.ts # 청첩장 데이터
│   └── funeralData.ts # 부고 데이터
├── pages/             # 페이지 컴포넌트
│   ├── EventManager.tsx    # 이벤트 관리
│   ├── FuneralForm.tsx     # 부고 생성 폼
│   ├── FuneralPage.tsx     # 부고 페이지
│   ├── HomePage.tsx        # 홈페이지
│   ├── HomePageBright.tsx  # 밝은 테마
│   ├── HomePageCalm.tsx    # 차분한 테마
│   ├── HomePageModern.tsx  # 모던 테마
│   ├── LoginPage.tsx       # 로그인
│   ├── WeddingForm.tsx     # 청첩장 생성 폼
│   └── WeddingPage.tsx     # 청첩장 페이지
├── services/          # API 서비스
│   ├── auth.service.ts    # 인증 서비스
│   └── event.service.ts   # 이벤트 서비스
├── styles/            # 스타일 파일
│   ├── index.css
│   ├── funeral.css
│   └── [테마별 CSS 파일]
├── types/             # 타입 정의
│   ├── event.ts
│   ├── user.ts
│   └── wedding.ts
└── test/
    └── setup.ts       # 테스트 설정
```

## 기술 스택

### 프론트엔드
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **React Router v7** - 라우팅
- **Framer Motion** - 애니메이션
- **Lucide React** - 아이콘

### 개발 도구
- **Vite** - 빌드 도구 및 개발 서버
- **Vitest** - 테스트 프레임워크
- **ESLint** - 코드 품질 관리
- **gh-pages** - GitHub Pages 배포

### 유틸리티
- **Day.js** - 날짜 처리
- **QRCode** - QR 코드 생성
- **React Share** - 소셜 미디어 공유

## 환경 설정

### 로컬 스토리지 데이터 구조

애플리케이션은 브라우저의 로컬 스토리지를 사용하여 데이터를 저장합니다:

- `users` - 사용자 계정 정보
- `events` - 생성된 이벤트 데이터
- `currentUser` - 현재 로그인한 사용자

### API 서비스

현재 버전은 로컬 스토리지 기반으로 동작하며, 실제 백엔드 연동 시 `src/services/` 디렉토리의 서비스 파일을 수정하면 됩니다.

## 배포

### GitHub Pages

자세한 배포 방법은 [DEPLOY.md](./DEPLOY.md) 파일을 참고하세요.

```bash
# 빌드 및 배포
npm run deploy
```

배포 URL: `https://[username].github.io/celebrate-moments/`

### 기타 배포 옵션

- **Netlify** - 자동 배포 및 폼 처리
- **Vercel** - Next.js 최적화 지원
- **AWS S3 + CloudFront** - 대규모 트래픽 처리

## 개발 가이드

### 테스트 실행

```bash
# 유닛 테스트
npm test

# UI 테스트
npm run test:ui

# 커버리지 확인
npm run test:coverage
```

### 코드 품질

```bash
# ESLint 실행
npm run lint

# TypeScript 타입 체크
npm run build
```

## 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이센스

MIT License - 자유롭게 사용하고 수정할 수 있습니다.

## 문의

프로젝트 관련 문의사항은 이슈를 통해 남겨주세요.