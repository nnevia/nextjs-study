import Link from 'next/link';

export default function DefaultPage() {
  return (
    <div>
      <h1>This is DefaultPage</h1>
      <ul>
        <li>
          <Link href="/blog">blog</Link>
        </li>
        <li>
          <Link href="/clients">clients</Link>
        </li>
        <li>
          <Link href="/portfolio">portfolio</Link>
        </li>
      </ul>
    </div>
  );
}
