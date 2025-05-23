import Header from "@/app/components/Header";
import { client } from "../../../../../sanity/lib/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { IPost } from "@/app/utils/interface";
import Link from "next/link";
import { VT323 } from "next/font/google";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "../../../../../sanity/lib/image";
import NotFound from "../NotFound";

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

  if (!post) {
    return NotFound();
  }
  return (
    <div>
      <Header title={post?.title} />
      <div className="text-center">
        <span className={`${dateFont.className} text-purple-500`}>
          {new Date(post.publishedAt).toDateString()}
        </span>
      </div>
      <div className="mt-5">
        {post?.tags?.map((tag) => (
          <Link
            key={tag._id}
            href={`/tag/${tag.slug.current}`}
            className="mr-2 p-1 rounded-md text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 px-2-2"
          >
            #{tag.name}
          </Link>
        ))}

        <div className={richTextStyle}>
          <PortableText
            value={post.body}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default page;

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlForImage(value).url()}
        alt="Post"
        width={700}
        height={700}
        className="mb-5"
      />
    ),
  },
};

const richTextStyle = `
mt-14 text-justify max-w-2xl m-auto prose-headings:my-5 prose-headings:text-2xl prose-p:mb-5 prose-p:leading-7 prose-li:list-disc prose-li:leading-7 prose-li:ml-4
`;
