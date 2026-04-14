const { brands } = window.sharedOfficeData;

const brandId = document.body.dataset.brandId;
const brand = brands.find((item) => item.id === brandId);

const detailRoot = document.getElementById("brand-detail");
const otherBrandsRoot = document.getElementById("other-brands");

if (!brand || !detailRoot || !otherBrandsRoot) {
  throw new Error("브랜드 상세 페이지를 렌더링할 수 없습니다.");
}

detailRoot.innerHTML = `
  <section class="detail-hero">
    <div class="detail-hero-main">
      <div class="back-link-row">
        <a class="back-link" href="../index.html">홈으로 돌아가기</a>
        <a class="back-link" href="../explore.html">브랜드 탐색으로 이동</a>
      </div>
      ${
        brand.logoSymbol || brand.logoText
          ? `
        <div class="brand-logo-row">
          ${
            brand.logoSymbol
              ? `<div class="brand-logo-symbol-wrap"><img class="brand-logo-symbol" src="${brand.logoSymbol}" alt="${brand.logoSymbolAlt || `${brand.name} 심볼 로고`}" /></div>`
              : ""
          }
          ${
            brand.logoText
              ? `<div class="brand-logo-text-wrap"><img class="brand-logo-text" src="${brand.logoText}" alt="${brand.logoTextAlt || `${brand.name} 텍스트 로고`}" /></div>`
              : ""
          }
        </div>
      `
          : ""
      }
      <div class="detail-title-row">
        <div>
          <span class="card-kicker">${brand.profileLabel}</span>
          <h1 class="detail-title">${brand.name}</h1>
          <p class="detail-summary">${brand.summary}</p>
        </div>
        ${brand.visualCode ? `<div class="brand-stamp">${brand.visualCode}</div>` : ""}
      </div>
      <div class="detail-badges">
        <span class="badge">${brand.scaleTag}</span>
        <span class="badge subtle">${brand.disclosureLabel}</span>
      </div>
    </div>
    <div class="detail-hero-side">
      <div class="detail-panel">
        <span class="fact-label">포지션</span>
        <strong class="fact-value">${brand.positioning}</strong>
      </div>
      <div class="detail-panel emphasis">
        <span class="fact-label">${brand.highlightTitle || "추천 대상"}</span>
        <p class="detail-fit">${brand.highlightBody || brand.fit}</p>
      </div>
    </div>
  </section>

  <section class="detail-image-card">
    <div class="detail-image-frame">
      <img src="${brand.heroImage}" alt="${brand.heroImageAlt}" />
    </div>
    <div class="detail-image-copy">
      <p class="section-kicker">Story View</p>
      <h2>${brand.storyTitle || "브랜드 실사 이미지"}</h2>
      <p>
        ${
          brand.storyBody ||
          "공개 페이지 또는 최근 기사에 노출된 이미지를 함께 배치해 브랜드가 어떤 분위기의 공간을 지향하는지 직관적으로 볼 수 있게 했습니다."
        }
      </p>
      <span class="image-source-label">이미지 출처: ${brand.heroImageSource}</span>
    </div>
  </section>

  ${
    brand.galleryImages?.length
      ? `
    <section class="detail-gallery-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">Real Space</p>
          <h2>${brand.galleryTitle || "브랜드 갤러리"}</h2>
        </div>
      </div>
      <div class="detail-gallery-grid">
        ${brand.galleryImages
          .map(
            (image) => `
              <article class="gallery-card">
                <div class="gallery-frame">
                  <img src="${image.url}" alt="${image.alt}" />
                </div>
                <span class="gallery-label">${image.label || ""}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `
      : ""
  }

  <section class="detail-metrics">
    <article class="fact-panel">
      <span class="fact-label">공개 창업비용</span>
      <strong class="fact-value">${brand.costHeadline}</strong>
      <p class="fact-note">${brand.costNote}</p>
    </article>
    <article class="fact-panel">
      <span class="fact-label">지점 수</span>
      <strong class="fact-value">${brand.branchHeadline}</strong>
      <p class="fact-note">${brand.branchNote}</p>
    </article>
    <article class="fact-panel">
      <span class="fact-label">지역 커버리지</span>
      <strong class="fact-value">${brand.regionHeadline}</strong>
      <p class="fact-note">${brand.regionNote}</p>
    </article>
    <article class="fact-panel">
      <span class="fact-label">핵심 특색</span>
      <div class="tag-row">
        ${brand.specialTags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </article>
  </section>

  <section class="detail-content-grid">
    <article class="detail-section-card">
      <p class="section-kicker">Strengths</p>
      <h2>장점</h2>
      <ul class="detail-list">
        ${brand.advantages.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
    <article class="detail-section-card caution">
      <p class="section-kicker">Watchouts</p>
      <h2>유의점</h2>
      <ul class="detail-list">
        ${brand.cautions.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  </section>

  ${
    brand.consultationCards?.length
      ? `
    <section class="detail-banner-section consultation-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">Consultation Notes</p>
          <h2>${brand.consultationTitle || "상담 핵심 정리"}</h2>
        </div>
      </div>
      <div class="promo-banner-grid">
        ${brand.consultationCards
          .map(
            (card) => `
              <article class="promo-banner-card consultation-card">
                <div class="promo-banner-copy">
                  <span class="promo-banner-label">상담 포인트</span>
                  <h3>${card.title}</h3>
                  <p>${card.body}</p>
                  ${
                    card.points?.length
                      ? `
                    <ul class="detail-list compact">
                      ${card.points.map((point) => `<li>${point}</li>`).join("")}
                    </ul>
                  `
                      : ""
                  }
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `
      : ""
  }

  ${
    brand.promoBanners?.length
      ? `
    <section class="detail-banner-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">Promotion</p>
          <h2>${brand.bannerTitle || "브랜드 배너"}</h2>
        </div>
      </div>
      <div class="promo-banner-grid">
        ${brand.promoBanners
          .map(
            (banner) => `
              <article class="promo-banner-card">
                <div class="promo-banner-image">
                  <img src="${banner.url}" alt="${banner.alt}" />
                </div>
                <div class="promo-banner-copy">
                  <span class="promo-banner-label">${banner.label || ""}</span>
                  <h3>${banner.title || ""}</h3>
                  <p>${banner.body || ""}</p>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `
      : ""
  }

	  <section class="detail-sources">
	    <div class="section-heading">
	      <div>
	        <p class="section-kicker">Sources</p>
	        <h2>이 브랜드를 확인한 출처</h2>
      </div>
    </div>
	    <div class="source-links">
	      ${brand.sources
	        .map(
	          (source) => `
	            <a class="source-chip" href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>
	          `
	        )
	        .join("")}
	    </div>
	  </section>
	`;

otherBrandsRoot.innerHTML = brands
  .filter((item) => item.id !== brand.id)
  .map(
    (item) => `
      <a class="other-brand-card" href="${item.href.replace("./", "../")}">
        <span class="card-kicker">${item.profileLabel}</span>
        <strong>${item.name}</strong>
        <p>${item.positioning}</p>
      </a>
    `
  )
  .join("");
