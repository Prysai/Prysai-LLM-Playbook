(() => {
  'use strict';

  // Keep this list small and explicit. A missing locale variant must remain an
  // honest English fallback until its SVG text has been reviewed.
  const LOCALES = ['en', 'zh', 'es', 'ja', 'ko', 'de', 'zh-tw', 'fr'];
  const LOCALIZED_ASSETS = new Set([
    'llm-six-terms-to-one-check.svg',
    'foundation-first-visit-route-red-black.svg',
    'llm-foundation-core-path-red-black.svg',
    'playbook-learning-journey-red-black.svg',
    'reader-page-reading-loop-red-black.svg',
    'first-task-evidence-bridge-red-black.svg',
    'recovery-decision-tree-red-black.svg',
    'skill-trigger-boundary-decision-map.svg',
  ]);
  const ASSET_MARKER = 'assets/teaching/';

  function normalizeAsset(value) {
    const normalized = String(value || '').replace(/^\.\.\//, '');
    if (!normalized.startsWith(ASSET_MARKER)) return '';
    const asset = normalized.slice(ASSET_MARKER.length).split(/[?#]/, 1)[0];
    return /^[a-z0-9][a-z0-9._-]*\.svg$/i.test(asset) ? asset : '';
  }

  function resolve(value, locale = 'en') {
    const asset = normalizeAsset(value) || (String(value || '').match(/^[a-z0-9][a-z0-9._-]*\.svg$/i)?.[0] || '');
    const selectedLocale = LOCALES.includes(locale) ? locale : 'en';
    const localized = selectedLocale !== 'en' && LOCALIZED_ASSETS.has(asset);
    const relative = localized
      ? `../assets/teaching/locales/${selectedLocale}/${asset}`
      : `../assets/teaching/${asset}`;
    return {
      asset,
      locale: selectedLocale,
      path: relative,
      sourcePath: `../assets/teaching/${asset}`,
      localized,
      status: localized ? 'localized' : 'english-fallback',
    };
  }

  function path(value, locale = 'en') {
    return resolve(value, locale).path;
  }

  function apply(image, value, locale, link = null) {
    if (!image) return resolve(value, locale);
    const result = resolve(value, locale);
    image.src = result.path;
    image.dataset.visualAsset = result.asset;
    image.dataset.visualLocale = result.locale;
    image.dataset.visualLocaleStatus = result.status;
    if (link) {
      link.href = result.path;
      link.dataset.visualLocaleStatus = result.status;
    }
    return result;
  }

  function applyAll(root = document, locale = 'en') {
    const scope = root || document;
    scope.querySelectorAll('img[src*="assets/teaching/"]').forEach((image) => {
      const source = image.getAttribute('src');
      const result = apply(image, source, locale);
      const link = image.closest('a[href*="assets/teaching/"]');
      if (link) {
        const linkResult = resolve(link.getAttribute('href'), locale);
        if (linkResult.asset) {
          link.href = linkResult.path;
          link.dataset.visualLocaleStatus = linkResult.status;
        }
      }
      if (result.asset) image.setAttribute('data-visual-locale-status', result.status);
    });
    scope.querySelectorAll('a[href*="assets/teaching/"]').forEach((link) => {
      const result = resolve(link.getAttribute('href'), locale);
      if (result.asset) {
        link.href = result.path;
        link.dataset.visualLocaleStatus = result.status;
      }
    });
  }

  window.PRYSAI_VISUAL_ASSETS = Object.freeze({
    locales: Object.freeze([...LOCALES]),
    localizedAssets: Object.freeze([...LOCALIZED_ASSETS]),
    normalizeAsset,
    resolve,
    path,
    apply,
    applyAll,
  });
})();
