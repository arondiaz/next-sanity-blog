import Header from "@/app/components/Header";
import { client } from "../../../../../sanity/lib/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { IPost } from "@/app/utils/interface";
import Link from "next/link";
import { VT323 } from "next/font/google";

const dateFont = VT323({ weight: "400", subsets: ["latin"] });

async function getPostPerId(post: string) {
  const query = `*[_type == "post" && slug.current == "${post}"][0]{title, slug,
  publishedAt, excerpt, body, 
  tags[]->{
    _id,slug,name
  }}`;

  const data = client.fetch(query);
  return data;
}

export const revalidate = 60;

const page = async ({ params }: Params) => {

  const post: IPost = await getPostPerId(params?.slug);
  console.log(post);
  return (
    <div>
      <Header title={post?.title} />
      <div className="text-center">
        <span className={`${dateFont.className} text-purple-500`}>{new Date(post.publishedAt).toDateString()}</span>
      </div>
      <div className="mt-5">
        {post?.tags?.map((tag) => (
            <Link key={tag._id} href={`/tag/${tag.slug.current}`} className="mr-2 p-1 rounded-md text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 px-2-2">
                #{tag.name}
            </Link>
        ))}

      </div>
    </div>
  );
};

export default page;
