import React from "react";

const PostCard = ({ displayName, postContent, timestamp }) => {
  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) {
      return "Unknown Date";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <h3>{displayName || "Anonymous"}</h3>
      <p>{postContent}</p>
      <p>Posted on: {formatDate(timestamp)}</p>
    </div>
  );
};

export default PostCard;