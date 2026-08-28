import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const evidence = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/evidence.json'), 'utf8'));
const programs = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/programs.json'), 'utf8')).programs;

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const labelType = artifact => ({ '학술논문': 'peer_reviewed', 'Peer-reviewed': 'peer_reviewed', '학술발표': 'conference', Conference: 'conference', '조사연구': 'investigator_study', 'Investigator study': 'investigator_study', 시제품: 'prototype', Prototype: 'prototype', 시뮬레이션: 'simulation', Simulation: 'simulation', 소프트웨어: 'software_artifact', Software: 'software_artifact' }[artifact?.legacy_field?.en] || artifact?.kind || 'unclassified');
const studies = [...evidence.studies].sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.study_id.localeCompare(b.study_id));
const programOptions = programs.map(program => `<option value="${escape(program.id)}">${escape(program.name.en)}</option>`).join('');
const card = (study, lang) => {
  const title = study.title?.[lang] || study.title?.en || study.study_id;
  const authors = study.authors?.sort((a, b) => a.order - b.order).map(author => author.display_name).join(', ') || 'Author information pending review';
  const types = [...new Set((study.artifacts || []).map(labelType))];
  const materials = [...new Set((study.artifacts || []).flatMap(artifact => artifact.url ? ['paper'] : []).concat((study.materials || []).map(material => material.kind).filter(Boolean)))];
  const programsAttr = (study.programs || []).join(',');
  const contributionsAttr = (study.contributions || []).join(',');
  const statusesAttr = study.status || '';
  const typeLabel = types.length ? types.join(' · ') : 'type pending review';
  const links = (study.artifacts || []).filter(artifact => artifact.url).map(artifact => `<a href="${escape(artifact.url)}" rel="noreferrer">${escape(artifact.kind || 'Material')}</a>`).join('');
  return `<article class="evidence-card" data-year="${escape(study.year || '')}" data-type="${escape(types.join(','))}" data-program="${escape(programsAttr)}" data-contribution="${escape(contributionsAttr)}" data-status="${escape(statusesAttr)}" data-material="${escape(materials.join(','))}">
    <div class="evidence-card-meta"><span>${escape(study.year || 'Year pending')}</span><span>${escape(typeLabel)}</span><span>${escape(study.status || 'status pending review')}</span></div>
    <h3>${escape(title)}</h3><p class="evidence-authors">${escape(authors)}</p>
    <p class="evidence-result">${escape(study.summary?.[lang] || 'Result summary pending source review')}</p>
    <p class="evidence-mapping">Program: ${programsAttr ? escape(programsAttr) : 'program mapping pending'} · Contribution: ${contributionsAttr ? escape(contributionsAttr) : 'contribution mapping pending'}</p>
    ${study.sample?.n || study.limitations?.[lang] ? `<div class="evidence-scope">${study.sample?.n ? `Sample: ${escape(study.sample.n)}` : ''}${study.limitations?.[lang] ? ` ${escape(study.limitations[lang])}` : ''}</div>` : ''}
    <div class="evidence-materials">${links || '<span>Materials not publicly available</span>'}</div>
  </article>`;
};

