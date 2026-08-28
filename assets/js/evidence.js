(() => {
  const list = document.getElementById('evidence-list');
  if (!list) return;
  const cards = [...list.querySelectorAll('.evidence-card')];
  const fields = {
    search: document.getElementById('evidence-search'),
    type: document.getElementById('evidence-type'),
    program: document.getElementById('evidence-program'),
    contribution: document.getElementById('evidence-contribution'),
    year: document.getElementById('evidence-year'),
    status: document.getElementById('evidence-status'),
    material: document.getElementById('evidence-material')
  };
  const count = document.getElementById('evidence-result-count');
  const params = new URLSearchParams(window.location.search);
  Object.entries(fields).forEach(([key, field]) => { if (field && params.has(key)) field.value = params.get(key); });
  const includes = (value, expected) => !expected || value.split(',').includes(expected);
  const apply = () => {
    const query = fields.search.value.trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const haystack = card.textContent.toLocaleLowerCase();
      const matches = (!query || haystack.includes(query)) && includes(card.dataset.type, fields.type.value) && includes(card.dataset.program, fields.program.value) && includes(card.dataset.contribution, fields.contribution.value) && (!fields.year.value || card.dataset.year === fields.year.value) && includes(card.dataset.status, fields.status.value) && includes(card.dataset.material, fields.material.value);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    count.textContent = `${visible} ${document.documentElement.lang === 'ko' ? '개 항목' : 'items'}`;
    const next = new URLSearchParams();
    Object.entries(fields).forEach(([key, field]) => { if (field.value) next.set(key, field.value); });
    const queryString = next.toString();
    history.replaceState(null, '', `${window.location.pathname}${queryString ? `?${queryString}` : ''}`);
  };
  Object.values(fields).forEach(field => field.addEventListener('input', apply));
  Object.values(fields).forEach(field => field.addEventListener('change', apply));
  apply();
})();
