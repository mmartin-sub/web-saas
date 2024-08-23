import { FollowerPointerCard } from "@saasfly/ui/following-pointer";

export function XBlogArticle() {
  return (
    <div className="w-80">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
        }
      >
        <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white transition duration-200 hover:shadow-xl">
          <div className="aspect-w-16 aspect-h-10 xl:aspect-w-16 xl:aspect-h-10 relative w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100">
            <img
              src={blogContent.image}
              alt="thumbnail"
              className={`transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl `}
            />
          </div>
          <div className=" p-4">
            <h2 className="my-4 text-lg font-bold text-zinc-700">
              {blogContent.title}
            </h2>
            <h2 className="my-4 text-sm font-normal text-zinc-500">
              {blogContent.description}
            </h2>
            <div className="mt-10 flex flex-row items-center justify-between">
              <span className="text-sm text-gray-500">{blogContent.date}</span>
              <div className="relative z-10 block rounded-xl bg-black px-6 py-2 text-xs font-bold text-white">
                Read More
              </div>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const blogContent = {
  slug: "Get the News",
  author: "Substantifik",
  date: "21st March, 2024",
  title: "Making Sense of the complexity",
  description: "Get the best from humans and AI!",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/d/d4/Digital_Humanities_AI_generated_art.jpg",
  //   "/images/avatars/michel-substantifik.jpeg",
  //    "https://cdn.sanity.io/images/tpb4obti/production/50c13f886c039225be4e7e99023b8f1e2b4161b9-1792x1024.png",
  alt_image: "",
  authorAvatar: "/images/avatars/michel-substantifik.jpeg",
  //    "https://pbs.twimg.com/profile_images/1766283284370305025/QKXW5W3M_400x400.jpg",
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
