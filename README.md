# 장현서 포트폴리오 (about.me)

Next.js 16 · TypeScript · Tailwind CSS v4 · Motion · Lenis 로 만든 한/영 포트폴리오 사이트입니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000 → /ko 로 이동
npm run build    # 배포 전 빌드 확인
```

## 내용 · 이미지 수정

모든 문구와 이미지 경로는 `src/data/content.ts` 한 파일에 있습니다.

| 이미지 | 파일 | 권장 |
|---|---|---|
| 히어로 인물 사진 | `public/images/profile-full.jpg` | 세로 사진, 단색 배경 (배경색은 `IMAGES.heroBackground`에 맞춰 입력) |
| 하단 원형 프로필 | `public/images/profile-avatar.jpg` | 정사각형 |
| Findex 화면 | `public/images/projects/findex.jpg`, `findex-2.jpg` | 16:10 캡처 |
| MoNew 화면 | `public/images/projects/monew.jpg` | 16:10 캡처 |
| Otboo 화면 | `public/images/projects/otboo.jpg` | 16:10 캡처 |
| 기타 (흐르는 이미지 띠) | `ipp-bus.jpg`, `codeit.jpg`, `code.jpg`, `server.jpg` | 4:3 |

같은 파일명으로 덮어쓰면 코드 수정 없이 교체됩니다. 프로젝트별 GitHub 저장소 주소는 `content.ts`의 각 프로젝트 `github` 값을 바꾸면 됩니다.

## Vercel 배포

1. 이 폴더를 GitHub `totobabo-ux/about.me` 저장소에 push
2. vercel.com → **Add New → Project** → 저장소 Import (Framework: Next.js 자동 인식, 설정 변경 없음)
3. **Deploy** — 이후 `main`에 push할 때마다 자동 배포
