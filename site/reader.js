(() => {
  'use strict';

  const manifest = window.CODEX_LOCALE_MANIFEST || { default_locale: 'en', locales: {}, contents: {}, path_index: {} };
  const locales = manifest.locales || {};
  const validLocales = Object.keys(locales);
  const params = new URLSearchParams(window.location.search);
  const requestedLocale = validLocales.includes(params.get('lang')) ? params.get('lang') : null;
  const requestedPath = normalizeRepoPath(params.get('path') || 'book/chapters/01-gpt-and-codex-EN.md');
  const languageStorageKey = 'codex-field-guide-language';
  let activeLocale = requestedLocale;
  const article = document.querySelector('[data-reader-article]');
  const banner = document.querySelector('[data-reader-banner]');
  const languageSelect = document.querySelector('[data-reader-language]');
  const sourcePathNode = document.querySelector('[data-reader-path]');
  const contentIdNode = document.querySelector('[data-reader-content-id]');
  const sourceLink = document.querySelector('[data-reader-source]');
  const toc = document.querySelector('[data-reader-toc]');
  const tocList = document.querySelector('[data-reader-toc-list]');
  const bookNav = document.querySelector('[data-reader-book-nav]');
  const bookProgress = document.querySelector('[data-reader-book-progress]');
  const chapterList = document.querySelector('[data-reader-chapter-list]');
  const orientation = document.querySelector('[data-reader-orientation]');
  const orientationSummary = orientation?.querySelector('summary');
  const mobileProgress = document.querySelector('[data-reader-mobile-progress]');
  const mobilePrevious = document.querySelector('[data-reader-mobile-previous]');
  const mobileNext = document.querySelector('[data-reader-mobile-next]');
  const mobilePageToc = document.querySelector('[data-reader-mobile-page-toc]');
  const mobilePageTocList = document.querySelector('[data-reader-mobile-page-toc-list]');
  const chapterCard = document.querySelector('[data-reader-chapter-card]');
  const chapterLabel = document.querySelector('[data-reader-chapter-label]');
  const chapterStatus = document.querySelector('[data-reader-chapter-status]');
  const trustCard = document.querySelector('[data-reader-trust-card]');
  const trustScope = document.querySelector('[data-reader-trust-scope]');
  const trustReview = document.querySelector('[data-reader-trust-review]');
  const trustLimitations = document.querySelector('[data-reader-trust-limitations]');
  const pagination = document.querySelector('[data-reader-pagination]');
  const previousLink = document.querySelector('[data-reader-previous]');
  const previousTitle = document.querySelector('[data-reader-previous-title]');
  const nextLink = document.querySelector('[data-reader-next]');
  const nextTitle = document.querySelector('[data-reader-next-title]');
  const bookNavigation = manifest.book_navigation || { parts: [], chapters: [] };
  const labNavigation = manifest.lab_navigation || { labs: [] };
  const readerCopy = {
    en: {
      skip: 'Skip to content', back: 'Back to overview', language: 'Language', languageAria: 'Choose reading language', detailsAria: 'Page details', bookChaptersAria: 'Book chapters', bookChapters: 'Book chapters', chapterList: 'Chapter list', labSequence: 'Lab sequence', skillMethod: 'Skill method', fieldNote: 'Field note', projectDocument: 'Project document', pageDetails: 'Page details', trustRecord: 'Trust record', trustScope: 'Scope', trustReview: 'Next review', trustLimitations: 'Known limitation', trustUnavailable: 'unavailable', trustUnavailableDetail: 'The trust registry could not be loaded. This is a data failure, not evidence that the page has no record.', chapterNavigationAria: 'Chapter navigation', labNavigationAria: 'Lab catalog navigation', previousChapter: 'Previous chapter', nextChapter: 'Next chapter', previousLab: 'Previous Lab', nextLab: 'Next Lab', onThisPageAria: 'On this page', onThisPage: 'On this page', readingRoute: 'Content type', sourcePath: 'Source path', contentIdentity: 'Content identity', openSource: 'Open source file ↗', footer: 'Source remains Markdown; this page is a static reading view', loading: 'Loading the source page…', copyPrompt: 'Copy prompt', copiedPrompt: 'Prompt copied', copyFailed: 'Copy failed',
      fallbackEnglish: (name) => `${name} is not available for this page yet. Showing the current English source.`, fallbackSource: (name, source) => `${name} is not available for this page yet. Showing the current ${source} source.`, invalidPath: 'This reader URL does not name an allowed project source file. Return to the overview and choose a page from the guide.', loadError: (status) => `The source page could not be loaded (${status}).`
    },
    zh: {
      skip: '跳到正文', back: '返回总览', language: '语言', languageAria: '选择阅读语言', detailsAria: '页面详情', bookChaptersAria: '全书章节', bookChapters: '全书章节', chapterList: '章节列表', labSequence: '实验编号导航', skillMethod: 'Skill 方法', fieldNote: '现场研究记录', projectDocument: '项目文档', pageDetails: '页面详情', trustRecord: '信任记录', trustScope: '范围', trustReview: '下次复核', trustLimitations: '已知限制', trustUnavailable: '不可用', trustUnavailableDetail: '信任登记表加载失败。这是数据故障，不代表本页没有登记记录。', chapterNavigationAria: '章节导航', labNavigationAria: '实验目录导航', previousChapter: '上一章', nextChapter: '下一章', previousLab: '上一个实验', nextLab: '下一个实验', onThisPageAria: '本页目录', onThisPage: '本页目录', readingRoute: '内容类型', sourcePath: '源文件路径', contentIdentity: '内容身份', openSource: '打开源文件 ↗', footer: '源文件仍是 Markdown；此页面是静态阅读视图', loading: '正在加载源文件……', copyPrompt: '复制提示词', copiedPrompt: '提示词已复制', copyFailed: '复制失败',
      fallbackEnglish: (name) => `此页面暂时没有${name}版本，当前显示英文源文件。`, fallbackSource: (name, source) => `此页面暂时没有${name}版本，当前显示${source}源文件。`, invalidPath: '这个阅读链接没有指向允许的项目源文件。请返回总览，从指南中选择页面。', loadError: (status) => `源文件加载失败（${status}）。`
    }
  };
  const uiLanguage = () => (activeLocale || requestedLocale) === 'zh' ? 'zh' : 'en';
  const currentReaderCopy = () => readerCopy[uiLanguage()];
  const applyReaderChrome = () => {
    const strings = currentReaderCopy();
    document.querySelectorAll('[data-reader-i18n]').forEach((element) => {
      const key = element.dataset.readerI18n;
      if (strings[key]) element.textContent = strings[key];
    });
    document.querySelectorAll('[data-reader-i18n-attr]').forEach((element) => {
      element.dataset.readerI18nAttr.split(';').forEach((entry) => {
        const [attribute, key] = entry.split(':');
        if (attribute && key && strings[key]) element.setAttribute(attribute, strings[key]);
      });
    });
    const loading = document.querySelector('[data-reader-loading]');
    if (loading) loading.textContent = strings.loading;
    const optionLabels = uiLanguage() === 'zh'
      ? { en: '英语', zh: '简体中文', es: '西班牙语', ja: '日语', ko: '韩语', de: '德语' }
      : { en: 'English', zh: 'Simplified Chinese', es: 'Spanish', ja: 'Japanese', ko: 'Korean', de: 'German' };
    document.querySelectorAll('[data-reader-language] option').forEach((option) => {
      option.textContent = optionLabels[option.value] || option.textContent;
    });
  };
  const setReaderStatus = (message, { assertive = false } = {}) => {
    banner.textContent = message;
    banner.setAttribute('role', assertive ? 'alert' : 'status');
    banner.hidden = !message;
  };

  applyReaderChrome();

  function normalizeRepoPath(value) {
    const output = [];
    for (const segment of String(value).replace(/\\/g, '/').split('/')) {
      if (!segment || segment === '.') continue;
      if (segment === '..') output.pop();
      else output.push(segment);
    }
    return output.join('/');
  }

  function escapeText(value) {
    return String(value).replace(/\s+$/, '');
  }

  function stripQueryAndHash(value) {
    return String(value).split('#', 1)[0].split('?', 1)[0];
  }

  function splitDestination(value) {
    const match = String(value).match(/^\s*(\S+?)(?:\s+["']([^"']*)["'])?\s*$/);
    return { target: match?.[1] || '', title: match?.[2] || '' };
  }

  function sourceDirectory(path) {
    const parts = path.split('/');
    parts.pop();
    return parts.join('/');
  }

  function resolveSourcePath(path, target) {
    if (!target || target.startsWith('#') || /^(?:https?:|mailto:|data:|javascript:)/i.test(target)) return null;
    const raw = stripQueryAndHash(target).replace(/^\//, '');
    return normalizeRepoPath(`${sourceDirectory(path)}/${raw}`);
  }

  function hashFrom(value) {
    const marker = String(value).indexOf('#');
    return marker === -1 ? '' : String(value).slice(marker);
  }

  function readerHref(path, hash = '', locale = activeLocale) {
    const localeQuery = validLocales.includes(locale) ? `&lang=${encodeURIComponent(locale)}` : '';
    return `reader.html?path=${encodeURIComponent(path)}${localeQuery}${hash}`;
  }

function chapterTitle(chapter) {
    return uiLanguage() === 'zh' ? chapter.title_zh : chapter.title_en;
}

function canonicalChapterTitle(chapter) {
    return uiLanguage() === 'zh' ? chapter.canonical_title_zh : chapter.canonical_title_en;
}

  function chapterPath(chapter) {
    const record = manifest.contents?.[chapter.content_id];
    const requested = record?.locales?.[activeLocale];
    if (ready(requested)) return requested.path;
    const english = record?.locales?.en;
    if (ready(english)) return english.path;
    return chapter.legacy_path || chapter.english_path;
  }

  function chapterLink(chapter) {
    return readerHref(chapterPath(chapter), '', activeLocale);
  }

  function chapterForSelection(selection) {
    return bookNavigation.chapters.find((chapter) => chapter.content_id === selection.contentId) || null;
  }

  function labForSelection(selection) {
    return labNavigation.labs.find((lab) => lab.content_id === selection.contentId) || null;
  }

  function labPath(lab) {
    const record = manifest.contents?.[lab.content_id];
    const requested = record?.locales?.[activeLocale];
    if (ready(requested)) return requested.path;
    const english = record?.locales?.en;
    return ready(english) ? english.path : lab.path;
  }

  function labProgressLabel(lab) {
    if (uiLanguage() === 'zh') return `实验 ${String(lab.number).padStart(3, '0')} / 共 ${labNavigation.labs.length} 个 · 按编号浏览，不代表先修顺序`;
    return `Lab ${String(lab.number).padStart(3, '0')} of ${labNavigation.labs.length} · Catalog order, not a prerequisite chain`;
  }

  function partForChapter(chapter) {
    return bookNavigation.parts.find((part) => part.id === chapter?.part) || null;
  }

  function chapterProgressLabel(chapter, index) {
    const part = partForChapter(chapter);
    const partLabel = uiLanguage() === 'zh' ? part?.title_zh : part?.title_en;
    if (uiLanguage() === 'zh') return `第 ${chapter.number} 章 / 共 ${bookNavigation.chapters.length} 章 · ${part?.number || ''} ${partLabel || ''}`.trim();
    return `Chapter ${chapter.number} of ${bookNavigation.chapters.length} · Part ${part?.number || ''} · ${partLabel || ''}`.trim();
  }

  function renderBookNavigation(selection) {
    if (!pagination) return;
    const current = chapterForSelection(selection);
    const currentLab = labForSelection(selection);
    if (!current && !currentLab) {
      if (bookNav) bookNav.hidden = true;
      pagination.hidden = true;
      if (orientation) orientation.hidden = true;
      return;
    }
    if (currentLab) {
      const index = labNavigation.labs.indexOf(currentLab);
      const previous = labNavigation.labs[index - 1];
      const next = labNavigation.labs[index + 1];
      const strings = currentReaderCopy();
      if (bookNav) bookNav.hidden = true;
      if (orientation) {
        orientation.hidden = false;
        if (orientationSummary) orientationSummary.textContent = strings.labSequence;
        if (mobileProgress) mobileProgress.textContent = labProgressLabel(currentLab);
        orientation.querySelector('nav')?.setAttribute('aria-label', strings.labNavigationAria);
      }
      const updateLabLink = (link, lab, direction) => {
        if (!link) return;
        if (!lab) { link.hidden = true; link.href = '#'; link.textContent = ''; return; }
        link.hidden = false;
        link.href = readerHref(labPath(lab), '', activeLocale);
        link.textContent = `${direction === 'previous' ? '←' : '→'} Lab ${String(lab.number).padStart(3, '0')} · ${lab.title}`;
        link.setAttribute('aria-label', direction === 'previous' ? strings.previousLab : strings.nextLab);
      };
      updateLabLink(mobilePrevious, previous, 'previous');
      updateLabLink(mobileNext, next, 'next');
      const updateLabPagination = (link, titleNode, lab, direction) => {
        if (!lab) { link.hidden = true; return; }
        link.hidden = false;
        link.href = readerHref(labPath(lab), '', activeLocale);
        link.querySelector('.reader-pagination-kicker').textContent = direction === 'previous' ? strings.previousLab : strings.nextLab;
        titleNode.textContent = `Lab ${String(lab.number).padStart(3, '0')} · ${lab.title}`;
      };
      updateLabPagination(previousLink, previousTitle, previous, 'previous');
      updateLabPagination(nextLink, nextTitle, next, 'next');
      pagination.setAttribute('aria-label', strings.labNavigationAria);
      pagination.hidden = !previous && !next;
      return;
    }
    if (!bookNav || !bookProgress || !chapterList) {
      pagination.hidden = true;
      if (orientation) orientation.hidden = true;
      return;
    }
    if (orientationSummary) orientationSummary.textContent = currentReaderCopy().bookChapters;
    orientation?.querySelector('nav')?.setAttribute('aria-label', currentReaderCopy().chapterNavigationAria);
    pagination.setAttribute('aria-label', currentReaderCopy().chapterNavigationAria);
    const index = bookNavigation.chapters.indexOf(current);
    const part = partForChapter(current);
    const partChapters = bookNavigation.chapters.filter((chapter) => chapter.part === current.part);
    bookProgress.textContent = chapterProgressLabel(current, index);
    chapterList.replaceChildren();
    partChapters.forEach((chapter) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = chapterLink(chapter);
      link.textContent = `${chapter.number}. ${chapterTitle(chapter)}`;
      if (chapter.content_id === current.content_id) {
        link.setAttribute('aria-current', 'page');
        link.className = 'is-current';
      }
      item.append(link);
      chapterList.append(item);
    });
    bookNav.hidden = false;
    if (orientation) {
      if (mobileProgress) mobileProgress.textContent = `${part?.number || ''} · ${chapterProgressLabel(current, index)}`;
      orientation.hidden = false;
    }
    const previous = bookNavigation.chapters[index - 1];
    const next = bookNavigation.chapters[index + 1];
    const updateMobileLink = (link, chapter, direction) => {
      if (!link) return;
      if (!chapter) {
        link.hidden = true;
        link.href = '#';
        link.textContent = '';
        return;
      }
      link.hidden = false;
      link.href = readerHref(chapterPath(chapter), '', activeLocale);
      link.textContent = `${direction === 'previous' ? '←' : '→'} ${canonicalChapterTitle(chapter)}`;
    };
    updateMobileLink(mobilePrevious, previous, 'previous');
    updateMobileLink(mobileNext, next, 'next');
    const updatePaginationLink = (link, titleNode, chapter) => {
      if (!chapter) { link.hidden = true; return; }
      link.hidden = false;
      link.href = chapterLink(chapter);
      titleNode.textContent = `${chapter.number}. ${chapterTitle(chapter)}`;
    };
    updatePaginationLink(previousLink, previousTitle, previous);
    updatePaginationLink(nextLink, nextTitle, next);
    pagination.hidden = !previous && !next;
  }

  function restoreHashPosition() {
    const rawHash = window.location.hash.slice(1);
    if (!rawHash) return;
    const target = document.getElementById(decodeURIComponent(rawHash));
    if (target) window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }

  function headingHref(id) {
    return `#${encodeURIComponent(id)}`;
  }

  function directHref(path) {
    return `../${path}`;
  }

  function isExternal(value) {
    return /^(?:https?:|mailto:)/i.test(value);
  }

  function isExternalImage(value) {
    return /^https?:/i.test(value);
  }

  function isSafeDestination(value, path, { image = false } = {}) {
    const target = String(value || '').trim();
    if (!target) return false;
    if (target.startsWith('#')) return !image;
    if (resolveSourcePath(path, target)) return true;
    return image ? isExternalImage(target) : isExternal(target);
  }

  function appendInline(parent, value, path) {
    const pattern = /(<mark\b[^>]*>.*?<\/mark>|!?\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\)|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|<https?:\/\/[^>]+>|https?:\/\/[^\s<]+)/gi;
    let cursor = 0;
    for (const match of String(value).matchAll(pattern)) {
      if (match.index > cursor) parent.append(document.createTextNode(value.slice(cursor, match.index)));
      const token = match[0];
      const highlight = token.match(/^<mark\b([^>]*)>(.*?)<\/mark>$/i);
      const image = token.match(/^!\[([^\]]*)\]\((.*)\)$/);
      const link = token.match(/^\[([^\]]+)\]\((.*)\)$/);
      if (highlight) {
        const element = document.createElement('mark');
        const variant = highlight[1].match(/\bhighlight-(lime|yellow|pink|cyan|orange)\b/i)?.[1]?.toLowerCase() || 'lime';
        element.className = `highlight-text highlight-${variant}`;
        element.textContent = highlight[2];
        parent.append(element);
      } else if (image || link) {
        const label = image ? image[1] : link[1];
        const destination = splitDestination(image ? image[2] : link[2]);
        const resolved = resolveSourcePath(path, destination.target);
        const hash = hashFrom(destination.target);
        if (image) {
          const element = document.createElement('img');
          element.alt = label;
          element.loading = 'lazy';
          if (resolved && !isExternal(destination.target)) element.src = directHref(resolved);
          else if (isExternalImage(destination.target)) element.src = destination.target;
          else element.alt = `${label} (image unavailable)`;
          if (destination.title) element.title = destination.title;
          parent.append(element);
        } else {
          const element = document.createElement('a');
          element.textContent = label;
          element.title = destination.title;
          if (destination.target.startsWith('#')) element.href = destination.target;
          else if (resolved && resolved.endsWith('.md')) element.href = readerHref(resolved, hash);
          else if (resolved && !isExternal(destination.target)) element.href = directHref(resolved) + hash;
          else if (isSafeDestination(destination.target, path)) element.href = destination.target;
          if (isExternal(destination.target)) { element.target = '_blank'; element.rel = 'noreferrer'; }
          parent.append(element);
        }
      } else if (token.startsWith('`')) {
        const element = document.createElement('code');
        element.textContent = token.slice(1, -1);
        parent.append(element);
      } else if (token.startsWith('**') || token.startsWith('__')) {
        const element = document.createElement('strong');
        element.textContent = token.slice(2, -2);
        parent.append(element);
      } else if (token.startsWith('*') || token.startsWith('_')) {
        const element = document.createElement('em');
        element.textContent = token.slice(1, -1);
        parent.append(element);
      } else {
        const element = document.createElement('a');
        const target = token.replace(/^<|>$/g, '');
        element.href = target;
        element.textContent = target;
        element.target = '_blank';
        element.rel = 'noreferrer';
        parent.append(element);
      }
      cursor = match.index + token.length;
    }
    if (cursor < String(value).length) parent.append(document.createTextNode(String(value).slice(cursor)));
  }

  function addInline(parent, value, path) {
    appendInline(parent, escapeText(value), path);
  }

  function slug(value, used) {
    const base = String(value).toLowerCase().replace(/[`*_~]/g, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section';
    const count = (used.get(base) || 0) + 1;
    used.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  }

  function splitTableRow(line) {
    let value = line.trim();
    if (value.startsWith('|')) value = value.slice(1);
    if (value.endsWith('|')) value = value.slice(0, -1);
    return value.split('|').map((cell) => cell.trim());
  }

  function isTableSeparator(line) {
    return splitTableRow(line).length > 0 && splitTableRow(line).every((cell) => /^:?-{3,}:?$/.test(cell));
  }

  function isSpecial(line, next) {
    return /^#{1,6}\s+/.test(line) || /^```|^~~~/.test(line) || /^>\s?/.test(line) || /^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line) || /^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line) || (line.includes('|') && isTableSeparator(next || '')) || /^<(?:div|table|details|summary|figure|section|nav|hr|p|h[1-6]|ul|ol|dl|img)\b/i.test(line);
  }

  function sanitizeHtml(raw, path) {
    const parsed = new DOMParser().parseFromString(`<body>${raw}</body>`, 'text/html');
    const allowed = new Set(['a', 'br', 'code', 'details', 'dd', 'div', 'dl', 'dt', 'em', 'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'img', 'li', 'mark', 'nav', 'ol', 'p', 'pre', 'section', 'small', 'span', 'strong', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul']);
    const allowedAttributes = new Set(['align', 'alt', 'aria-label', 'class', 'data-chapter-nav', 'href', 'id', 'loading', 'rel', 'src', 'target', 'title', 'width']);
    const clean = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.COMMENT_NODE) { child.remove(); return; }
        if (child.nodeType !== Node.ELEMENT_NODE) return;
        if (!allowed.has(child.tagName.toLowerCase())) { child.replaceWith(...child.childNodes); return; }
        [...child.attributes].forEach((attribute) => {
          if (!allowedAttributes.has(attribute.name.toLowerCase())) child.removeAttribute(attribute.name);
        });
        if (child.hasAttribute('href')) {
          const href = child.getAttribute('href') || '';
          const resolved = href.startsWith('#') ? null : resolveSourcePath(path, href);
          if (href.startsWith('#')) child.setAttribute('href', href);
          else if (resolved && resolved.endsWith('.md')) child.setAttribute('href', readerHref(resolved, hashFrom(href)));
          else if (resolved) child.setAttribute('href', directHref(resolved) + hashFrom(href));
          else if (!isExternal(href)) child.removeAttribute('href');
          else { child.setAttribute('target', '_blank'); child.setAttribute('rel', 'noreferrer'); }
        }
        if (child.hasAttribute('src')) {
          const src = child.getAttribute('src') || '';
          const resolved = resolveSourcePath(path, src);
          if (resolved && !isExternal(src)) child.setAttribute('src', directHref(resolved));
          else if (!isExternalImage(src)) child.removeAttribute('src');
        }
        clean(child);
      });
    };
    clean(parsed.body);
    return [...parsed.body.childNodes];
  }

  function renderBlocks(text, path) {
    const fragment = document.createDocumentFragment();
    const lines = String(text).replace(/^\uFEFF/, '').split(/\r?\n/);
    let index = 0;
    let frontMatter = false;
    let frontMatterSeen = false;
    const usedSlugs = new Map();
    const usedIds = new Set();
    const uniqueHeadingId = (value) => {
      let id = slug(value, usedSlugs);
      while (usedIds.has(id)) id = slug(value, usedSlugs);
      usedIds.add(id);
      return id;
    };
    const addParagraph = (items) => {
      const content = items.join('\n').replace(/\n/g, ' ');
      if (!content.trim()) return;
      const paragraph = document.createElement('p');
      addInline(paragraph, content, path);
      fragment.append(paragraph);
    };
    while (index < lines.length) {
      const line = lines[index];
      const h1BeforeFrontMatter = fragment.childNodes.length === 1 && fragment.firstChild?.tagName === 'H1';
      if (!frontMatterSeen && line.trim() === '---' && (fragment.childNodes.length === 0 || h1BeforeFrontMatter)) {
        frontMatter = true;
        frontMatterSeen = true;
        index += 1;
        continue;
      }
      if (frontMatter) { if (line.trim() === '---') frontMatter = false; index += 1; continue; }
      if (!line.trim()) { index += 1; continue; }
      const navigationStart = line.trim().match(/^<!--\s*(chapter|lab)-navigation:start\s*-->$/i);
      if (navigationStart) {
        const navigationKind = navigationStart[1];
        index += 1;
        while (index < lines.length && !new RegExp(`^<!--\\s*${navigationKind}-navigation:end\\s*-->$`, 'i').test(lines[index].trim())) {
          index += 1;
        }
        if (index < lines.length) index += 1;
        continue;
      }
      if (/^<!--/.test(line.trim())) { index += 1; continue; }
      const emptyAnchor = line.trim().match(/^<(?:a|span)\s+id="([a-z][a-z0-9-]*)"\s*><\/(?:a|span)>$/i);
      if (emptyAnchor) {
        const id = emptyAnchor[1];
        if (!usedIds.has(id)) {
          const anchor = document.createElement('span');
          anchor.id = id;
          anchor.className = 'reader-anchor';
          anchor.setAttribute('aria-hidden', 'true');
          fragment.append(anchor);
          usedIds.add(id);
        }
        index += 1;
        continue;
      }
      if (/^```|^~~~/.test(line)) {
        const fence = line.trim().slice(0, 3);
        const language = line.trim().slice(3).trim();
        index += 1;
        const code = [];
        while (index < lines.length && !lines[index].trim().startsWith(fence)) { code.push(lines[index]); index += 1; }
        index += 1;
        const pre = document.createElement('pre');
        const codeNode = document.createElement('code');
        if (language) codeNode.className = `language-${language}`;
        codeNode.textContent = code.join('\n');
        pre.append(codeNode);
        fragment.append(pre);
        continue;
      }
      if (/^<(?:div|table|details|summary|figure|section|nav|hr|p|h[1-6]|ul|ol|dl|img)\b/i.test(line.trim())) {
        const raw = [];
        let depth = 0;
        do {
          raw.push(lines[index]);
          const opens = (lines[index].match(/<(div|table|details|figure|section|nav|ul|ol|dl)\b/gi) || []).length;
          const closes = (lines[index].match(/<\/(div|table|details|figure|section|nav|ul|ol|dl)>/gi) || []).length;
          depth += opens - closes;
          index += 1;
        } while (index < lines.length && depth > 0);
        sanitizeHtml(raw.join('\n'), path).forEach((node) => fragment.append(node));
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
      if (heading) {
        const element = document.createElement(`h${heading[1].length}`);
        addInline(element, heading[2], path);
        element.id = uniqueHeadingId(heading[2]);
        fragment.append(element);
        index += 1;
        continue;
      }
      if (line.includes('|') && isTableSeparator(lines[index + 1] || '')) {
        const header = splitTableRow(line);
        index += 2;
        const rows = [];
        while (index < lines.length && lines[index].trim() && lines[index].includes('|')) { rows.push(splitTableRow(lines[index])); index += 1; }
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        header.forEach((cell) => { const th = document.createElement('th'); addInline(th, cell, path); headerRow.append(th); });
        thead.append(headerRow); table.append(thead);
        const tbody = document.createElement('tbody');
        rows.forEach((row) => { const tr = document.createElement('tr'); header.forEach((_, cellIndex) => { const td = document.createElement('td'); addInline(td, row[cellIndex] || '', path); tr.append(td); }); tbody.append(tr); });
        table.append(tbody);
        const tableWrap = document.createElement('div');
        tableWrap.className = 'reader-table-wrap';
        tableWrap.append(table);
        fragment.append(tableWrap);
        continue;
      }
      if (/^>\s?/.test(line)) {
        const quote = [];
        while (index < lines.length && /^>\s?/.test(lines[index])) { quote.push(lines[index].replace(/^>\s?/, '')); index += 1; }
        const blockquote = document.createElement('blockquote');
        blockquote.append(renderBlocks(quote.join('\n'), path));
        fragment.append(blockquote);
        continue;
      }
      if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
        const ordered = /^\s*\d+[.)]\s+/.test(line);
        const markerPattern = ordered ? /^(\s*)\d+[.)]\s+(.+)$/ : /^(\s*)[-*+]\s+(.+)$/;
        const firstMatch = line.match(markerPattern);
        const baseIndent = firstMatch?.[1].length || 0;
        const list = document.createElement(ordered ? 'ol' : 'ul');
        while (index < lines.length) {
          const match = lines[index].match(markerPattern);
          if (!match || match[1].length !== baseIndent) break;
          const itemLines = [match[2]];
          index += 1;
          while (index < lines.length && lines[index].trim()) {
            const nextLine = lines[index];
            const nextItem = nextLine.match(markerPattern);
            if (nextItem && nextItem[1].length <= baseIndent) break;
            if (isSpecial(nextLine, lines[index + 1]) && !/^\s{2,}\S/.test(nextLine)) break;
            itemLines.push(nextLine.trim());
            index += 1;
          }
          const item = document.createElement('li');
          addInline(item, itemLines.join(' '), path);
          list.append(item);
        }
        fragment.append(list);
        continue;
      }
      if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line)) { fragment.append(document.createElement('hr')); index += 1; continue; }
      const paragraph = [line];
      index += 1;
      while (index < lines.length && lines[index].trim() && !isSpecial(lines[index], lines[index + 1])) { paragraph.push(lines[index]); index += 1; }
      addParagraph(paragraph);
    }
    return fragment;
  }

  function addPromptCopyControls(path) {
    if (path !== 'book/communication-clinic-EN.md') return;
    article.querySelectorAll('pre').forEach((pre) => {
      const code = pre.querySelector(':scope > code');
      if (!code || !code.textContent.trim()) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'reader-prompt-block';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'reader-copy-prompt';
      button.textContent = currentReaderCopy().copyPrompt;
      const status = document.createElement('span');
      status.className = 'reader-copy-status';
      status.setAttribute('aria-live', 'polite');
      pre.before(wrapper);
      wrapper.append(button, pre, status);
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.textContent);
          status.textContent = currentReaderCopy().copiedPrompt;
        } catch (_) {
          status.textContent = currentReaderCopy().copyFailed;
        }
      });
    });
  }

  function contentRecord(path) {
    const contentId = manifest.path_index?.[path] || null;
    return { contentId, content: contentId ? manifest.contents?.[contentId] : null };
  }

  function chapterAliasFor(contentId) {
    return Object.entries(manifest.aliases || {})
      .find(([alias, target]) => target === contentId && /^chapter-\d+$/.test(alias))?.[0] || null;
  }

  function chapterStatusFor(selection) {
    const record = selection.contentId ? manifest.contents?.[selection.contentId] : null;
    const localeRecord = record?.locales?.[selection.requested] || record?.locales?.[selection.effective];
    const status = localeRecord?.content_status || 'unindexed source';
    if (selection.fallback && selection.requested !== selection.effective) {
      return `${status} · ${locales[selection.effective]?.display_name || selection.effective} source shown`;
    }
    return status;
  }

  function buildTableOfContents() {
    if (!toc || !tocList) return;
    const headings = [...article.querySelectorAll('h2, h3')].filter((heading) => heading.textContent.trim());
    tocList.replaceChildren();
    headings.forEach((heading) => {
      if (!heading.id) return;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = headingHref(heading.id);
      link.dataset.level = heading.tagName === 'H3' ? '3' : '2';
      link.textContent = heading.textContent.trim();
      link.dataset.tocTarget = heading.id;
      item.append(link);
      tocList.append(item);
    });
    toc.hidden = tocList.children.length === 0;
    if (mobilePageToc && mobilePageTocList) {
      mobilePageTocList.replaceChildren(...[...tocList.querySelectorAll('li')].map((item) => item.cloneNode(true)));
      mobilePageToc.hidden = mobilePageTocList.children.length === 0;
      mobilePageTocList.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        mobilePageToc.open = false;
        window.requestAnimationFrame(() => {
          if (!target) return;
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: 'start' });
        });
      }));
    }
    observeHeadings(headings);
  }

  function observeHeadings(headings) {
    if (!('IntersectionObserver' in window) || !tocList) return;
    const links = [...tocList.querySelectorAll('a[data-toc-target]'), ...document.querySelectorAll('[data-reader-mobile-page-toc-list] a[data-toc-target]')];
    const setCurrent = (id) => links.forEach((link) => {
      const current = link.dataset.tocTarget === id;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setCurrent(visible[0].target.id);
    }, { rootMargin: '-86px 0px -68% 0px', threshold: [0, 1] });
    headings.forEach((heading) => observer.observe(heading));
  }

  function updateChapterRail(selection, title) {
    if (!chapterCard || !chapterLabel || !chapterStatus) return;
    const alias = chapterAliasFor(selection.contentId);
    if (!alias) {
      const lab = labForSelection(selection);
      if (!lab) {
        const strings = currentReaderCopy();
        const labels = {
          skill: strings.skillMethod,
          'field-note': strings.fieldNote,
          'project-document': strings.projectDocument
        };
        chapterLabel.textContent = labels[selection.readerType] || strings.projectDocument;
        chapterStatus.textContent = title;
        chapterCard.hidden = false;
        return;
      }
      chapterLabel.textContent = `Lab ${String(lab.number).padStart(3, '0')} · ${lab.title}`;
      chapterStatus.textContent = `${chapterStatusFor(selection)} · ${uiLanguage() === 'zh' ? '编号仅用于目录浏览' : 'catalog order only'}`;
      chapterCard.hidden = false;
      return;
    }
    const number = alias.slice('chapter-'.length);
    const current = chapterForSelection(selection);
    const label = current ? chapterTitle(current) : title;
    chapterLabel.textContent = uiLanguage() === 'zh' ? `第 ${number} 章 · ${label}` : `Chapter ${number} · ${label}`;
    chapterStatus.textContent = chapterStatusFor(selection);
    chapterCard.hidden = false;
  }

  function ready(record) {
    return Boolean(record?.exists && ['source', 'verified', 'production-ready'].includes(record.translation_status));
  }

  function choosePath(path, locale) {
    const record = contentRecord(path);
    const readerType = record.content?.reader_type || 'project-document';
    const overviewTarget = record.content?.overview_target || 'index.html';
    if (!record.content) return { path, contentId: null, readerType, overviewTarget, fallback: locale !== 'en', requested: locale, effective: 'en' };
    const requested = record.content.locales?.[locale];
    if (ready(requested)) return { path: requested.path, contentId: record.contentId, readerType, overviewTarget, fallback: false, requested: locale, effective: locale };
    const english = record.content.locales?.en;
    if (ready(english)) return { path: english.path, contentId: record.contentId, readerType, overviewTarget, fallback: locale !== 'en', requested: locale, effective: 'en' };
    const sourceLocale = record.content.source_locale || 'en';
    const legacyPath = record.content.legacy_paths?.[0];
    return {
      path: sourceLocale === 'zh' ? legacyPath || english?.path || path : english?.path || path,
      contentId: record.contentId,
      readerType,
      overviewTarget,
      fallback: sourceLocale !== locale,
      requested: locale,
      effective: sourceLocale,
    };
  }

  function updateOverviewLinks(selection) {
    const target = selection.overviewTarget || 'index.html';
    document.querySelectorAll('[data-reader-overview]').forEach((link) => {
      link.href = window.CODEX_PAGES_ARTIFACT ? `../${target}` : target;
    });
  }

  function showError(message) {
    article.replaceChildren();
    const box = document.createElement('div');
    box.className = 'reader-error';
    box.setAttribute('role', 'alert');
    box.textContent = message;
    article.append(box);
    article.setAttribute('aria-busy', 'false');
    setReaderStatus(message, { assertive: true });
  }

  async function loadTrustRecord(contentId) {
    try {
      const response = await fetch(directHref('docs/governance/page-trust-registry.yaml'));
      if (!response.ok) return { unavailable: true };
      const registry = await response.json();
      const records = [
        ...(Array.isArray(registry.records) ? registry.records : []),
        ...((registry.families || []).flatMap((family) => {
          if (!Array.isArray(family.records)) return [];
          const defaults = family.defaults && typeof family.defaults === 'object' ? family.defaults : {};
          return family.records.map((record) => ({
            ...defaults,
            ...(record.overrides && typeof record.overrides === 'object' ? record.overrides : {}),
            ...record,
          }));
        })),
      ];
      return records.find((record) => record.content_id === contentId) || null;
    } catch (_) {
      return { unavailable: true };
    }
  }

  function renderTrustRecord(record) {
    if (!trustCard || !trustScope || !trustReview || !trustLimitations) return;
    if (!record) {
      trustCard.hidden = true;
      return;
    }
    if (record.unavailable) {
      trustScope.textContent = currentReaderCopy().trustUnavailable;
      trustReview.removeAttribute('datetime');
      trustReview.textContent = '—';
      trustLimitations.textContent = currentReaderCopy().trustUnavailableDetail;
      trustCard.hidden = false;
      return;
    }
    trustScope.textContent = `${record.content_status} · ${record.curriculum_scope}`;
    trustReview.dateTime = record.next_review;
    trustReview.textContent = record.next_review;
    trustLimitations.textContent = record.known_limitations?.[0] || '';
    trustCard.hidden = false;
  }

  async function load() {
    if (!requestedPath || requestedPath.includes('..') || !/^(?:(?:README(?:-[A-Z]{2})?|AGENTS|CONTEXT)\.md|(?:book|docs|skills|assets|examples|evals|site)\/)/.test(requestedPath)) {
      showError(currentReaderCopy().invalidPath);
      return;
    }
    let locale = requestedLocale;
    if (!locale) { try { locale = localStorage.getItem(languageStorageKey); } catch (_) { locale = null; } }
    locale = validLocales.includes(locale) ? locale : manifest.default_locale || 'en';
    const selection = choosePath(requestedPath, locale);
    activeLocale = locale;
    applyReaderChrome();
    const response = await fetch(directHref(selection.path));
    if (!response.ok) { showError(currentReaderCopy().loadError(response.status)); return; }
    const source = await response.text();
    const chapter = chapterForSelection(selection);
    const lab = labForSelection(selection);
    article.replaceChildren();
    if (chapter) {
      const context = document.createElement('div');
      context.className = 'reader-article-context';
      context.textContent = chapterProgressLabel(chapter, bookNavigation.chapters.indexOf(chapter));
      article.append(context);
    } else if (lab) {
      const context = document.createElement('div');
      context.className = 'reader-article-context';
      context.textContent = labProgressLabel(lab);
      article.append(context);
    }
    article.append(renderBlocks(source, selection.path));
    article.querySelector('h1')?.after(mobilePageToc);
    addPromptCopyControls(selection.path);
    article.setAttribute('aria-busy', 'false');
    const title = chapter ? canonicalChapterTitle(chapter) : lab ? `Lab ${String(lab.number).padStart(3, '0')}: ${lab.title}` : article.querySelector('h1')?.textContent?.trim() || selection.path;
    buildTableOfContents();
    updateChapterRail(selection, title);
    updateOverviewLinks(selection);
    renderBookNavigation(selection);
    renderTrustRecord(await loadTrustRecord(selection.contentId));
    document.title = `${title} · Codex Field Guide`;
    document.querySelector('meta[name="description"]').setAttribute('content', `Read ${title} in the Codex Field Guide and its transferable collaboration method.`);
    const effectiveLocale = selection.effective || locale;
    document.documentElement.lang = locales[effectiveLocale]?.html_lang || effectiveLocale;
    article.lang = locales[effectiveLocale]?.html_lang || effectiveLocale;
    article.dataset.readerRequestedLocale = selection.requested;
    article.dataset.readerEffectiveLocale = effectiveLocale;
    article.dataset.readerFallback = selection.fallback ? 'true' : 'false';
    article.setAttribute('data-reader-requested-locale', selection.requested);
    article.setAttribute('data-reader-effective-locale', effectiveLocale);
    article.setAttribute('data-reader-fallback', selection.fallback ? 'true' : 'false');
    sourcePathNode.textContent = selection.path;
    contentIdNode.textContent = selection.contentId || 'unindexed source';
    sourceLink.href = directHref(selection.path);
    languageSelect.value = locale;
    if (selection.fallback) {
      const effectiveName = locales[effectiveLocale]?.display_name || effectiveLocale;
      setReaderStatus(effectiveLocale === 'en'
        ? currentReaderCopy().fallbackEnglish(locales[locale]?.display_name || locale)
        : currentReaderCopy().fallbackSource(locales[locale]?.display_name || locale, effectiveName));
    } else setReaderStatus('');
    restoreHashPosition();
    if (selection.contentId) {
      languageSelect.disabled = false;
      languageSelect.dataset.contentId = selection.contentId;
    }
  }

  languageSelect.addEventListener('change', () => {
    const locale = languageSelect.value;
    const current = contentRecord(requestedPath);
    const content = current.content;
    const requested = content?.locales?.[locale];
    const target = ready(requested) ? requested.path : content?.locales?.en?.path || requestedPath;
    window.location.href = readerHref(target, window.location.hash, locale);
  });

  load().catch((error) => showError(`The source page could not be rendered: ${error.message}`));
})();
