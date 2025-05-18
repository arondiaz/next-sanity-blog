import { client } from "../../../sanity/lib/client";

async function getPosts() {
  const query = `*[_type == "post"]{title, slug, publishedAt, excerpt, body, tags}`;

  const data = client.fetch(query);
  return data;
}

export default async function Home() {
  const posts = await getPosts();
  console.log(posts);

  return <div>page</div>;
}
