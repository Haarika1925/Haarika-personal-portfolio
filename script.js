document.addEventListener('DOMContentLoaded', () => {
  const data = portfolioData;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  $$('[data-personal]').forEach((element) => { element.textContent = data.personal[element.dataset.personal] || ''; });
  $('#photo-upload').addEventListener('change', (event) => { const file = event.target.files[0]; if (!file) return; const image = $('.profile-frame img'); image.src = URL.createObjectURL(file); image.style.display = 'block'; });
  const interests = [
    ['✦', 'Artificial Intelligence', 'Exploring intelligent systems and their possibilities.'],
    ['⌁', 'Machine Learning', 'Learning how data can shape useful solutions.'],
    ['↗', 'Web Development', 'Creating clear, responsive digital experiences.'],
    ['▦', 'Application Development', 'Building technology that feels practical and human.'],
    ['∞', 'Continuous Learning', 'Staying curious and learning new technologies.']
  ];
  $('#interest-grid').innerHTML = interests.map(([icon, title, description]) => `<article class="interest-card"><div class="interest-icon">${icon}</div><h3>${title}</h3><p>${description}</p></article>`).join('');
  $('#skills-grid').innerHTML = data.skills.map((skill) => `<article class="skill-card reveal"><div class="skill-icon">${skill.icon}</div><h3>${skill.name}</h3><p>${skill.description}</p><span class="skill-type">${skill.category}</span></article>`).join('');

    const projectMarkup = (project, index) => `<article class="project-card reveal" data-status="${project.status || 'Project'}"><div class="project-visual" ${project.image ? `style="background-image:url('${project.image}');background-size:cover"` : ''}></div><div class="project-body"><div class="project-meta"><span>${project.status || 'Project'}</span><span>0${index + 1}</span></div><h3>${project.title}</h3><p>${project.description}</p><div class="tag-list">${project.technologies.map((technology) => `<span class="tag">${technology}</span>`).join('')}</div><div class="card-actions"><button type="button" class="details-link" data-project="${index}">Details ↗</button>${project.github ? `<a href="${project.github}" target="_blank" rel="noreferrer">GitHub ↗</a>` : ''}</div></div></article>`;
  const renderProjects = (filter = 'all') => { $('#projects-grid').innerHTML = data.projects.filter((project) => filter === 'all' || project.status === filter).map(projectMarkup).join(''); bindProjectDetails(); observeReveals(); };
  $$('.filter-btn').forEach((button) => button.addEventListener('click', () => { $$('.filter-btn').forEach((item) => item.classList.remove('active')); button.classList.add('active'); renderProjects(button.dataset.filter); }));

  const renderEmpty = (items, type) => {
    if (!items.length) return `<article class="empty-card reveal"><div class="empty-plus">+</div><h3>Add your ${type}</h3><p>Edit <strong>data/portfolio-data.js</strong> to add your first ${type}.</p></article>`;
    return items.map((item) => `<article class="empty-card reveal">${item.result ? `<span class="tag">${item.result}</span>` : ''}<h3>${item.title}</h3><p>${item.platform || item.event || ''}${item.date ? ` · ${item.date}` : ''}</p><p>${item.description || ''}</p></article>`).join('');
  };
  $('#certificates-grid').innerHTML = renderEmpty(data.certificates, 'certificate');
  $('#achievements-grid').innerHTML = renderEmpty(data.achievements, 'achievement');
  $('#education-list').innerHTML = data.education.map((item) => `<article class="education-item reveal"><div class="education-card"><p class="education-status">${item.status}</p><h3>${item.title}</h3><p>${item.institution}</p><p>${item.detail}</p></div></article>`).join('');
  $$('[data-social]').forEach((link) => { const value = data.social[link.dataset.social]; if (value) { link.href = link.dataset.social === 'email' ? `mailto:${value}` : value; } else { link.removeAttribute('href'); link.classList.add('unavailable'); link.querySelector('span').textContent = 'add link'; } });

  const roles = ['AI & ML Engineering Student', 'AI learner', 'Machine Learning learner', 'Web & App Development learner']; let roleIndex = 0; let charIndex = 0; let deleting = false;
  const typeRole = () => { const element = $('#typed-role'); const role = roles[roleIndex]; element.textContent = deleting ? role.slice(0, --charIndex) : role.slice(0, ++charIndex); if (!deleting && charIndex === role.length) { deleting = true; setTimeout(typeRole, 1300); return; } if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; } setTimeout(typeRole, deleting ? 45 : 85); }; typeRole();

  const menuToggle = $('.menu-toggle'); const nav = $('.site-nav'); menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open); });
  $$('.nav-link').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));
  const themeToggle = $('.theme-toggle'); const storedTheme = localStorage.getItem('haarika-theme'); if (storedTheme === 'dark') document.body.classList.add('dark'); themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.setItem('haarika-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); themeToggle.querySelector('.theme-icon').textContent = document.body.classList.contains('dark') ? '☾' : '☼'; });

  const sections = $$('main section[id]'); const navLinks = $$('.nav-link'); const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), { rootMargin: '-35% 0px -55% 0px' }); sections.forEach((section) => sectionObserver.observe(section));
  let revealObserver; const observeReveals = () => { if (revealObserver) revealObserver.disconnect(); revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: .1 }); $$('.reveal').forEach((element) => revealObserver.observe(element)); }; observeReveals();

  const modal = $('#project-modal'); const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }; const bindProjectDetails = () => $$('.details-link').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); const project = data.projects[link.dataset.project]; $('#modal-title').textContent = project.title; $('#modal-description').textContent = project.description; $('#modal-tags').innerHTML = project.technologies.map((item) => `<span class="tag">${item}</span>`).join(''); $('#modal-link').style.display = project.link ? 'inline-flex' : 'none'; $('#modal-link').href = project.link || ''; $('#modal-github').style.display = project.github ? 'inline-flex' : 'none'; $('#modal-github').href = project.github || ''; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); })); bindProjectDetails(); renderProjects(); $('.modal-close').addEventListener('click', closeModal); modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

  $('#contact-form').addEventListener('submit', (event) => { event.preventDefault(); const form = event.currentTarget; const status = $('#form-status'); if (!form.checkValidity()) { status.textContent = 'Please complete all fields with a valid email.'; status.className = 'form-status error'; form.reportValidity(); return; } status.textContent = 'Thanks! Your message is ready, but this demo does not send email yet.'; status.className = 'form-status success'; form.reset(); });
  const topButton = $('.floating-top'); window.addEventListener('scroll', () => topButton.classList.toggle('show', window.scrollY > 500)); topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