function page(lang) {
  const ko = lang === 'ko';
  const base = ko ? '../../' : '../';
  const title = ko ? '근거 라이브러리 — Optinex Research' : 'Evidence Library — Optinex Research';
  const text = ko ? {
    nav: ['홈', '연구', '근거', '회사', '문의'], h1: '근거 라이브러리', lead: '공개 가능한 연구 그룹과 자료를 출처, 상태, 프로그램별로 읽습니다. 결과 요약이 검토되지 않은 항목은 그 상태를 그대로 표시합니다.', count: `${studies.length}개 study group · ${evidence.counts.public_artifact_records}개 artifact`, search: '제목·저자·저널/학회 검색', all: '전체', result: '개 항목', legend: '검증 상태와 자료 공개 범례', pending: '검토 대기', contact: '누락 자료 제보 또는 협력 문의'
  } : {
    nav: ['Home', 'Research', 'Evidence', 'Company', 'Contact'], h1: 'Evidence Library', lead: 'Read public study groups and materials by source, status, and program. Items whose results have not been reviewed remain visibly marked.', count: `${studies.length} study groups · ${evidence.counts.public_artifact_records} artifacts`, search: 'Search title, author, journal/conference', all: 'All', result: 'items', legend: 'Verification status and material legend', pending: 'Review pending', contact: 'Report missing material or discuss collaboration'
  };
  const nav = ko ? ['../../ko/index.html', '../../ko/research/overview.html', 'index.html', '../../ko/team/index.html', '../../ko/contact.html'] : ['../index.html', '../research/overview.html', 'index.html', '../team/index.html', '../contact.html'];
  const filter = (id, label, options) => `<label class="evidence-filter"><span>${label}</span><select id="${id}"><option value="">${text.all}</option>${options}</select></label>`;
  const types = ['peer_reviewed', 'conference', 'investigator_study', 'prototype', 'simulation', 'software_artifact'].map(value => `<option value="${value}">${value}</option>`).join('');
  const statuses = ['verified', 'internally_validated', 'exploratory', 'hypothesis', 'archived'].map(value => `<option value="${value}">${value}</option>`).join('');
  const materials = ['paper', 'figure', 'code', 'data_dictionary', 'demo'].map(value => `<option value="${value}">${value}</option>`).join('');
  const years = [...new Set(studies.map(study => study.year).filter(Boolean))].sort((a, b) => b - a).map(year => `<option value="${year}">${year}</option>`).join('');
  const programSummary = programs.map(program => { const count = studies.filter(study => (study.programs || []).includes(program.id)).length; return `<div><strong>${escape(program.name[lang])}</strong><span>${count} mapped evidence cards · mapping pending review</span></div>`; }).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${title}</title><meta name="description" content="${escape(text.lead)}" /><link rel="canonical" href="https://myoung906.github.io/MasVisio_Research/${ko ? 'ko/' : ''}publications/index.html" /><link rel="alternate" hreflang="ko" href="https://myoung906.github.io/MasVisio_Research/ko/publications/index.html" /><link rel="alternate" hreflang="en" href="https://myoung906.github.io/MasVisio_Research/publications/index.html" /><link rel="stylesheet" href="${base}assets/css/main.css?v=6.1" /><link rel="stylesheet" href="${base}assets/css/components.css?v=6.1" /><link rel="stylesheet" href="${base}assets/css/responsive.css?v=6.1" /></head><body class="site-layout evidence-page"><a href="#main-content" class="skip-link">${ko ? '본문으로 건너뛰기' : 'Skip to main content'}</a><header class="site-header"><div class="site-header-inner"><a class="site-brand" href="${nav[0]}">Optinex Research</a><nav class="site-nav" aria-label="${ko ? '전역 탐색' : 'Global navigation'}">${nav.map((href, index) => `<a href="${href}"${index === 2 ? ' aria-current="page"' : ''}>${text.nav[index]}</a>`).join('')}</nav><div class="site-language" aria-label="Language selection"><a href="${ko ? '../../publications/index.html' : '../ko/publications/index.html'}" lang="${ko ? 'en' : 'ko'}">${ko ? 'EN' : 'KO'}</a><span aria-current="true">${ko ? 'KO' : 'EN'}</span></div></div></header><main class="main-content" id="main-content"><div class="evidence-wrap"><section class="evidence-intro"><p class="evidence-kicker">Evidence Library</p><h1>${text.h1}</h1><p class="evidence-lead">${text.lead}</p><p class="evidence-count">${text.count}</p></section><section class="evidence-program-summary" aria-label="Program summary">${programSummary}</section><section class="evidence-controls" aria-label="Evidence filters"><label class="evidence-search"><span>${text.search}</span><input id="evidence-search" type="search" autocomplete="off" /></label><div class="evidence-filter-grid">${filter('evidence-type', 'Type', types)}${filter('evidence-program', 'Program', programOptions)}${filter('evidence-contribution', 'Contribution', ['measure', 'model', 'augment', 'learn'].map(value => `<option value="${value}">${value}</option>`).join(''))}${filter('evidence-year', 'Year', years)}${filter('evidence-status', 'Status', statuses)}${filter('evidence-material', 'Material', materials)}</div><p id="evidence-result-count" class="evidence-result-count" aria-live="polite">${studies.length} ${text.result}</p></section><section id="evidence-list" class="evidence-list" aria-label="Evidence records">${studies.map(study => card(study, lang)).join('')}</section><section class="evidence-legend"><h2>${text.legend}</h2><p>${text.pending}: source, classification, or result review is not complete. Materials without a verified public URL are shown as plain text.</p><a class="text-link" href="${nav[4]}">${text.contact} →</a></section></div></main><footer class="site-footer"><div class="site-footer-inner"><p>Research-stage platform. No commercial medical product is currently available.</p><p><a href="${ko ? '../../ko/privacy.html' : '../privacy.html'}">${ko ? '개인정보처리방침' : 'Privacy Policy'}</a> · <a href="${nav[4]}">${ko ? '문의하기' : 'Contact'}</a></p></div></footer><script src="${base}assets/js/evidence.js" defer></script></body></html>`;
}

fs.writeFileSync(path.join(root, 'publications/index.html'), page('en').replace(/[ \t]+$/gm, ''));
fs.writeFileSync(path.join(root, 'ko/publications/index.html'), page('ko').replace(/[ \t]+$/gm, ''));
console.log(`Generated ${studies.length} evidence cards from canonical data.`);
