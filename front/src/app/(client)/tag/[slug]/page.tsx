import React from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { client } from "../../../../../sanity/lib/client";
import Header from "@/app/components/Header";
import { IPost, ITag } from "@/app/utils/interface";
import { Post } from "@/app/components/Post";

async function getTagPerParams(tag: any) {
  const query = `*[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{title, slug, publishedAt, excerpt, body, tags[]->{_id,slug,name}}`;

  const data = client.fetch(query);

  return data;
}

export const revalidate = 60;

const page = async ({ params }: Params) => {
  const tag: Array<IPost> = await getTagPerParams(params.slug);
  return (
    <div>
      <Header title={`${params.slug}`} tags />

      <div className="flex flex-col">
        {tag.map((t) => (
          <Post key={t._id} post={t} />
        ))}
      </div>
    </div>
  );
};

export default page;
