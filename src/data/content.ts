/**
 * 사이트에 표시되는 모든 텍스트와 이미지 경로를 이 파일에서 관리합니다.
 * - 이미지를 교체할 때는 public/images 아래 같은 파일명으로 덮어쓰거나, 아래 IMAGES 경로만 수정하세요.
 * - 문구를 수정할 때는 ko / en 두 곳을 함께 수정하세요.
 */

export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/* ------------------------------------------------------------------ */
/* 이미지 (교체용)                                                       */
/* ------------------------------------------------------------------ */
export const IMAGES = {
  /** 히어로 전신 사진 (세로 사진 권장, 1400px 이상) */
  profileFull: "/images/profile-full.jpg",
  /** 히어로 배경색 — 인물 사진의 배경색과 맞추면 사진 경계가 자연스럽게 이어집니다 */
  heroBackground: "#616161",
  /** 하단 Contact 영역 원형 프로필 (정사각형 권장) */
  profileAvatar: "/images/profile-avatar.jpg",
  findex: "/images/projects/findex.jpg",
  findex2: "/images/projects/findex-2.jpg",
  monew: "/images/projects/monew.jpg",
  otboo: "/images/projects/otboo.jpg",
  ippBus: "/images/projects/ipp-bus.jpg",
  codeit: "/images/projects/codeit.jpg",
  code: "/images/projects/code.jpg",
  server: "/images/projects/server.jpg",
} as const;

/* ------------------------------------------------------------------ */
/* 공통 정보 (전화번호는 공개하지 않음)                                      */
/* ------------------------------------------------------------------ */
export const PROFILE = {
  email: "totobabo01@gmail.com",
  github: "https://github.com/totobabo-ux",
  siteRepo: "https://github.com/totobabo-ux/about.me",
  timeZone: "Asia/Seoul",
} as const;

/* ------------------------------------------------------------------ */
/* 타입                                                                */
/* ------------------------------------------------------------------ */
export type Issue = {
  title: string;
  points: string[];
  before?: string;
  after?: string;
  result?: string;
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  category: string;
  period: string;
  team: string;
  service: string;
  role: string;
  stack: string[];
  features: string[];
  issues: Issue[];
  cover: string;
  gallery: string[];
  github: string;
  color: string;
};

export type Content = {
  meta: { title: string; description: string };
  name: string;
  nav: { work: string; about: string; contact: string; menu: string; close: string; home: string };
  preloader: string[];
  hero: { location: string[]; role: string[]; marquee: string };
  intro: { headline: string; side: string; button: string };
  approach: { label: string; items: { title: string; body: string }[] };
  work: { label: string; colProject: string; colRole: string; view: string; more: string };
  experience: {
    label: string;
    items: { title: string; org: string; period: string; points: string[] }[];
  };
  skills: { label: string; groups: { name: string; items: string[] }[] };
  education: { label: string; school: string; major: string; period: string; gpa: string };
  goal: { label: string; body: string[] };
  contact: {
    title: [string, string];
    button: string;
    version: string;
    localTime: string;
    socials: string;
  };
  detail: {
    service: string;
    team: string;
    role: string;
    period: string;
    stack: string;
    features: string;
    troubleshooting: string;
    before: string;
    after: string;
    result: string;
    next: string;
    back: string;
    repo: string;
  };
  projects: Project[];
};

