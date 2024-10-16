import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        <Image
          src={logo}
          // width={100}
          // height={100}
          // sizes="10vw" // 뷰포트 너비에 따라 로드할 이미지 크기를 결정
          priority // lazy loading(지연 로드)**되지 않고, 페이지 로드 시 즉시 다운로드
          alt="Mobile phone with posts feed on it"
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
