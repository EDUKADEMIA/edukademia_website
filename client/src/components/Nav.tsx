import { useEffect, useRef, useState } from 'react';

const PROGRAMMES = [
  { href: '/cgpa-mentorship/', label: 'CGPA Mentorship', note: 'Mentorship for students' },
  { href: '/cgpa-mentorship/#mentors', label: 'Become a mentor', note: 'Call for CGPA mentors' },
  { href: '/exam-preparation/', label: 'Exam Preparation', note: 'WAEC, NECO, JAMB, IELTS and more' },
  { href: '/school-partnership/', label: 'School Partnership', note: 'For schools and universities' },
];

interface NavProps {
  /** Path of the current page, used to highlight the active link, e.g. '/cgpa-mentorship/'. */
  current?: string;
  primaryCta?: { href: string; label: string };
}

export default function Nav({
  current,
  primaryCta = { href: '/cgpa-mentorship/#join', label: 'Apply now' },
}: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [programmesOpen, setProgrammesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const inProgrammes = PROGRAMMES.some((p) => p.href === current);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!programmesOpen && !menuOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) setProgrammesOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setProgrammesOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [programmesOpen, menuOpen]);

  function closeAll() {
    setProgrammesOpen(false);
    setMenuOpen(false);
  }

  return (
    <nav className={menuOpen ? 'site-nav nav-open' : 'site-nav'} aria-label="Main">
      <div className="nav-inner">
        <a href="/" className="brand">
          <img src="/logo.png" alt="" className="brand-mark" width="44" height="44" />
          <span className="brand-name">Edukademia</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-toggle-bars" aria-hidden="true" />
          <span className="nav-toggle-label">{menuOpen ? 'Close' : 'Menu'}</span>
        </button>

        <div className="nav-menu" id="nav-menu">
          <ul className="nav-links">
            <li><a href="/#vision" onClick={closeAll}>About</a></li>
            <li><a href="/#method" onClick={closeAll}>Our approach</a></li>
            <li
              ref={dropdownRef}
              className={programmesOpen ? 'nav-dropdown is-open' : 'nav-dropdown'}
            >
              <button
                type="button"
                className={inProgrammes ? 'nav-dropdown-trigger is-active' : 'nav-dropdown-trigger'}
                aria-expanded={programmesOpen}
                aria-controls="nav-programmes"
                onClick={() => setProgrammesOpen((o) => !o)}
              >
                Programmes
                <span className="nav-caret" aria-hidden="true" />
              </button>
              <ul className="nav-submenu" id="nav-programmes">
                {PROGRAMMES.map((p) => (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      aria-current={p.href === current ? 'page' : undefined}
                      onClick={closeAll}
                    >
                      <span className="nav-submenu-label">{p.label}</span>
                      <span className="nav-submenu-note">{p.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className="nav-ctas">
            {current !== '/school-partnership/' && (
              <a href="/school-partnership/" className="btn btn-outline btn-sm" onClick={closeAll}>
                For schools
              </a>
            )}
            <a href={primaryCta.href} className="btn btn-primary btn-sm" onClick={closeAll}>
              {primaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