/* ------------------------------------------------------------------ */
/* 한국어                                                              */
/* ------------------------------------------------------------------ */
const ko: Content = {
  meta: {
    title: "장현서 | 백엔드 개발자",
    description:
      "요청이 들어와 응답이 나가기까지의 전체 흐름을 먼저 확인하는 백엔드 개발자 장현서의 포트폴리오입니다.",
  },
  name: "장현서",
  nav: { work: "프로젝트", about: "소개", contact: "연락하기", menu: "메뉴", close: "닫기", home: "홈" },
  preloader: ["안녕하세요", "Hello", "こんにちは", "Hola", "Bonjour", "Ciao", "Hallo", "Olá"],
  hero: {
    location: ["Located in", "대한민국 대전"],
    role: ["백엔드 개발자", "Java & Spring Boot"],
    marquee: "Hyeonseo Jang — Backend Developer —",
  },
  intro: {
    headline:
      "문제가 생겼을 때 코드 한 줄보다, 요청이 들어와 처리되고 응답이 나가기까지의 전체 흐름을 먼저 확인합니다. 고객이 신뢰할 수 있는 시스템을 만드는 백엔드 개발자가 되겠습니다.",
    side:
      "한남대학교 컴퓨터공학과를 졸업하고 IPP 일학습병행 인턴십과 코드잇 스프린트 백엔드 과정을 거치며 Java·Spring Boot 기반 서비스를 직접 만들어 왔습니다.",
    button: "소개 더보기",
  },
  approach: {
    label: "일하는 방식",
    items: [
      {
        title: "원인을 끝까지 추적합니다",
        body:
          "회원가입 거부 문제는 보안 설정과 요청 위조 방지 검사까지, 배포 환경의 빈 랭킹 결과는 두 환경의 데이터 구성까지 비교해 원인을 찾았습니다.",
      },
      {
        title: "데이터 정합성을 먼저 생각합니다",
        body:
          "사용자 탈퇴 시 연관 데이터의 참조 순서를 분석해 정리하고, 이메일 중복은 사전 검증과 DB 고유 제약조건을 함께 적용해 막았습니다.",
      },
      {
        title: "실제 결과까지 검증합니다",
        body:
          "정상 응답만이 아니라 실제 데이터와 생성된 파일, 기존 테스트에 미치는 영향까지 확인하며 변경 사항을 검증합니다.",
      },
    ],
  },
  work: {
    label: "프로젝트",
    colProject: "프로젝트",
    colRole: "담당",
    view: "보기",
    more: "GitHub 더보기",
  },
  experience: {
    label: "경험",
    items: [
      {
        title: "IPP 일학습병행 인턴십",
        org: "(주)유미테크 · 대전",
        period: "2025.08 — 2026.02",
        points: [
          "외부 버스 정보 API를 연동해 운행 중인 버스 위치를 지도 마커로 표시하고 예상 도착 시간 제공",
          "버스·트램·도보 경로를 연계해 교통수단별 이동 거리와 소요 시간을 계산하고, 단독·환승 경로의 총 이동 시간 비교 기능 구현",
        ],
      },
      {
        title: "코드잇 스프린트 13기 백엔드 과정",
        org: "Codeit Sprint",
        period: "2026.04 — 2026.11",
        points: [
          "Findex · MoNew · Otboo 등 초급·중급·고급 단계별 백엔드 팀 프로젝트 수행",
          "Spring Data JPA, PostgreSQL, Spring Security, JWT 인증·인가, Docker 실행 환경 구성",
        ],
      },
    ],
  },
  skills: {
    label: "기술 스택",
    groups: [
      { name: "Language", items: ["Java 17"] },
      { name: "Framework", items: ["Spring Boot", "Spring Security", "Spring Data JPA"] },
      { name: "Database", items: ["PostgreSQL", "Flyway"] },
      { name: "Test", items: ["JUnit 5", "Mockito"] },
      { name: "DevOps & Tools", items: ["Docker", "AWS", "Gradle", "Swagger", "GitHub"] },
    ],
  },
  education: {
    label: "학력",
    school: "한남대학교",
    major: "컴퓨터공학과 학사",
    period: "2024.03 — 2026.02 졸업",
    gpa: "학점 3.54 / 4.5",
  },
  goal: {
    label: "이포넷에서 이루고 싶은 목표",
    body: [
      "SI 개발은 고객의 요구사항을 정확히 이해하고, 다양한 운영 환경에서도 안정적으로 동작하는 시스템을 완성하는 일이라고 생각합니다.",
      "입사 후에는 실무 표준과 업무 도메인을 빠르게 익혀 맡은 기능을 끝까지 책임지고, 문제의 원인을 정확히 분석해 팀원들과 해결 방안을 공유하겠습니다.",
    ],
  },
  contact: {
    title: ["함께", "일해요"],
    button: "연락하기",
    version: "Version",
    localTime: "현지 시각",
    socials: "Socials",
  },
  detail: {
    service: "서비스",
    team: "팀",
    role: "담당 역할",
    period: "기간",
    stack: "기술 스택",
    features: "담당 기능",
    troubleshooting: "문제 해결",
    before: "개선 전",
    after: "개선 후",
    result: "결과",
    next: "다음 프로젝트",
    back: "모든 프로젝트",
    repo: "GitHub 저장소",
  },
  projects: [
    {
      slug: "findex",
      name: "Findex",
      kind: "초급 팀 프로젝트",
      category: "차트 · 랭킹 · CSV Export",
      period: "2026.07.09 — 2026.07.20",
      team: "6명",
      service: "금융 지표 관리 시스템",
      role: "금융 지수 데이터 조회 및 분석 기능을 제공하는 백엔드 API 개발",
      stack: ["Java 17", "Spring Boot 4.1", "Spring Data JPA", "PostgreSQL", "Gradle", "Swagger"],
      features: [
        "금융 지수 차트 조회 API 및 이동평균선 계산",
        "금융 지수 데이터 CSV Export API",
        "금융 지수 성과 랭킹 조회 API",
        "관심 지수 성과 조회 API",
      ],
      issues: [
        {
          title: "20일 이동평균선 데이터 누락 해결",
          points: [
            "최근 5·20개 거래일의 종가를 합산해 거래일 수로 나누는 방식으로 이동평균선 계산",
            "종가와 5일 이동평균선은 정상이었지만 20일 이동평균선이 비어 있는 문제 발생",
            "차트 표시 기간만 조회하면 20일 평균 계산에 필요한 이전 거래일 데이터가 부족하다는 점을 분석",
            "차트 표시 기간과 이동평균선 계산 범위를 분리하고, 이전 거래일 데이터를 추가로 확보하도록 조회 조건 개선",
          ],
          before: "종가·5일 이동평균선 조회 가능 / 20일 이동평균선 누락",
          after: "필요한 거래일 데이터를 확보해 5일·20일 이동평균선을 함께 제공",
        },
        {
          title: "성과 랭킹 배포 환경 데이터 불일치 해결",
          points: [
            "수익률 = (현재 가격 − 이전 가격) ÷ 이전 가격 × 100 으로 지수 성과 비교 기능 개발",
            "로컬에서는 정상 조회되던 랭킹이 AWS 배포 환경에서 빈 결과를 반환",
            "조회 조건과 DB 저장 상태를 비교해 두 환경의 금융 지수 데이터 구성 차이를 확인",
          ],
          before: "로컬은 정상 / AWS 조회 결과 0건",
          after: "환경별 데이터·조회 조건 차이를 정리해 랭킹 정상 반환",
          result: "성장 기술지수 +10%, 바이오 지수 −2% 수익률 반환 확인",
        },
        {
          title: "CSV 다운로드 데이터 누락 해결",
          points: [
            "선택한 지수·기간·정렬 조건에 맞는 데이터를 CSV 파일로 제공하는 기능 개발",
            "다운로드는 성공했지만 파일 크기가 106바이트로 실제 데이터 포함 여부를 추가 확인",
            "파일 생성과 DB 조회 과정을 분리해 조회 결과와 CSV 데이터 행을 비교",
          ],
          before: "성공 응답 반환 / 106바이트 파일 생성, 데이터 누락",
          after: "조회 조건에 해당하는 금융 데이터가 포함된 CSV 생성 확인",
        },
      ],
      cover: IMAGES.findex,
      gallery: [IMAGES.findex, IMAGES.findex2],
      github: PROFILE.github,
      color: "#1b2a3a",
    },
    {
      slug: "monew",
      name: "MoNew",
      kind: "중급 팀 프로젝트",
      category: "사용자 · 인증 · 배치",
      period: "2026.08.12 — 2026.09.04",
      team: "6명",
      service: "관심사 기반 뉴스 통합 플랫폼",
      role: "사용자(User) 도메인 및 인증(Auth) 기능 백엔드 API 개발",
      stack: ["Java 17", "Spring Boot", "Spring Data JPA", "PostgreSQL", "BCrypt", "JUnit 5", "Mockito"],
      features: [
        "사용자 회원가입 및 로그인 API",
        "사용자 정보 수정 및 접근 권한 검증",
        "사용자 논리 삭제 및 물리 삭제",
        "사용자 삭제 배치 처리 및 테스트 코드 작성",
      ],
      issues: [
        {
          title: "회원가입 및 로그인 처리",
          points: [
            "동일 이메일 중복 가입을 확인하고 중복 요청에는 별도의 오류 반환",
            "비밀번호를 암호화해 저장하고 로그인 시 암호화된 값과 비교해 인증",
            "논리 삭제 방식이므로 탈퇴한 사용자가 기존 계정으로 다시 로그인하지 못하도록 탈퇴 여부 추가 확인",
            "존재하지 않는 계정·비밀번호 불일치·탈퇴 계정을 구분해 처리",
          ],
        },
        {
          title: "다른 사용자 계정 수정 방지",
          points: [
            "요청 사용자와 수정 대상 사용자의 식별 정보를 비교해 불일치 시 변경 차단",
            "존재하지 않는 사용자에 대한 수정 요청을 별도로 구분",
            "식별 정보 누락·형식 오류까지 고려해 정상 식별된 경우에만 수정 허용",
          ],
        },
        {
          title: "탈퇴 시 연관 데이터 삭제 문제 해결",
          points: [
            "댓글·좋아요·조회 기록·알림이 연결되어 있어 사용자만 먼저 삭제하면 외래 키 제약조건으로 실패할 수 있음을 확인",
            "탈퇴 요청 시 즉시 삭제 대신 탈퇴 시점을 기록해 접근을 제한하고, 실제 삭제는 별도 과정으로 분리",
            "댓글 좋아요 → 댓글 → 기사 조회 기록 → 알림 → 사용자 계정 순서로 정리하도록 삭제 로직 구성",
          ],
          result: "참조 관계를 고려한 순서로 사용자 계정이 안전하게 삭제되도록 개선",
        },
        {
          title: "삭제 배치 처리 및 테스트 오류 해결",
          points: [
            "탈퇴 후 24시간이 지난 사용자를 대상으로 실제 삭제를 수행해 탈퇴 처리와 데이터 정리 시점 분리",
            "사용자 정보 변경 알림 기능 추가 후 기존 단위 테스트에서 필요한 객체가 준비되지 않아 오류 발생",
            "새 기능을 테스트 환경에 반영하고 변경·삭제 시 관련 동작이 호출되는지 검증하도록 수정",
          ],
        },
      ],
      cover: IMAGES.monew,
      gallery: [IMAGES.monew, IMAGES.code],
      github: PROFILE.github,
      color: "#2c3440",
    },
    {
      slug: "otboo",
      name: "Otboo",
      kind: "고급 팀 프로젝트",
      category: "Spring Security · JWT · Flyway",
      period: "2026.08.12 — 2026.09.04",
      team: "5명",
      service: "날씨 기반 의상 추천 및 개인 옷장 관리 서비스",
      role: "사용자(User) 도메인 및 인증·인가 기능 백엔드 API 개발",
      stack: [
        "Java 17",
        "Spring Boot",
        "Spring Security",
        "Spring Data JPA",
        "PostgreSQL",
        "Flyway",
        "JUnit 5",
        "Mockito",
      ],
      features: [
        "사용자 회원가입 및 계정 관리 API",
        "Spring Security 기반 로그인 및 JWT 인증·인가",
        "사용자 정보 조회 및 커서 기반 페이지네이션",
        "Flyway 데이터베이스 마이그레이션 및 테스트 코드 작성",
      ],
      issues: [
        {
          title: "회원가입 요청이 보안 검사에서 차단되는 문제 해결",
          points: [
            "정상적인 사용자 정보를 전달했지만 서버가 회원가입 요청을 거부",
            "비로그인 사용자 접근 제한과 요청 위조 방지(CSRF) 검사가 원인임을 확인",
            "회원가입 요청만 로그인 없이 접근을 허용하고 CSRF 검사에서 제외하도록 설정 변경",
          ],
          before: "정상 회원가입 요청에도 접근 거부 오류",
          after: "정상 요청은 성공, 필수 정보 누락은 별도의 입력값 오류로 처리",
        },
        {
          title: "동시 회원가입 시 이메일 중복 방지",
          points: [
            "동시 요청 시 중복 확인과 실제 저장 사이에 다른 요청이 먼저 저장될 수 있는 상황 고려",
            "사전 중복 확인만으로는 동시성 상황을 완전히 막기 어렵다고 판단",
            "사전 중복 검증과 DB 고유값 제약조건을 함께 적용하고, 중복 시 별도 오류 응답 제공",
          ],
          result: "동일 이메일로 여러 계정이 생성되는 상황을 방지하도록 설계",
        },
        {
          title: "커서 기반 페이지네이션 적용",
          points: [
            "페이지 번호 방식은 데이터 추가·삭제 시 중복·누락이 생길 수 있음을 고려",
            "사용자 ID 내림차순 정렬 후 마지막 조회 ID를 다음 조회의 기준으로 활용",
            "한 번에 조회 가능한 사용자 수를 최대 100명으로 제한",
          ],
          result: "데이터 변경 상황에서도 일관된 조회 순서 유지",
        },
        {
          title: "스키마 변경에 따른 실행 환경 불일치 방지",
          points: [
            "여러 팀원이 동시에 개발하며 테이블 구조가 환경마다 달라질 수 있는 문제 고려",
            "사용자·프로필 테이블 생성 과정을 순서가 있는 Flyway 마이그레이션 파일로 관리",
            "실행 시 DB 구조와 엔티티 모델의 일치 여부를 검증하도록 설정",
            "최신 개발 브랜치 기준으로 작업을 재정리하고 필요한 보안·예외 처리·마이그레이션 파일 복원",
          ],
          result: "테이블 생성 이력을 코드로 관리하는 스키마 관리 기반 마련",
        },
      ],
      cover: IMAGES.otboo,
      gallery: [IMAGES.otboo, IMAGES.server],
      github: PROFILE.github,
      color: "#3a2f2a",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */
const en: Content = {
  meta: {
    title: "Hyeonseo Jang | Backend Developer",
    description:
      "Portfolio of Hyeonseo Jang, a backend developer who traces the whole request-to-response flow before touching a single line of code.",
  },
  name: "Hyeonseo Jang",
  nav: { work: "Work", about: "About", contact: "Contact", menu: "Menu", close: "Close", home: "Home" },
  preloader: ["Hello", "안녕하세요", "こんにちは", "Hola", "Bonjour", "Ciao", "Hallo", "Olá"],
  hero: {
    location: ["Located in", "Daejeon, Korea"],
    role: ["Backend Developer", "Java & Spring Boot"],
    marquee: "Hyeonseo Jang — Backend Developer —",
  },
  intro: {
    headline:
      "When something breaks, I look at the whole flow — from the moment a request arrives to the moment a response leaves — before I look at a single line of code. I build systems clients can trust.",
    side:
      "A Computer Engineering graduate of Hannam University. Through an IPP work-study internship and the Codeit Sprint backend program, I have built real services with Java and Spring Boot.",
    button: "About me",
  },
  approach: {
    label: "How I work",
    items: [
      {
        title: "I trace problems to the root",
        body:
          "A rejected sign-up led me to the security config and CSRF filter; an empty ranking in production led me to compare the data across environments.",
      },
      {
        title: "Data integrity comes first",
        body:
          "I mapped reference order to clean up related data on account deletion, and blocked duplicate e-mails with both a pre-check and a DB unique constraint.",
      },
      {
        title: "I verify real outcomes",
        body:
          "Not just a 200 OK — I check the actual data, the generated files, and how a change affects existing tests.",
      },
    ],
  },
  work: {
    label: "Recent work",
    colProject: "Project",
    colRole: "Focus",
    view: "View",
    more: "More on GitHub",
  },
  experience: {
    label: "Experience",
    items: [
      {
        title: "IPP Work-Study Internship",
        org: "Yumi Tech Co., Ltd. · Daejeon",
        period: "Aug 2025 — Feb 2026",
        points: [
          "Integrated an external bus-information API to show live bus positions as map markers with estimated arrival times",
          "Combined bus, tram and walking routes to calculate distance and travel time per mode, and compared total time across bus-only, tram-only and transfer routes",
        ],
      },
      {
        title: "Codeit Sprint Backend Program, Cohort 13",
        org: "Codeit Sprint",
        period: "Apr 2026 — Nov 2026",
        points: [
          "Delivered beginner, intermediate and advanced backend team projects: Findex, MoNew and Otboo",
          "Worked with Spring Data JPA, PostgreSQL, Spring Security, JWT authentication/authorization and Docker-based environments",
        ],
      },
    ],
  },
  skills: {
    label: "Skills",
    groups: [
      { name: "Language", items: ["Java 17"] },
      { name: "Framework", items: ["Spring Boot", "Spring Security", "Spring Data JPA"] },
      { name: "Database", items: ["PostgreSQL", "Flyway"] },
      { name: "Test", items: ["JUnit 5", "Mockito"] },
      { name: "DevOps & Tools", items: ["Docker", "AWS", "Gradle", "Swagger", "GitHub"] },
    ],
  },
  education: {
    label: "Education",
    school: "Hannam University",
    major: "B.S. in Computer Engineering",
    period: "Mar 2024 — Feb 2026 (Graduated)",
    gpa: "GPA 3.54 / 4.5",
  },
  goal: {
    label: "What I want to achieve at e4net",
    body: [
      "To me, SI development means understanding client requirements precisely and delivering systems that run reliably across many different operating environments.",
      "I will quickly learn your engineering standards and business domains, own my features end to end, analyze root causes accurately, and share solutions with my team.",
    ],
  },
  contact: {
    title: ["Let's work", "together"],
    button: "Get in touch",
    version: "Version",
    localTime: "Local time",
    socials: "Socials",
  },
  detail: {
    service: "Service",
    team: "Team",
    role: "Role",
    period: "Period",
    stack: "Stack",
    features: "What I built",
    troubleshooting: "Problem solving",
    before: "Before",
    after: "After",
    result: "Result",
    next: "Next project",
    back: "All work",
    repo: "GitHub repository",
  },
  projects: [
    {
      slug: "findex",
      name: "Findex",
      kind: "Beginner team project",
      category: "Charts · Ranking · CSV export",
      period: "Jul 9 — Jul 20, 2026",
      team: "6 members",
      service: "Financial index management system",
      role: "Backend APIs for querying and analyzing financial index data",
      stack: ["Java 17", "Spring Boot 4.1", "Spring Data JPA", "PostgreSQL", "Gradle", "Swagger"],
      features: [
        "Index chart API with moving-average calculation",
        "Index data CSV export API",
        "Index performance ranking API",
        "Favorite index performance API",
      ],
      issues: [
        {
          title: "Fixing the missing 20-day moving average",
          points: [
            "Calculated moving averages by summing closing prices over the last 5 and 20 trading days",
            "Closing prices and the 5-day MA were returned, but the 20-day MA came back empty",
            "Found that querying only the displayed chart range left too few prior trading days for a 20-day average",
            "Separated the display range from the calculation range and fetched additional prior trading days",
          ],
          before: "Close & 5-day MA OK / 20-day MA missing",
          after: "Both 5-day and 20-day MAs calculated and served to the chart",
        },
        {
          title: "Resolving a local vs. production data mismatch in rankings",
          points: [
            "Built index performance comparison using return = (current − previous) ÷ previous × 100",
            "Rankings worked locally but returned an empty result on AWS for the same request",
            "Compared query conditions and stored data to identify how index data differed between environments",
          ],
          before: "Works locally / 0 results on AWS",
          after: "Aligned data and query conditions so rankings return correctly",
          result: "Verified returns: Growth Tech Index +10%, Bio Index −2%",
        },
        {
          title: "Fixing a CSV export with missing data",
          points: [
            "Built CSV export filtered by selected index, date range and sort order",
            "The download succeeded, but the file was only 106 bytes — so I checked whether it actually contained data",
            "Separated querying from file generation and compared query results with the CSV rows",
          ],
          before: "Success response / 106-byte file with no data",
          after: "CSV now contains all matching financial data",
        },
      ],
      cover: IMAGES.findex,
      gallery: [IMAGES.findex, IMAGES.findex2],
      github: PROFILE.github,
      color: "#1b2a3a",
    },
    {
      slug: "monew",
      name: "MoNew",
      kind: "Intermediate team project",
      category: "Users · Auth · Batch",
      period: "Aug 12 — Sep 4, 2026",
      team: "6 members",
      service: "Interest-based news aggregation platform",
      role: "Backend APIs for the User domain and authentication",
      stack: ["Java 17", "Spring Boot", "Spring Data JPA", "PostgreSQL", "BCrypt", "JUnit 5", "Mockito"],
      features: [
        "Sign-up and login APIs",
        "Profile update with ownership checks",
        "Soft delete and hard delete of users",
        "User deletion batch and test code",
      ],
      issues: [
        {
          title: "Sign-up and login",
          points: [
            "Checked for duplicate e-mails and returned a dedicated error for duplicates",
            "Stored passwords hashed and compared against the hash on login",
            "Because of soft deletion, added a withdrawn-status check so deleted users cannot log in again",
            "Handled unknown account, wrong password and withdrawn account as distinct cases",
          ],
        },
        {
          title: "Preventing edits to other users' accounts",
          points: [
            "Compared the requester's identity with the target user and blocked mismatches",
            "Handled update requests for non-existent users separately",
            "Allowed updates only when the user is properly identified, covering missing or malformed IDs",
          ],
        },
        {
          title: "Deleting related data on account removal",
          points: [
            "Comments, likes, view history and notifications reference the user, so deleting the user first would violate foreign keys",
            "On withdrawal, recorded the time and restricted access instead of deleting immediately",
            "Deleted in reference order: comment likes → comments → view history → notifications → user",
          ],
          result: "Accounts are removed safely in an order that respects references",
        },
        {
          title: "Deletion batch and fixing broken tests",
          points: [
            "Hard-deleted users 24 hours after withdrawal, separating withdrawal from data cleanup",
            "After a user-change event feature was added, existing unit tests failed due to missing dependencies",
            "Reflected the new feature in the test setup and verified related calls on update and delete",
          ],
        },
      ],
      cover: IMAGES.monew,
      gallery: [IMAGES.monew, IMAGES.code],
      github: PROFILE.github,
      color: "#2c3440",
    },
    {
      slug: "otboo",
      name: "Otboo",
      kind: "Advanced team project",
      category: "Spring Security · JWT · Flyway",
      period: "Aug 12 — Sep 4, 2026",
      team: "5 members",
      service: "Weather-based outfit recommendation & digital closet",
      role: "Backend APIs for the User domain, authentication and authorization",
      stack: [
        "Java 17",
        "Spring Boot",
        "Spring Security",
        "Spring Data JPA",
        "PostgreSQL",
        "Flyway",
        "JUnit 5",
        "Mockito",
      ],
      features: [
        "Sign-up and account management APIs",
        "Spring Security login with JWT authentication/authorization",
        "User lookup with cursor-based pagination",
        "Flyway migrations and test code",
      ],
      issues: [
        {
          title: "Sign-up blocked by security checks",
          points: [
            "Valid sign-up requests were being rejected by the server",
            "Found that anonymous-access restrictions and CSRF protection were blocking them",
            "Permitted anonymous access to the sign-up endpoint only and excluded it from CSRF checks",
          ],
          before: "Access denied even for valid sign-ups",
          after: "Valid requests succeed; missing fields return a validation error",
        },
        {
          title: "Preventing duplicate e-mails under concurrent sign-ups",
          points: [
            "Considered that another request could be saved between the duplicate check and the insert",
            "Concluded that a pre-check alone cannot fully prevent duplicates under concurrency",
            "Combined the pre-check with a DB unique constraint and returned a dedicated duplicate error",
          ],
          result: "Designed so that one e-mail can never create multiple accounts",
        },
        {
          title: "Cursor-based pagination",
          points: [
            "Page-number paging can duplicate or skip rows as data changes",
            "Sorted by user ID descending and used the last ID as the cursor for the next page",
            "Capped page size at 100 users",
          ],
          result: "Consistent ordering even while data changes",
        },
        {
          title: "Keeping schemas consistent across environments",
          points: [
            "With several teammates developing in parallel, table structures could drift between environments",
            "Managed user and profile table creation as ordered Flyway migrations",
            "Enabled schema validation against entity models at startup",
            "Rebased onto the latest develop branch and restored the required security, exception and migration files",
          ],
          result: "Schema history is managed as code",
        },
      ],
      cover: IMAGES.otboo,
      gallery: [IMAGES.otboo, IMAGES.server],
      github: PROFILE.github,
      color: "#3a2f2a",
    },
  ],
};

export const content: Record<Locale, Content> = { ko, en };

export const getContent = (locale: Locale) => content[locale];

/** 스크롤에 따라 좌우로 흐르는 이미지 띠에 쓰이는 이미지 */
export const SLIDER_ROWS = {
  top: [IMAGES.findex, IMAGES.code, IMAGES.monew, IMAGES.ippBus],
  bottom: [IMAGES.otboo, IMAGES.server, IMAGES.codeit, IMAGES.findex2],
};
