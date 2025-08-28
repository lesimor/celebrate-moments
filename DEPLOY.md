# GitHub Pages 배포 가이드

이 프로젝트는 GitHub Pages를 통해 쉽게 배포할 수 있도록 설정되어 있습니다.

## 배포 방법

### 방법 1: GitHub Actions를 통한 자동 배포 (권장)

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[username]/wedding-invitation.git
   git push -u origin main
   ```

2. **GitHub Pages 활성화**
   - GitHub 저장소로 이동
   - Settings → Pages 메뉴로 이동
   - Source를 "GitHub Actions"로 설정

3. **자동 배포**
   - `main` 브랜치에 push하면 자동으로 배포됩니다
   - Actions 탭에서 배포 상태를 확인할 수 있습니다

4. **접속 URL**
   ```
   https://[username].github.io/wedding-invitation/
   ```

### 방법 2: 수동 배포 (gh-pages 사용)

1. **빌드 및 배포**
   ```bash
   npm run deploy
   ```

2. **GitHub Pages 설정**
   - GitHub 저장소로 이동
   - Settings → Pages 메뉴로 이동
   - Source를 "Deploy from a branch"로 설정
   - Branch를 "gh-pages"로 설정
   - 폴더를 "/ (root)"로 설정

3. **접속 URL**
   ```
   https://[username].github.io/wedding-invitation/
   ```

## 커스텀 도메인 사용하기

1. **도메인 설정**
   - GitHub Pages 설정에서 Custom domain 입력
   - 예: `wedding.yourdomain.com`

2. **DNS 설정**
   - A 레코드 추가:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - 또는 CNAME 레코드:
     ```
     [username].github.io
     ```

3. **HTTPS 활성화**
   - GitHub Pages 설정에서 "Enforce HTTPS" 체크

## 배포 전 체크리스트

- [ ] `src/data/weddingData.ts` 파일의 정보를 모두 업데이트했나요?
- [ ] `public/images` 폴더에 실제 이미지를 추가했나요?
- [ ] 테스트가 모두 통과하나요? (`npm test`)
- [ ] 빌드가 정상적으로 되나요? (`npm run build`)
- [ ] 브라우저 호환성을 확인했나요?

## 문제 해결

### 배포 후 페이지가 보이지 않는 경우

1. **GitHub Actions 상태 확인**
   - Actions 탭에서 워크플로우 상태 확인
   - 실패한 경우 로그 확인

2. **base URL 확인**
   - `vite.config.ts`의 `base` 설정이 저장소 이름과 일치하는지 확인
   - 저장소 이름이 `wedding-invitation`이 아닌 경우:
     ```typescript
     base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/'
     ```

3. **GitHub Pages 설정 확인**
   - Settings → Pages에서 Source가 올바르게 설정되었는지 확인
   - 배포가 완료되었는지 확인 (보통 2-10분 소요)

### 이미지가 로드되지 않는 경우

- 이미지 경로가 `/images/`로 시작하는지 확인
- 파일명이 정확한지 확인 (대소문자 구분)
- 이미지 파일이 실제로 `public/images` 폴더에 있는지 확인

## 배포 상태 확인

GitHub Actions 배포 상태 뱃지:

```markdown
[![Deploy to GitHub Pages](https://github.com/[username]/wedding-invitation/actions/workflows/deploy.yml/badge.svg)](https://github.com/[username]/wedding-invitation/actions/workflows/deploy.yml)
```

## 추가 리소스

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [Vite 정적 사이트 배포 가이드](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)