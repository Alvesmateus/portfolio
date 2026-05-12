import Link from "next/link";

const navigationItems = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/thumbnails", label: "Thumbnails" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="site-mark" href="/">
          Mateus Alves
        </Link>
        <nav aria-label="Principal">
          <ul className="site-nav">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link className="site-nav__link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
