import Header from "@/components/common/Header";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { MainLayout } from "@/components/layout";
// import dynamic from "next/dynamic";

// const Header = dynamic(() => import("@/components/common/Header"), {
//   ssr: false
// });
interface AboutPageProps {}

const AboutPage = (props: AboutPageProps) => {
  const [postList, setPostList] = useState([]);
  const router = useRouter();
  console.log("About query", router.query);
  const page = router.query?.page;

  useEffect(() => {
    if (!page) return;
    (async () => {
      const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
      );
      const data = await response.json();
      setPostList(data.data);
    })();
  }, [page]);

  function handleOnClick() {
    router.push({
      pathname: "/about",
      query: {
        page: (Number(page) || 1) + 1
      }
    });
  }

  return (
    <div>
      <Header />
      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={handleOnClick}>Next Page</button>
    </div>
  );
};

export async function getStaticProps() {
  console.log("get static props");
  return {
    props: {}
  };
}

AboutPage.Layout = MainLayout;

export default AboutPage;
