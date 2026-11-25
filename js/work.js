/**
 * 프로젝트 상세(work.html) 전용 기능
 * 주소의 ?p=findex 값으로 data.js 에서 프로젝트를 찾아 화면을 그립니다.
 */
(function () {
  const { t, homeUrl, workUrl, splitWords } = window.APP;

  const slug = new URLSearchParams(location.search).get("p");
  const index = t.projects.findIndex((p) => p.slug === slug);
  if (index < 0) {
    location.replace(homeUrl("#work")); // 없는 프로젝트면 홈의 프로젝트 목록으로
    return;
  }
  const project = t.projects[index];
  const next = t.projects[(index + 1) % t.projects.length];
  const d = t.detail;

  document.title = `${project.name} | ${t.name}`;
  document.querySelector('meta[name="description"]').content = `${project.service} — ${project.role}`;

  const info = [
    [d.service, project.service],
    [d.role, project.role],
    [d.team, project.team],
    [d.period, project.period],
  ];

  /** 문제 해결 사례 하나 (개선 전 / 개선 후 / 결과 카드 포함) */
  function issueHtml(issue, i) {
    const before = issue.before
      ? `<div class="issue__card issue__card--before"><p class="label">${d.before}</p><p>${issue.before}</p></div>`
      : "";
    const after = issue.after
      ? `<div class="issue__card issue__card--after"><p class="label">${d.after}</p><p>${issue.after}</p></div>`
      : "";
    const result = issue.result
      ? `<div class="issue__card issue__card--result"><p class="label">${d.result}</p><p>${issue.result}</p></div>`
      : "";
    return `
      <article class="issue">
        <div>
          <p class="mono">0${i + 1}</p>
          <h3 class="issue__title" data-issue-title="${i}"></h3>
        </div>
        <div class="reveal" style="--delay:0.1s">
          <ul class="bullets">${issue.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>
          ${before || after ? `<div class="issue__cards">${before}${after}</div>` : ""}
          ${result}
        </div>
      </article>`;
  }

  document.getElementById("detail").innerHTML = `
    <!-- 타이틀 + 기본 정보 -->
    <section class="container detail-top">
      <div class="reveal">
        <p class="label detail-top__kind">${project.kind}</p>
        <h1 class="detail-top__name">${project.name}</h1>
      </div>
      <div class="detail-info">
        ${info
          .map(
            ([label, value], i) => `
            <div class="reveal" style="--delay:${i * 0.08}s">
              <p class="label">${label}</p>
              <p>${value}</p>
            </div>`,
          )
          .join("")}
      </div>
    </section>

    <!-- 대표 이미지 -->
    <section class="container detail-cover">
      <div class="detail-cover__frame reveal" style="background:${project.color}">
        <img src="${project.gallery[0]}" alt="${project.name} screenshot" />
      </div>
    </section>

    <!-- 담당 기능 + 기술 스택 -->
    <section class="container section detail-cols">
      <div>
        <p class="label">${d.features}</p>
        <ul class="feature-list">
          ${project.features
            .map((f, i) => `<li class="reveal" style="--delay:${i * 0.05}s"><span class="mono">0${i + 1}</span>${f}</li>`)
            .join("")}
        </ul>
      </div>
      <div>
        <p class="label">${d.stack}</p>
        <div class="pills reveal">${project.stack.map((s) => `<span class="pill">${s}</span>`).join("")}</div>
      </div>
    </section>

    <!-- 문제 해결 -->
    <section class="section--soft">
      <div class="container section--lg">
        <p class="label">${d.troubleshooting}</p>
        <div class="issues">${project.issues.map(issueHtml).join("")}</div>
      </div>
    </section>

    <!-- 추가 이미지 -->
    ${
      project.gallery[1]
        ? `<section class="container detail-extra"><img class="reveal" src="${project.gallery[1]}" alt="${project.name} detail" loading="lazy" /></section>`
        : ""
    }

    <!-- 저장소 + 다음 프로젝트 -->
    <section class="container section--lg">
      <div class="detail-repo">
        <span class="magnetic">
          <a class="btn btn--outline" href="${project.github}" target="_blank" rel="noreferrer">${d.repo} ↗</a>
        </span>
      </div>
      <a class="next-project" href="${workUrl(next.slug)}">
        <p class="label">${d.next}</p>
        <p class="next-project__name">${next.name}</p>
      </a>
      <div class="detail-back">
        <span class="magnetic"><a class="btn btn--outline btn--dark" href="${homeUrl("#work")}">${d.back}</a></span>
      </div>
    </section>`;

  // 문제 해결 제목은 단어 단위로 올라오게
  document.querySelectorAll("[data-issue-title]").forEach((el) => {
    splitWords(el, project.issues[Number(el.dataset.issueTitle)].title);
  });

  window.APP.initPage({ onHome: false });
})();
