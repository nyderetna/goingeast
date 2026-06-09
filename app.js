const accordionButtons = document.querySelectorAll('.island-panel');
const storyCards = document.querySelectorAll('.story-card');
const revealItems = document.querySelectorAll('.reveal');
const themeToggle = document.querySelector('[data-theme-toggle]');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const setTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  if (themeToggle) {
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
};

const applyFilter = (filter) => {
  storyCards.forEach((card) => {
    const match = filter === 'all' || card.dataset.island === filter;
    card.classList.toggle('is-hidden', !match);
    card.setAttribute('aria-hidden', match ? 'false' : 'true');
  });
};

const setActiveAccordionItem = (button) => {
  accordionButtons.forEach((item) => {
    const isActive = item === button;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-pressed', String(isActive));
  });

  applyFilter(button.dataset.filter);
};

const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  setTheme(storedTheme);
} else {
  setTheme(prefersDark.matches ? 'dark' : 'light');
}

accordionButtons.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    setActiveAccordionItem(button);
  });

  button.addEventListener('focus', () => {
    setActiveAccordionItem(button);
  });

  button.addEventListener('click', () => {
    setActiveAccordionItem(button);
  });
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));
