(() => {
  'use strict';

  const manifest = window.CODEX_LOCALE_MANIFEST || { default_locale: 'en', locales: {}, contents: {}, path_index: {} };
  const locales = manifest.locales || {};
  const validLocales = Object.keys(locales);
  const params = new URLSearchParams(window.location.search);
  const requestedLocale = validLocales.includes(params.get('lang')) ? params.get('lang') : null;
  const requestedPath = normalizeRepoPath(params.get('path') || '');
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
  const chapterCard = document.querySelector('[data-reader-chapter-card]');
  const chapterLabel = document.querySelector('[data-reader-chapter-label]');
  const chapterStatus = document.querySelector('[data-reader-chapter-status]');
  const readerCopy = {
    en: {
      skip: 'Skip to content', back: 'Back to overview', language: 'Language', languageAria: 'Choose reading language', detailsAria: 'Page details', onThisPageAria: 'On this page', onThisPage: 'On this page', readingRoute: 'Reading route', sourcePath: 'Source path', contentIdentity: 'Content identity', openSource: 'Open source file ↗', footer: 'Source remains Markdown; this page is a static reading view', loading: 'Loading the source page…',
      fallbackEnglish: (name) => `${name} is not available for this page yet. Showing the current English source.`, fallbackSource: (name, source) => `${name} is not available for this page yet. Showing the current ${source} source.`, invalidPath: 'This reader URL does not name an allowed project source file. Return to the overview and choose a page from the guide.', loadError: (status) => `The source page could not be loaded (${status}).`
    },
    zh: {
      skip: '跳到正文', back: '返回总览', language: '语言', languageAria: '选择阅读语言', detailsAria: '页面详情', onThisPageAria: '本页目录', onThisPage: '本页目录', readingRoute: '阅读路线', sourcePath: '源文件路径', contentIdentity: '内容身份', openSource: '打开源文件 ↗', footer: '源文件仍是 Markdown；此页面是静态阅读视图', loading: '正在加载源文件……',
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

  function headingHref(id) {
    return `#${encodeURIComponent(id)}`;
  }

  function directHref(path) {
    return `../${path}`;
  }

  function isExternal(value) {
    return /^(?:https?:|mailto:)/i.test(value);
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
          else if (isExternal(destination.target)) element.src = destination.target;
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
          else element.href = destination.target;
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
    const allowed = new Set(['a', 'br', 'code', 'details', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'img', 'li', 'mark', 'nav', 'ol', 'p', 'pre', 'section', 'small', 'span', 'strong', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul']);
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
          else if (!isExternal(src)) child.removeAttribute('src');
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
    const usedSlugs = new Map();
    const addParagraph = (items) => {
      const content = items.join('\n').replace(/\n/g, ' ');
      if (!content.trim()) return;
      const paragraph = document.createElement('p');
      addInline(paragraph, content, path);
      fragment.append(paragraph);
    };
    while (index < lines.length) {
      const line = lines[index];
      if (index === 0 && line.trim() === '---') { frontMatter = true; index += 1; continue; }
      if (frontMatter) { if (line.trim() === '---') frontMatter = false; index += 1; continue; }
      if (!line.trim()) { index += 1; continue; }
      if (/^<!--\s*chapter-navigation:start\s*-->$/i.test(line.trim())) {
        const raw = [];
        index += 1;
        while (index < lines.length && !/^<!--\s*chapter-navigation:end\s*-->$/i.test(lines[index].trim())) {
          raw.push(lines[index]);
          index += 1;
        }
        if (index < lines.length) index += 1;
        sanitizeHtml(raw.join('\n'), path).forEach((node) => fragment.append(node));
        continue;
      }
      if (/^<!--/.test(line.trim())) { index += 1; continue; }
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
          const opens = (lines[index].match(/<(div|table|details|section|nav|ul|ol)\b/gi) || []).length;
          const closes = (lines[index].match(/<\/(div|table|details|section|nav|ul|ol)>/gi) || []).length;
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
        element.id = slug(heading[2], usedSlugs);
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
        table.append(tbody); fragment.append(table);
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
        const list = document.createElement(ordered ? 'ol' : 'ul');
        while (index < lines.length) {
          const match = lines[index].match(ordered ? /^\s*\d+[.)]\s+(.+)$/ : /^\s*[-*+]\s+(.+)$/);
          if (!match) break;
          const item = document.createElement('li'); addInline(item, match[1], path); list.append(item); index += 1;
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
      item.append(link);
      tocList.append(item);
    });
    toc.hidden = tocList.children.length === 0;
  }

  function updateChapterRail(selection, title) {
    if (!chapterCard || !chapterLabel || !chapterStatus) return;
    const alias = chapterAliasFor(selection.contentId);
    if (!alias) {
      chapterCard.hidden = true;
      return;
    }
    const number = alias.slice('chapter-'.length);
    chapterLabel.textContent = `Chapter ${number} · ${title}`;
    chapterStatus.textContent = chapterStatusFor(selection);
    chapterCard.hidden = false;
  }

  function ready(record) {
    return Boolean(record?.exists && ['source', 'verified', 'production-ready'].includes(record.translation_status));
  }

  function choosePath(path, locale) {
    const record = contentRecord(path);
    if (!record.content) return { path, contentId: null, fallback: false, requested: locale, effective: locale };
    const requested = record.content.locales?.[locale];
    if (ready(requested)) return { path: requested.path, contentId: record.contentId, fallback: false, requested: locale, effective: locale };
    const english = record.content.locales?.en;
    if (ready(english)) return { path: english.path, contentId: record.contentId, fallback: locale !== 'en', requested: locale, effective: 'en' };
    const sourceLocale = record.content.source_locale || 'en';
    const legacyPath = record.content.legacy_paths?.[0];
    return {
      path: sourceLocale === 'zh' ? legacyPath || english?.path || path : english?.path || path,
      contentId: record.contentId,
      fallback: sourceLocale !== locale,
      requested: locale,
      effective: sourceLocale,
    };
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
    article.replaceChildren(renderBlocks(source, selection.path));
    article.setAttribute('aria-busy', 'false');
    const title = article.querySelector('h1')?.textContent?.trim() || selection.path;
    buildTableOfContents();
    updateChapterRail(selection, title);
    document.title = `${title} · Codex Field Guide`;
    document.querySelector('meta[name="description"]').setAttribute('content', `Read ${title} in the Codex Field Guide.`);
    const effectiveLocale = selection.effective || locale;
    document.documentElement.lang = locales[locale]?.html_lang || locale;
    article.lang = locales[effectiveLocale]?.html_lang || effectiveLocale;
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
    window.location.href = readerHref(target, '', locale);
  });

  load().catch((error) => showError(`The source page could not be rendered: ${error.message}`));
})();
