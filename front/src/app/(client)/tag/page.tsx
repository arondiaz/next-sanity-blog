import React from "react";
import { client } from "../../../../sanity/lib/client";
import { ITag } from "@/app/utils/interface";
import Header from "@/app/components/Header";
import Link from "next/link";

async function getTags() {
  const query = `*[_type == "tag"]{_id,name,slug,
  "postCount": count(*[_type == "post" && references("tag",^._id)])
  }`;

  const data = client.fetch(query);
  return data;
}

const page = async () => {
  const tags: ITag[] = await getTags();

  return (
    <div>
      <Header title="Tags" />
      <div>
        {tags?.map((tag) => (
          <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
            <div className="mb-2 p-2 text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 hover:text-purple-500">
              #{tag.name} {tag?.postCount}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
