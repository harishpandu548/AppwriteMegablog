import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-300 rounded-xl p-4">
        <div className="w-full justify-center mb-4 aspect-[4/3] overflow-hidden rounded-lg">
          <img 
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full  object-contain"
          />
        </div>
        <h2 className="text-xl dark:text-white font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
