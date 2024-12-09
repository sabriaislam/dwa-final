const PostCard = ({ posts }) => {
    return (
        <div>
            <p>{posts.timestamp}</p>
            <p>{posts.displayName}</p>
            <p>{posts.postContent}</p>

        </div>
    );
};

export default PostCard;

     