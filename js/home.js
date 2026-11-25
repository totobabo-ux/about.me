/**
 * 홈(index.html) 전용 기능
 *  1. 목록 그리기 (일하는 방식 · 프로젝트 · 경험 · 기술 · 하단 이미지)
 *  2. 히어로: 흐르는 이름 띠 + 스크롤 패럴랙스
 *  3. 프로젝트 목록: 커서를 따라다니는 미리보기
 *  4. 하단 이미지 띠: 스크롤에 따라 흐름 + 곡선
 */
(function () {
  const { t, IMAGES, PROFILE, workUrl, reducedMotion } = window.APP;
  const { SLIDER_ORDER } = window.SITE;

  document.title = t.meta.title;
  document.querySelector('meta[name="description"]').content = t.meta.description;

  /* 1. 목록 그리기 --------------------------------------------------------- */
  // 히어로 사진·배경색
  document.querySelector(".hero").style.background = IMAGES.heroBackground;
  const heroPhoto = document.getElementById("hero-photo");
  heroPhoto.src = IMAGES.profileFull;
  heroPhoto.alt = t.name;
  document.getElementById("hero-location-mobile").textContent = t.hero.location.join(" ");

  // 일하는 방식 (3개)
  document.getElementById("approach-list").innerHTML = t.approach.items
    .map(
      (item, i) => `
      <div class="reveal" style="--delay:${i * 0.1}s">
        <p class="approach__num mono">0${i + 1}</p>
        <h3 class="approach__title">${item.title}</h3>
        <p class="approach__body">${item.body}</p>
      </div>`,
    )
    .join("");

  // 프로젝트 목록
  document.getElementById("work-list").innerHTML = t.projects
    .map(
      (p) => `
      <li>
        <a class="work-row" href="${workUrl(p.slug)}">
          <span class="work-row__name">${p.name}</span>
          <span class="work-row__meta"><span>${p.category}</span><span>${p.kind}</span></span>
          <span class="work-row__thumb" style="background:${p.color}"><img src="${p.cover}" alt="" loading="lazy" /></span>
        </a>
      </li>`,
    )
    .join("");
  document.getElementById("work-more").href = PROFILE.github;

  // 커서 미리보기 안의 이미지들 (세로로 쌓아두고 위아래로 이동)
  document.getElementById("work-preview-slider").innerHTML = t.projects
    .map((p) => `<div class="work-preview__slide" style="background:${p.color}"><img src="${p.cover}" alt="" /></div>`)
    .join("");

  // 경험
  document.getElementById("exp-list").innerHTML = t.experience.items
    .map(
      (item) => `
      <li class="exp-item">
        <div class="reveal">
          <h3 class="exp-item__title">${item.title}</h3>
          <p class="exp-item__meta">${item.org} · ${item.period}</p>
        </div>
        <ul class="bullets reveal" style="--delay:0.1s">
          ${item.points.map((pt) => `<li>${pt}</li>`).join("")}
        </ul>
      </li>`,
    )
    .join("");

  // 기술 스택
  document.getElementById("skill-list").innerHTML = t.skills.groups
    .map(
      (g) => `
      <div class="skill-row reveal">
        <span class="skill-row__name">${g.name}</span>
        <div class="pills">${g.items.map((s) => `<span class="pill">${s}</span>`).join("")}</div>
      </div>`,
    )
    .join("");

  // 하단 프로젝트 이미지 3장
  document.getElementById("strip-track").innerHTML = SLIDER_ORDER.map((slug) => t.projects.find((p) => p.slug === slug))
    .filter(Boolean)
    .map(
      (p) => `
      <a class="strip__card" href="${workUrl(p.slug)}" aria-label="${p.name}" style="background:${p.color}">
        <span class="strip__img"><img src="${p.cover}" alt="" loading="lazy" /></span>
        <span class="strip__name">${p.name} ↗</span>
      </a>`,
    )
    .join("");

  // 헤더·메뉴·푸터 + 공통 애니메이션 연결
  window.APP.initPage({ onHome: true });

  /* 2. 히어로 -------------------------------------------------------------- */
  const hero = document.querySelector(".hero");
  const photo = document.querySelector(".hero__photo");
  const heroContent = document.querySelector(".hero__content");
  const track = document.querySelector(".hero__marquee-track");

  // 이름 띠: 계속 흐르다가, 스크롤 방향이 바뀌면 흐르는 방향도 바뀜
  let offset = 0; // -50% ~ 0% 사이를 반복 (같은 문구 두 개를 이어 붙여서 끊김 없이 보임)
  let direction = -1;
  let lastScrollY = window.scrollY;
  let lastTime = performance.now();
  function marquee(now) {
    const delta = now - lastTime;
    lastTime = now;
    offset += direction * delta * 0.0035;
    if (offset <= -50) offset += 50;
    if (offset > 0) offset -= 50;
    track.style.transform = `translateX(${offset}%)`;
    requestAnimationFrame(marquee);
  }
  if (!reducedMotion) requestAnimationFrame(marquee);

  // 스크롤: 사진은 천천히, 글자는 조금 더 빠르게 내려가며 깊이감
  function onHeroScroll() {
    const y = window.scrollY;
    if (y !== lastScrollY) direction = y > lastScrollY ? -1 : 1;
    lastScrollY = y;
    const progress = Math.min(Math.max(y / hero.offsetHeight, 0), 1);
    photo.style.transform = `translateY(${progress * 18}%)`;
    heroContent.style.transform = `translateY(${progress * 40}%)`;
  }
  window.addEventListener("scroll", onHeroScroll, { passive: true });

  /* 3. 프로젝트 목록: 커서를 따라다니는 미리보기 (데스크톱) ---------------- */
  const list = document.getElementById("work-list");
  const preview = document.querySelector(".work-preview");
  const cursor = document.querySelector(".work-cursor");
  const slider = document.getElementById("work-preview-slider");
  const mouse = { x: 0, y: 0 };
  const previewPos = { x: 0, y: 0 };
  const cursorPos = { x: 0, y: 0 };

  list.querySelectorAll(".work-row").forEach((row, i) => {
    row.addEventListener("mouseenter", () => {
      slider.style.transform = `translateY(${i * -100}%)`;
      preview.classList.add("is-active");
      cursor.classList.add("is-active");
    });
  });
  list.addEventListener("mouseleave", () => {
    preview.classList.remove("is-active");
    cursor.classList.remove("is-active");
  });
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  // 미리보기는 조금 느리게, "보기" 원은 조금 빠르게 따라옴
  function followMouse() {
    previewPos.x += (mouse.x - previewPos.x) * 0.12;
    previewPos.y += (mouse.y - previewPos.y) * 0.12;
    cursorPos.x += (mouse.x - cursorPos.x) * 0.2;
    cursorPos.y += (mouse.y - cursorPos.y) * 0.2;
    preview.style.transform = `translate(${previewPos.x}px, ${previewPos.y}px)`;
    cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
    requestAnimationFrame(followMouse);
  }
  if (window.matchMedia("(hover: hover)").matches) requestAnimationFrame(followMouse);

  /* 4. 하단 이미지 띠 ------------------------------------------------------ */
  const strip = document.querySelector(".strip");
  const stripTrack = document.getElementById("strip-track");
  const curve = document.querySelector(".strip__curve");
  const desktop = window.matchMedia("(min-width: 768px)");

  function onStripScroll() {
    const rect = strip.getBoundingClientRect();
    const vh = window.innerHeight;
    // 띠가 화면 아래에서 나타날 때 0 → 화면 위로 사라질 때 1
    const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
    // 데스크톱만 살짝 옆으로 흐름 (모바일은 손가락으로 넘김)
    stripTrack.style.transform = desktop.matches ? `translateX(${3 - progress * 6}%)` : "";
    // 곡선은 내려갈수록 납작해짐
    curve.style.height = `${Math.max(60 * (1 - progress / 0.9), 0)}px`;
  }
  window.addEventListener("scroll", onStripScroll, { passive: true });
  window.addEventListener("resize", onStripScroll);
  onStripScroll();
})();
