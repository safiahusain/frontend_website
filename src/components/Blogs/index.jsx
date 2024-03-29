import axios from "axios";
import React, { useEffect, useState } from "react";
import languageModel from "../../../utils/languageModel";
import BlogCard from "../Helpers/Cards/BlogCard";
import DataIteration from "../Helpers/DataIteration";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function Blogs({ blogs, nextPageUrl }) {
  const [getBlogs, setGetBlogs] = useState([]);
  const [nxtPage, setNxtPage] = useState(nextPageUrl);
  const [loading, setLoading] = useState(false);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  useEffect(() => {
    if (getBlogs.length === 0) {
      const rs = blogs.map((item) => {
        return {
          id: item.id,
          by: item.admin_id,
          comments_length: item.active_comments.length,
          title: item.title,
          article: item.description,
          picture: process.env.NEXT_PUBLIC_BASE_URL + item.image,
          slug: item.slug,
        };
      });
      setGetBlogs(rs);
    }
  }, []);
  const nextPageHandler = async () => {
    setLoading(true);
    if (nxtPage) {
      await axios
        .get(`${nxtPage}`)
        .then((res) => {
          setLoading(false);
          if (res.data) {
            if (res.data.blogs) {
              res.data.blogs.data.map((item) => {
                setGetBlogs((prev) => [
                  ...prev,
                  {
                    id: item.id,
                    by: item.admin_id,
                    comments_length: item.active_comments.length,
                    title: item.title,
                    article: item.description,
                    picture: process.env.NEXT_PUBLIC_BASE_URL + item.image,
                    slug: item.slug,
                  },
                ]);
              });
              setNxtPage(res.data.blogs.next_page_url);
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (nxtPage === "null") {
      setLoading(false);
      return false;
    } else {
      setLoading(false);
      return false;
    }
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="blogs-wrapper w-full">
        <div className="title-bar">
          <PageTitle
            title={langCntnt && langCntnt.Our_blogs}
            breadcrumb={[
              { name: langCntnt && langCntnt.home, path: "/" },
              { name: langCntnt && langCntnt.blogs, path: "/blogs" },
            ]}
          />
        </div>
      </div>

      <div className="w-full pt-[60px] pb-[114px] bg-white">
        <div className="container-x mx-auto">
          <div className="w-full">
            {getBlogs && getBlogs.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 lg:gap-[30px] gap-5">
                  <DataIteration
                    datas={getBlogs}
                    startLength={0}
                    endLength={getBlogs.length}
                  >
                    {({ datas }) => (
                      <div
                        data-aos="fade-up"
                        key={datas.id}
                        className="item w-full"
                      >
                        <BlogCard datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div>
                {nxtPage && nxtPage !== "null" && (
                  <div className="flex justify-center">
                    <button
                      onClick={nextPageHandler}
                      type="button"
                      className="w-[180px] h-[54px] bg-qpurple rounded mt-10"
                    >
                      <div className="flex justify-center w-full h-full items-center group rounded relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                        <div className="flex items-center transition-all duration-300 ease-in-out relative z-10  text-white">
                          <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                            {langCntnt && langCntnt.Show_more}...
                          </span>
                          {loading && (
                            <span
                              className="w-5 "
                              style={{ transform: "scale(0.3)" }}
                            >
                              <LoaderStyleOne />
                            </span>
                          )}
                        </div>
                        <div
                          style={{ transition: `transform 0.25s ease-in-out` }}
                          className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                        ></div>
                      </div>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-center mt-10">
                  <p className="text-lg font-medium tracking-wide">
                    {langCntnt && langCntnt.Blog_Not_Found}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
