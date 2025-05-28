import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { ProxyLink, useHash } from '@hrbolek/uoisfrontend-shared';
import { useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * Sidebar navigation with user avatar & name at bottom and a repositioned collapse button.
 * – Active segment comes from URL path (first slug) or hash.
 * – Avatar remains a circle, shrinks on collapse; name hides when collapsed.
 */

const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/d/da/Logo_of_UO.svg';
const PLACEHOLDER_AVATAR = 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff';

const segments = [
  { segment: 'dashboard',    label: 'Přehled',     iconClass: 'bi-speedometer2' },
  { segment: 'persons',      label: 'Osoby',       iconClass: 'bi-people-fill' },
  { segment: 'programs',     label: 'Programy',    iconClass: 'bi-mortarboard-fill' },
  { segment: 'applications', label: 'Přihlášky',   iconClass: 'bi-file-earmark-text' },
  { segment: 'settings',     label: 'Nastavení',   iconClass: 'bi-gear-fill' },
];

const NavButton = ({ segment, label, iconClass, active, collapsed }) => (
  <ProxyLink to={segment} className="text-decoration-none">
    <Nav.Item as="li">
      <Nav.Link
        as="span"
        className={[
          'nav-btn d-flex align-items-center gap-3 px-3 py-2 rounded-3 fw-medium',
          active ? 'active' : 'text-white',
        ].join(' ')}
      >
        <i className={`bi ${iconClass}`}></i>
        <span className={collapsed ? 'd-none' : ''}>{label}</span>
      </Nav.Link>
    </Nav.Item>
  </ProxyLink>
);

const ProgramPageNavbar = ({ children, user = {} }) => {
  const { fullName = 'Testovací Uživatel', avatarUrl = PLACEHOLDER_AVATAR } = user;
  const [currentHash] = useHash();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const pathSegment = location.pathname.split('/').filter(Boolean)[0] || 'dashboard';

  /* Inject scoped CSS */
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      :root { --sidebar-expanded: 14rem; --sidebar-collapsed: 4.5rem; }

      .sidebar { width: var(--sidebar-expanded); transition: width .25s ease; }
      .sidebar.sidebar--collapsed { width: var(--sidebar-collapsed); }

      /* Logo */
      .brand-logo { width: 6rem; transition: width .25s ease; }
      .sidebar.sidebar--collapsed .brand-logo { width: 2.5rem; }

      /* Collapse button styling */
      .sidebar-toggle { --bs-border-opacity:0.2; }

      /* Nav button */
      .nav-btn { color: rgba(255,255,255,.9); transition: background .15s ease-in-out; }
      .nav-btn:hover:not(.active) { background: rgba(255,255,255,.15); }
      .nav-btn.active { background:#fff; color: var(--bs-primary); box-shadow: 0 .125rem .5rem rgba(0,0,0,.15); }

      /* Center icons in collapsed */
      .sidebar.sidebar--collapsed .nav { align-items: center; }
      .sidebar.sidebar--collapsed .nav-btn { justify-content: center; padding-left:0; padding-right:0; gap:0; }

      /* Avatar */
      .avatar { width:3rem; height:3rem; object-fit:cover; border-radius:50%; transition: width .25s ease, height .25s ease; }
      .sidebar.sidebar--collapsed .avatar { width:2rem; height:2rem; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleCollapse = () => setCollapsed((c) => !c);
  const isActive = (seg) => seg === pathSegment || currentHash === `#${seg}`;

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className={`sidebar bg-primary text-white sticky-top d-flex flex-column align-items-stretch${collapsed ? ' sidebar--collapsed' : ''}`}>
        {/* Logo */}
        <a href="/" className="d-flex justify-content-center py-4 text-decoration-none">
          <img src={LOGO_URL} alt="UOIS logo" className="brand-logo" />
        </a>

        {/* Collapse / expand button just under logo */}
        <div className="d-flex justify-content-center mb-3 px-2">
          <button
            type="button"
            className="btn btn-outline-light btn-sm sidebar-toggle d-flex align-items-center justify-content-center"
            onClick={toggleCollapse}
          >
            <i className={`bi ${collapsed ? 'bi-chevron-double-right' : 'bi-chevron-double-left'}`}></i>
          </button>
        </div>

        {/* Navigation list */}
        <Nav as="ul" className="flex-column gap-1 px-2" variant="pills">
          {segments.map(({ segment, label, iconClass }) => (
            <NavButton
              key={segment}
              segment={segment}
              label={label}
              iconClass={iconClass}
              active={isActive(segment)}
              collapsed={collapsed}
            />
          ))}
        </Nav>

        {/* User info at bottom */}
        <div className="mt-auto d-flex flex-column align-items-center px-3 pb-4 gap-2">
          <img src={avatarUrl} alt={fullName} className="avatar" />
          <span className={collapsed ? 'd-none' : 'text-white text-center fw-semibold'} style={{lineHeight:'1.2em'}}>{fullName}</span>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow-1 p-4 min-vh-100 bg-light">{children}</main>
    </div>
  );
};

export { ProgramPageNavbar };
export default ProgramPageNavbar;
