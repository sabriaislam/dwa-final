import React from "react";

export default function PostCard({ displayName, postContent, timestamp }) {
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
      <h3>{displayName}</h3>
      <p>{postContent}</p>
      <p>Posted on: {formatDate(timestamp)}</p>
    </div>
  );
}

