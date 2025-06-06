import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Buttons, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [userChecked, setUserChecked] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  // Mark when userData is ready (not undefined)
  useEffect(() => {
    setUserChecked(true);
  }, [userData]);

  // Fetch the post by slug
  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((fetchedPost) => {
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            navigate("/");
          }
        })
        .finally(() => setPostLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deletefile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // console.log("post:", post);
  // console.log("userData:", userData);
  // console.log("post.userId:", post?.userId);
  // console.log("userData.$id:", userData?.$id);
  // console.log("isAuthor:", isAuthor);

  // Show loading spinner while waiting
  if (postLoading || !userChecked) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-xl font-semibold bg-gray-100 text-black dark:bg-gray-800 dark:text-white">Loading post....</h2>
      </div>
    );
  }

  // If post failed to load
  if (!post) return null;

  return (
    <div className="py-8">
      <Container>
        {/* Edit/Delete Buttons */}
        {isAuthor && (
          <div className="flex justify-end gap-2 mb-4 flex-wrap">
            <Link to={`/edit-post/${post.$id}`}>
              <Buttons textcolor="dark:text-white" className="hover:bg-green-900" bgColor="bg-green-500">
                Edit
              </Buttons>
            </Link>
            <Buttons textcolor="dark:text-white"
              bgColor="bg-red-500"
              className="hover:bg-red-900"
              onClick={deletePost}
            >
              Delete
            </Buttons>
          </div>
        )}

        {/* Post Image */}
        <div className="w-full flex justify-center  rounded-xl overflow-hidden">
          <img 
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full max-h-[500px] object-contain"
          />
        </div>

        {/* Post Title */}
        <div className="w-full mt-5 dark:text-white mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        {/* Post Content */}
        <div className="browser-css dark:text-white">{parse(post.content)}</div>
      </Container>
    </div>
  );
}
