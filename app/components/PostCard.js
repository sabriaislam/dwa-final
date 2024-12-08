const PostCard = ({ post }) => {
    return (
        <div>
            <p>{post.date}</p>
            <p>{post.displayName}</p>
            <p>{post.postContent}</p>

        </div>
    );
};

export default PostCard;

     