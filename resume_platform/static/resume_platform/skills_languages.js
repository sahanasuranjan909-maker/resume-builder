(function () {
  const start = () => {
    if (document.getElementById('skills-languages-enhancement')) return;

    const editor = document.querySelector('.editor') || document.querySelector('form') || document.querySelector('main');
    const resume = document.querySelector('.resume, #resume, [data-resume], .resume-preview, .resume-paper');
    if (!editor) return;

    const storageKey = 'resumeforge-skills-languages';
    const suggestions = ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'React', 'SQL', 'Git', 'GitHub', 'Figma', 'Excel', 'Communication', 'Problem solving', 'Teamwork'];
    let state = { skills: [], languages: [{ name: '', level: 'Proficient' }, { name: '', level: 'Intermediate' }, { name: '', level: 'Beginner' }] };

    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved) state = { ...state, ...saved };
    } catch (_) {}

    const panel = document.createElement('section');
    panel.id = 'skills-languages-enhancement';
    panel.className = 'editor-section skills-languages-panel';
    panel.innerHTML = `
      <div class="skills-languages-heading"><div><p class="eyebrow">SKILLS & LANGUAGES</p><h2>Show your strengths clearly</h2></div><span class="skills-save-state">Saved locally</span></div>
      <div class="skill-builder">
        <label for="extra-skill-input">Add a skill</label>
        <div class="skill-input-row"><input id="extra-skill-input" type="text" placeholder="Example: Django"><button type="button" id="add-extra-skill">Add skill</button></div>
        <p class="skill-suggestion-label">Suggested skills</p>
        <div class="skill-suggestions" id="skill-suggestions"></div>
        <ul class="selected-skill-list" id="selected-skill-list"></ul>
      </div>
      <div class="language-builder">
        <div><p class="eyebrow">LANGUAGES</p><h3>Add up to three languages</h3></div>
        <p class="language-help">Choose a language and its proficiency level.</p>
        <div id="language-fields" class="language-fields"></div>
      </div>`;
    editor.append(panel);

    const preview = document.createElement('section');
    preview.className = 'resume-section imported-skills-languages';
    preview.id = 'resume-skills-languages';
    preview.innerHTML = '<h2 class="resume-section-title">Skills</h2><ul class="resume-imported-bullets" id="resume-skill-bullets"></ul><div id="resume-language-block"></div>';
    if (resume) resume.append(preview);

    const persist = () => {
      localStorage.setItem(storageKey, JSON.stringify(state));
      const save = panel.querySelector('.skills-save-state');
      save.textContent = 'Saved locally';
    };
    const render = () => {
      const suggestionBox = panel.querySelector('#skill-suggestions');
      suggestionBox.replaceChildren();
      suggestions.filter(skill => !state.skills.some(item => item.toLowerCase() === skill.toLowerCase())).forEach(skill => {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'skill-suggestion'; button.textContent = '+ ' + skill;
        button.addEventListener('click', () => { state.skills.push(skill); persist(); render(); });
        suggestionBox.append(button);
      });
      const list = panel.querySelector('#selected-skill-list');
      const previewSkills = preview.querySelector('#resume-skill-bullets');
      list.replaceChildren(); previewSkills.replaceChildren();
      state.skills.forEach((skill, index) => {
        const item = document.createElement('li');
        item.textContent = skill;
        const remove = document.createElement('button');
        remove.type = 'button'; remove.className = 'remove-skill'; remove.setAttribute('aria-label', 'Remove ' + skill); remove.textContent = '×';
        remove.addEventListener('click', () => { state.skills.splice(index, 1); persist(); render(); });
        item.append(remove); list.append(item);
        const bullet = document.createElement('li'); bullet.textContent = skill; previewSkills.append(bullet);
      });
      preview.querySelector('h2').textContent = state.skills.length ? 'Skills' : '';

      const fields = panel.querySelector('#language-fields'); fields.replaceChildren();
      state.languages.forEach((language, index) => {
        const row = document.createElement('div'); row.className = 'language-row';
        const name = document.createElement('input'); name.type = 'text'; name.placeholder = 'Language ' + (index + 1); name.value = language.name;
        const level = document.createElement('select');
        ['Expert / Proficient', 'Intermediate', 'Beginner'].forEach(option => { const choice = document.createElement('option'); choice.value = option; choice.textContent = option; if (language.level === option || (language.level === 'Proficient' && option === 'Expert / Proficient')) choice.selected = true; level.append(choice); });
        const update = () => { state.languages[index] = { name: name.value.trim(), level: level.value }; persist(); renderPreviewLanguages(); };
        name.addEventListener('input', update); level.addEventListener('change', update);
        row.append(name, level); fields.append(row);
      });
      renderPreviewLanguages();
    };
    const renderPreviewLanguages = () => {
      const block = preview.querySelector('#resume-language-block'); block.replaceChildren();
      const filled = state.languages.filter(language => language.name);
      if (!filled.length) return;
      const title = document.createElement('h2'); title.className = 'resume-section-title'; title.textContent = 'Languages';
      const list = document.createElement('ul'); list.className = 'resume-imported-bullets';
      filled.forEach(language => { const item = document.createElement('li'); item.textContent = language.name + ' — ' + language.level; list.append(item); });
      block.append(title, list);
    };
    const addSkill = () => {
      const input = panel.querySelector('#extra-skill-input');
      const skill = input.value.trim();
      if (skill && !state.skills.some(item => item.toLowerCase() === skill.toLowerCase())) { state.skills.push(skill); input.value = ''; persist(); render(); }
    };
    panel.querySelector('#add-extra-skill').addEventListener('click', addSkill);
    panel.querySelector('#extra-skill-input').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); addSkill(); } });
    render();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
