import Link from 'next/link';
export default function Brand() {
  return (
    <Link href="/" className="brand-identity" aria-label="Viaferra Workforce Solutions — home">
      <span className="brand-logo-wrap">
        <svg className="brand-symbol" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3L3 20H21L12 3Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M12 8L7 18H17L12 8Z" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        <span className="brand-name">Viaferra</span>
      </span>
      <span className="brand-subtext">Workforce Solutions</span>
    </Link>
  );
}
