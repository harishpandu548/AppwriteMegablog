import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false); // FINISH LOADING
    });
  }, [loading]);

  // if (posts.length === 0) {
  //   return (
  //     <div className="w-full py-8 mt-4 bg-gray-100 text-black dark:bg-gray-800 dark:text-white text-center">
  //       <Container>
  //         <h1 className="text-2xl font-bold hover:text-gray-500">
  //           Login to read posts
  //         </h1>
  //       </Container>
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="w-full py-8 mt-4  bg-gray-100 text-black dark:bg-gray-800 dark:text-white text-center">
        <Container>
          <h1 className="text-xl  bg-gray-100 text-black dark:bg-gray-800 dark:text-white">
            Loading posts...
          </h1>
        </Container>
      </div>
    );
  }


  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
