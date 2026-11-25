/**
 * 모든 페이지가 함께 쓰는 기능
 *  1. 언어(ko/en) 결정과 링크 주소 만들기
 *  2. 헤더 · 떠다니는 메뉴 · 연락처(푸터) 그리기
 *  3. 애니메이션 도우미 (부드러운 스크롤, 등장 효과, 마그네틱 버튼, 로딩 화면)
 *
 * 다른 스크립트(home.js, work.js)는 window.APP 으로 여기 있는 값과 함수를 사용합니다.
 */
(function () {
  const { content, PROFILE, IMAGES } = window.SITE;

  /* 1. 언어 ---------------------------------------------------------------- */
  // 주소에 ?lang=en 이 있으면 영어, 없으면 한국어
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") === "en" ? "en" : "ko";
  const t = content[lang];
  document.documentElement.lang = lang;

  // 파일을 더블클릭해서 열었을 때(file://)는 폴더 주소로 이동할 수 없어서 index.html 을 직접 지정
  const isFile = location.protocol === "file:";
  const langQuery = lang === "en" ? "lang=en" : "";

  /** 홈 주소. hash 예: "#work" */
  function homeUrl(hash = "") {
    const page = isFile ? "index.html" : "./";
    return page + (langQuery ? "?" + langQuery : "") + hash;
  }

  /** 프로젝트 상세 주소. slug 예: "findex" */
  function workUrl(slug) {
    return `work.html?p=${slug}` + (langQuery ? "&" + langQuery : "");
  }

  /** 지금 페이지를 유지한 채 언어만 바꾼 주소 */
  function langUrl(target) {
    const p = new URLSearchParams(location.search);
    if (target === "en") p.set("lang", "en");
    else p.delete("lang");
    const q = p.toString();
    return location.pathname + (q ? "?" + q : "") + location.hash;
  }

  /** "intro.headline" 같은 경로로 문구 꺼내기 */
  function text(path) {
    return path.split(".").reduce((obj, key) => (obj ? obj[key] : undefined), t);
  }

  /* 2. 공통 화면 조각 ------------------------------------------------------ */
  function langSwitchHtml() {
    return `
      <div class="lang-switch">
        <a href="${langUrl("ko")}" ${lang === "ko" ? 'aria-current="true"' : ""}>ko</a>
        <span class="sep">/</span>
        <a href="${langUrl("en")}" ${lang === "en" ? 'aria-current="true"' : ""}>en</a>
      </div>`;
  }

  /** 페이지 맨 위 헤더. onHome 이 true 면 같은 페이지 안에서 이동(#work) */
  function renderHeader(el, onHome) {
    const base = onHome ? "" : homeUrl();
    const tone = el.dataset.tone === "dark" ? " header--dark" : "";
    el.outerHTML = `
      <header class="header${tone}">
        <a class="header__logo" href="${homeUrl()}">
          <span class="header__copy">©</span>
          <span class="header__roll">
            <span>Code by Hyeonseo</span>
            <span>Hyeonseo Jang</span>
          </span>
        </a>
        <nav class="header__nav">
          <ul class="header__links">
            <li><span class="magnetic"><a class="dot-link" href="${base}#work">${t.nav.work}</a></span></li>
            <li><span class="magnetic"><a class="dot-link" href="${base}#about">${t.nav.about}</a></span></li>
            <li><span class="magnetic"><a class="dot-link" href="${base}#contact">${t.nav.contact}</a></span></li>
          </ul>
          <span class="magnetic">${langSwitchHtml()}</span>
        </nav>
      </header>`;
  }

  /** 스크롤하면 나타나는 원형 메뉴 버튼 + 오른쪽 메뉴 패널 */
  function renderMenu(onHome) {
    const base = onHome ? "" : homeUrl();
    const links = [
      [homeUrl(), t.nav.home],
      [`${base}#work`, t.nav.work],
      [`${base}#about`, t.nav.about],
      [`${base}#contact`, t.nav.contact],
    ];
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="menu-toggle">
        <span class="magnetic">
          <button class="btn btn--dark" type="button" aria-label="${t.nav.menu}" aria-expanded="false">
            <span class="burger"><span></span><span></span></span>
          </button>
        </span>
      </div>
      <div class="menu-backdrop"></div>
      <aside class="menu-panel" aria-label="${t.nav.menu}">
        <svg class="menu-panel__curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M100 0 L100 100 Q-100 50 100 0" />
        </svg>
        <div>
          <p class="menu-panel__title">${t.nav.menu}</p>
          <ul class="menu-panel__links">
            ${links.map(([href, label], i) => `<li style="--i:${i}"><a href="${href}">${label}</a></li>`).join("")}
          </ul>
        </div>
        <div class="menu-panel__bottom">
          <div>
            <p>Socials</p>
            <a class="dot-link" href="${PROFILE.github}" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          ${langSwitchHtml()}
        </div>
      </aside>`,
    );

    const toggle = document.querySelector(".menu-toggle");
    const button = toggle.querySelector("button");
    const curve = document.querySelector(".menu-panel__curve path");

    // 화면 높이의 40% 이상 내려가면 버튼 등장
    const updateVisible = () => toggle.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.4);
    window.addEventListener("scroll", updateVisible, { passive: true });
    updateVisible();

    // 패널 왼쪽 곡선: 열릴 때 펴지고, 닫힐 때 다시 휘어짐
    const setCurve = (x) => curve.setAttribute("d", `M100 0 L100 100 Q${x} 50 100 0`);
    function setOpen(open) {
      document.body.classList.toggle("menu-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? t.nav.close : t.nav.menu);
      tween(open ? -100 : 100, open ? 100 : -100, open ? 1000 : 800, setCurve);
    }
    button.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
    document.querySelector(".menu-backdrop").addEventListener("click", () => setOpen(false));
    document.querySelectorAll(".menu-panel__links a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  }

  /** 페이지 맨 아래 연락처 영역 (전화번호는 표시하지 않음) */
  function renderContact(el) {
    el.outerHTML = `
      <footer class="contact" id="contact">
        <div class="container contact__inner">
          <div class="reveal">
            <div class="contact__title-row">
              <img class="contact__avatar" src="${IMAGES.profileAvatar}" alt="${t.name}" />
              <h2 class="contact__title">${t.contact.title[0]}</h2>
            </div>
            <h2 class="contact__title">${t.contact.title[1]}</h2>
          </div>

          <div class="contact__line">
            <div class="contact__cta">
              <span class="magnetic"><a class="btn" href="mailto:${PROFILE.email}">${t.contact.button}</a></span>
            </div>
            <svg class="contact__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
              <path d="M5 5l14 14M19 8v11H8" />
            </svg>
          </div>

          <div class="contact__pills">
            <span class="magnetic"><a class="btn" href="mailto:${PROFILE.email}">${PROFILE.email}</a></span>
            <span class="magnetic"><a class="btn" href="${PROFILE.github}" target="_blank" rel="noreferrer">github.com/totobabo-ux</a></span>
          </div>

          <div class="contact__bottom">
            <div class="contact__bottom-left">
              <div>
                <p class="label">${t.contact.version}</p>
                <p>2026 © Edition</p>
              </div>
              <div>
                <p class="label">${t.contact.localTime}</p>
                <p><span data-local-time>--:--</span> GMT+9</p>
              </div>
            </div>
            <div>
              <p class="label">${t.contact.socials}</p>
              <div class="contact__socials">
                <a class="dot-link" href="${PROFILE.github}" target="_blank" rel="noreferrer">GitHub</a>
                <a class="dot-link" href="${PROFILE.siteRepo}" target="_blank" rel="noreferrer">Source</a>
              </div>
            </div>
          </div>
        </div>
      </footer>`;

    // 서울 현지 시각 (10초마다 갱신)
    const timeEl = document.querySelector("[data-local-time]");
    const format = new Intl.DateTimeFormat("en-GB", { timeZone: PROFILE.timeZone, hour: "2-digit", minute: "2-digit" });
    const tick = () => (timeEl.textContent = format.format(Date.now()));
    tick();
    setInterval(tick, 10000);
  }

  /* 3. 애니메이션 도우미 --------------------------------------------------- */
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** 사이트 전체에서 쓰는 곡선 (CSS 의 cubic-bezier(0.76, 0, 0.24, 1) 과 비슷) */
  const ease = (x) => (x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2);

  /** from → to 로 duration(ms) 동안 값을 바꾸며 onUpdate 호출 */
  function tween(from, to, duration, onUpdate, delay = 0) {
    const start = performance.now() + delay;
    function frame(now) {
      const p = Math.min(Math.max((now - start) / duration, 0), 1);
      onUpdate(from + (to - from) * ease(p));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /** 부드러운 스크롤 (Lenis 라이브러리) */
  function initSmoothScroll() {
    if (reducedMotion || !window.Lenis) return;
    window.lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
  }

  /** 문장을 단어별 <span> 으로 쪼개서 하나씩 올라오게 준비 */
  function splitWords(el, sentence) {
    el.classList.add("words");
    el.innerHTML = sentence
      .split(" ")
      .map((word, i) => `<span class="word"><span style="--i:${i}">${word}</span></span>`)
      .join("");
  }

  /** .reveal / .words 요소가 화면에 들어오면 .is-in 을 붙여 애니메이션 시작 */
  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll(".reveal, .words").forEach((el) => observer.observe(el));
  }

  /** .magnetic 요소가 마우스 쪽으로 살짝 끌려옴 (손을 떼면 제자리로) */
  function initMagnetic() {
    if (!window.matchMedia("(hover: hover)").matches) return; // 터치 기기는 제외
    document.querySelectorAll(".magnetic").forEach((el) => {
      let x = 0, y = 0, targetX = 0, targetY = 0, running = false;
      function frame() {
        x += (targetX - x) * 0.2;
        y += (targetY - y) * 0.2;
        el.style.transform = `translate(${x}px, ${y}px)`;
        if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) requestAnimationFrame(frame);
        else running = false;
      }
      function start() {
        if (!running) {
          running = true;
          requestAnimationFrame(frame);
        }
      }
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        targetX = (e.clientX - (r.left + r.width / 2)) * 0.35;
        targetY = (e.clientY - (r.top + r.height / 2)) * 0.35;
        start();
      });
      el.addEventListener("mouseleave", () => {
        targetX = 0;
        targetY = 0;
        start();
      });
    });
  }

  /** 첫 방문 시 여러 언어 인사말이 지나간 뒤 곡선을 그리며 위로 사라지는 로딩 화면 */
  function initPreloader() {
    const el = document.querySelector(".preloader");
    if (!el) return;
    if (document.documentElement.dataset.pl) {
      el.remove(); // 이번 세션에서 이미 봤음
      return;
    }
    const wordEl = el.querySelector(".preloader__word");
    const path = el.querySelector(".preloader__curve path");
    const words = t.preloader;
    let i = 0;

    function show() {
      wordEl.textContent = words[i];
      wordEl.classList.remove("is-visible");
      void wordEl.offsetWidth; // 투명도 애니메이션을 다시 시작하기 위해 강제로 다시 그림
      wordEl.style.transitionDelay = i === 0 ? "0.2s" : "0s";
      wordEl.classList.add("is-visible");

      if (i < words.length - 1) {
        setTimeout(() => {
          i++;
          show();
        }, i === 0 ? 1000 : 150);
      } else {
        setTimeout(finish, 600);
      }
    }
    function finish() {
      el.classList.add("is-done");
      tween(100, 0, 800, (v) => path.setAttribute("d", `M0 0 L100 0 Q50 ${v} 0 0`), 300);
      setTimeout(() => el.remove(), 1200);
      try {
        sessionStorage.setItem("preloader-seen", "1");
      } catch (e) {}
    }
    show();
  }

  /** 페이지 공통 준비: 헤더·메뉴·푸터 그리기 → 애니메이션 연결 */
  function initPage({ onHome }) {
    document.querySelectorAll("[data-header]").forEach((el) => renderHeader(el, onHome));
    renderMenu(onHome);
    document.querySelectorAll("[data-contact]").forEach((el) => renderContact(el));
    document.querySelectorAll("[data-text]").forEach((el) => (el.textContent = text(el.dataset.text)));
    document.querySelectorAll("[data-words]").forEach((el) => splitWords(el, text(el.dataset.words)));

    initPreloader();
    initSmoothScroll();
    initReveal();
    initMagnetic();
  }

  window.APP = { lang, t, PROFILE, IMAGES, homeUrl, workUrl, text, splitWords, tween, reducedMotion, initPage };
})();
