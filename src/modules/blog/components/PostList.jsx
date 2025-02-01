import { PostCard } from ".";

export const PostList = ({ posts }) => {
  return posts.map((post) => (
    <div className="grid grid-cols-2 gap-4">
      {posts?.indexOf(post) !== 0 && <PostCard key={post.id} post={post} />}
    </div>
  ));
};
