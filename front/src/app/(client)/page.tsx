import { client } from "../../../sanity/lib/client";
import Header from "../components/Header";
import { Post } from "../components/Post";
import { IPost } from "../utils/interface";

async function getPosts() {
  const query = `*[_type == "post"]{title, slug, publishedAt, excerpt, body, tags[]->{_id,slug,name}}`;

  const data = client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function Home() {
  const posts: IPost[] = await getPosts();
  console.log(posts);

  return (
    <div>
      <Header title="Articles" />

      <div>
        {posts?.length > 0 &&
          posts?.map((post) => <Post key={post?._id} post={post} />)}
      </div>
    </div>
  );
}
