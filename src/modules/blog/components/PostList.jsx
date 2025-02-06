import { PostCard } from ".";

export const PostList = ({ posts }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {posts.map(
        (post, index) => index !== 0 && <PostCard key={post.id} post={post} />
      )}
    </div>
  );
};
