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
    'lifecycle-checkpoints.svg',
    'skill-to-observable-output.svg',
    'evidence-recovery-ladder.svg',
  ]);
  const FALLBACK_NOTES = Object.freeze({
    en: '',
    zh: '图内文字暂为英文；旁边的本地化说明是当前语言版本。',
    es: 'El texto de la imagen está en inglés; la explicación de al lado está en el idioma elegido.',
    ja: '図中の文字は英語です。横の説明は選択した言語で読めます。',
    ko: '그림 속 글자는 영어입니다. 옆 설명은 선택한 언어로 제공됩니다.',
    de: 'Der Text im Bild ist Englisch; die Erklärung daneben ist in der gewählten Sprache.',
    'zh-tw': '圖中文字目前為英文；旁邊的說明使用目前選擇的語言。',
    fr: 'Le texte de l’image est en anglais ; l’explication voisine utilise la langue choisie.',
  });
  const ASSET_MARKER = 'assets/teaching/';

  function normalizeAsset(value) {
    const normalized = String(value || '').replace(/^\.\.\//, '');
    if (!normalized.startsWith(ASSET_MARKER)) return '';
    const assetPath = normalized.slice(ASSET_MARKER.length).split(/[?#]/, 1)[0];
    // Accept both source paths and already-resolved locale paths so repeated
    // applyAll() calls never collapse an image to the directory itself.
    const asset = assetPath.split('/').pop() || '';
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
      status: selectedLocale === 'en' ? 'source' : localized ? 'localized' : 'english-fallback',
    };
  }

  function path(value, locale = 'en') {
    return resolve(value, locale).path;
  }

  function syncFallbackNote(image, result) {
    // The full viewer already has a dedicated status paragraph. Inline cards
    // need the same disclosure without duplicating that viewer message.
    if (!image || image.matches('[data-viewer-image]')) return;
    const host = image.closest('a[href*="assets/teaching/"]') || image.parentElement;
    if (!host) return;
    let note = Array.from(host.children).find((child) => child.classList?.contains('visual-locale-note'));
    if (!note && result.status !== 'english-fallback') return;
    if (!note) {
      note = document.createElement('span');
      note.className = 'visual-locale-note';
      note.setAttribute('data-visual-locale-note', 'true');
      host.append(note);
    }
    const text = result.status === 'english-fallback' ? (FALLBACK_NOTES[result.locale] || FALLBACK_NOTES.en) : '';
    note.textContent = text;
    note.hidden = !text;
    note.dataset.visualLocaleStatus = result.status;
  }

  function apply(image, value, locale, link = null) {
    if (!image) return resolve(value, locale);
    const result = resolve(value, locale);
    image.src = result.path;
    image.dataset.visualAsset = result.asset;
    image.dataset.visualLocale = result.locale;
    image.dataset.visualLocaleStatus = result.status;
    syncFallbackNote(image, result);
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
    fallbackNotes: Object.freeze({ ...FALLBACK_NOTES }),
  });
})();
