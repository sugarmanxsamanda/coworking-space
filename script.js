const { brands, filters, scenarios, sourceGroups } = window.sharedOfficeData;

const brandGrid = document.getElementById("brand-grid");
const comparisonBody = document.getElementById("comparison-body");
const filtersRoot = document.getElementById("filters");
const scenarioGrid = document.getElementById("scenario-grid");
const sourcesList = document.getElementById("sources-list");

let activeFilter = "all";

function matchesFilter(brand) {
  if (activeFilter === "all") {
    return true;
  }

  return brand.filterTags.includes(activeFilter);
}

function renderFilters() {
  if (!filtersRoot) {
    return;
  }

  filtersRoot.innerHTML = filters
    .map(
      (filter) => `
        <button
          class="chip ${filter.id === activeFilter ? "is-active" : ""}"
          type="button"
          data-filter="${filter.id}"
          role="tab"
          aria-selected="${filter.id === activeFilter}"
        >
          ${filter.label}
        </button>
      `
    )
    .join("");

  filtersRoot.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderBrands();
    });
  });
}

function renderBrands() {
  if (!brandGrid) {
    return;
  }

  brandGrid.innerHTML = brands
    .filter(matchesFilter)
    .map(
      (brand) => `
        <article class="brand-preview-card">
          <div class="card-head">
            <div class="card-heading">
              <span class="card-kicker">${brand.profileLabel}</span>
              <h3 class="brand-name">${brand.name}</h3>
              <p class="brand-summary">${brand.summary}</p>
            </div>
            <div class="card-badges">
              <span class="badge">${brand.scaleTag}</span>
              <span class="badge subtle">${brand.disclosureLabel}</span>
            </div>
          </div>

          <div class="preview-metrics">
            <div class="preview-metric">
              <span class="fact-label">공개 창업비용</span>
              <strong class="fact-value">${brand.costHeadline}</strong>
            </div>
            <div class="preview-metric">
              <span class="fact-label">지점 수</span>
              <strong class="fact-value">${brand.branchHeadline}</strong>
            </div>
          </div>

          <p class="preview-positioning">${brand.positioning}</p>

          <div class="tag-row">
            ${brand.specialTags.slice(0, 3).map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>

          <div class="preview-footer">
            <p class="preview-note">상세 장단점과 출처는 전용 페이지에서 확인할 수 있습니다.</p>
            <a class="detail-link" href="${brand.href}">상세 페이지 보기</a>
          </div>
        </article>
      `
    )
    .join("");

  if (comparisonBody) {
    comparisonBody.innerHTML = brands
      .filter(matchesFilter)
      .map(
        (brand) => `
          <tr>
            <td class="table-brand">
              <a class="table-link" href="${brand.href}">${brand.name}</a>
            </td>
            <td>
              <div>${brand.costHeadline}</div>
              <div class="table-note">${brand.costNote}</div>
            </td>
            <td>
              <div>${brand.branchHeadline}</div>
              <div class="table-note">${brand.branchNote}</div>
            </td>
            <td>${brand.positioning}</td>
            <td>${brand.advantages[0]}</td>
            <td>${brand.cautions[0]}</td>
          </tr>
        `
      )
      .join("");
  }
}

function renderScenarios() {
  if (!scenarioGrid) {
    return;
  }

  scenarioGrid.innerHTML = scenarios
    .map(
      (scenario) => `
        <article class="scenario-card">
          <h3>${scenario.title}</h3>
          <p>${scenario.body}</p>
          <strong>${scenario.recommendation}</strong>
        </article>
      `
    )
    .join("");
}

function renderSources() {
  if (!sourcesList) {
    return;
  }

  sourcesList.innerHTML = sourceGroups
    .map(
      (group) => `
        <article class="source-group">
          <h3>${group.title}</h3>
          <ul>
            ${group.items
              .map(
                (item) => `
                  <li>
                    <a href="${item.url}" target="_blank" rel="noreferrer">${item.text}</a>
                    <div class="source-meta">${item.meta}</div>
                  </li>
                `
              )
              .join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

renderFilters();
renderBrands();
renderScenarios();
renderSources();
