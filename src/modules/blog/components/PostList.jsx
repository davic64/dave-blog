import { PostCard } from ".";

export const PostList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map(
        (post, index) => index !== 0 && <PostCard key={post.id} post={post} />
      )}
    </div>
  );
};
