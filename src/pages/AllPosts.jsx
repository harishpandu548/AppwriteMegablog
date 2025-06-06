import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    }, []);
  });

  // if (loading) {
  //   return (

  //   );
  // }

  return loading ? (
    <div className="w-full py-8 mt-4 bg-gray-100 text-black dark:bg-gray-800 dark:text-white text-center">
      <Container>
        <h1 className="text-xl">Loading posts...</h1>
      </Container>
    </div>
  ) : (
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

export default AllPosts;
