import NewsList from "@/components/news-list";
import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";
import Link from "next/link";

export default function newsPage() {
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={DUMMY_NEWS} />
    </>
  );
}
