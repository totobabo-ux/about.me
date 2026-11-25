# 장현서 포트폴리오 (about.me)

빌드 도구 없이 **HTML · CSS · JavaScript** 만으로 만든 한/영 포트폴리오 사이트입니다.
https://about-me-lac-eight.vercel.app

## 실행

- 가장 간단한 방법: `index.html` 을 더블클릭해서 브라우저로 열기
- 로컬 서버로 보기: `python -m http.server 3000` 실행 후 http://localhost:3000

## 폴더 구조

```
index.html          홈 (히어로 · 소개 · 일하는 방식 · 프로젝트 · 경험 · 기술 · 목표 · 연락처)
work.html           프로젝트 상세 — work.html?p=findex 처럼 주소로 프로젝트를 고름
css/style.css       디자인 전체 (파일 맨 위에 목차)
js/data.js          모든 문구(한/영)와 이미지 경로  ← 내용 수정은 여기서
js/common.js        두 페이지 공통: 언어 · 헤더 · 메뉴 · 연락처 · 애니메이션 도우미
js/home.js          홈 전용: 목록 그리기 · 흐르는 이름 · 커서 미리보기 · 하단 이미지 띠
js/work.js          상세 페이지 그리기
js/vendor/          부드러운 스크롤 라이브러리(Lenis)
images/             사진
vercel.json         Vercel 배포 설정 (빌드 없음, 예전 /ko · /en 주소 이동)
```

스크립트는 `data.js → common.js → home.js(또는 work.js)` 순서로 불러옵니다.

## 언어

- 한국어: `index.html` / 영어: `index.html?lang=en`
- 문구는 `js/data.js` 의 `ko`, `en` 두 곳을 함께 수정하세요.

## 이미지 교체

`images/` 에 같은 파일명으로 덮어쓰면 됩니다.

| 이미지 | 파일 | 권장 |
|---|---|---|
| 히어로 인물 사진 | `images/profile-full.jpg` | 세로 사진, 단색 배경 (배경색은 `data.js` 의 `heroBackground` 에 맞춰 입력) |
| 하단 원형 프로필 | `images/profile-avatar.jpg` | 정사각형 |
| 프로젝트 대표 화면 | `images/projects/findex.jpg`, `monew.jpg`, `otboo.jpg` | 16:10 캡처 |
| 상세 페이지 추가 이미지 | `findex-2.jpg`, `code.jpg`(MoNew), `server.jpg`(Otboo) | 16:9 |

프로젝트별 GitHub 저장소 주소는 `data.js` 의 각 프로젝트 `github` 값을 바꾸면 됩니다.

## 배포

GitHub `main` 브랜치에 push 하면 Vercel 이 자동으로 배포합니다. (빌드 과정 없음)
