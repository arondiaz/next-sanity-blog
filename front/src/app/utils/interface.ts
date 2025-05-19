export interface IPost {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: any;
  tags: Array<ITag>;
  id: string;
}

export interface ITag {
  name: string;
  slug: { current: string };
  id: string;
}
