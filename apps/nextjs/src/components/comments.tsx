import { cn } from "@saasfly/ui";
import Marquee from "@saasfly/ui/marquee";

const reviews = [
  {
    name: "Seamless Collaboration Achieved!",
    username: "@jack",
    body: "This AI solution has truly bridged the gap between our silos, making collaboration across our enterprise effortless. Unified knowledge sharing has never been easier!",
    img: "https://avatar.vercel.sh/jack",
    hashtag: ["EnterpriseAI", "Collaboration"],
  },
  {
    name: "op-Notch Employee Support",
    username: "@alex",
    body: "The level of support and guidance our team receives is outstanding. This AI solution has significantly boosted our performance. Highly recommend!",
    img: "https://avatar.vercel.sh/alex",
    hashtag: ["EmployeeSupport", "AIExcellence"],
  },
  {
    name: "No More Information Silos!",
    username: "@bob",
    body: "Thanks to this AI solution, we’ve broken down barriers and streamlined communication. The integration of human best practices ensures high-quality answers every time.",
    img: "https://avatar.vercel.sh/bob",
    hashtag: ["Innovation", "AIIntegration"],
  },
  {
    name: "Guided by Expertise",
    username: "@richard",
    body: "The human expertise embedded in this AI solution has enhanced the quality of our answers. Our employees feel empowered and guided to excel.",
    img: "https://avatar.vercel.sh/richard",
    hashtag: ["HumanTouch", "AIAdvantage"],
  },
  {
    name: "Improved Knowledge Sharing",
    username: "@robert",
    body: "This AI solution has bridged the gap between departments, leading to better answer quality and a more connected enterprise.",
    img: "https://avatar.vercel.sh/robert",
    hashtag: ["KnowledgeSharing", "AIinBusiness"],
  },
  {
    name: "Continuous Support at Every Step",
    username: "@mike",
    body: "Our workflow has become more efficient with the continuous support and guidance provided by this AI solution. Better answers, smoother processes!",
    img: "https://avatar.vercel.sh/mike",
    hashtag: ["ContinuousSupport", "AIWorkflow"],
  },

  {
    name: "Unified and Cohesive Team",
    username: "@francois",
    body: "This AI solution has unified our enterprise, breaking down silos and improving answer quality. Our team is more cohesive than ever.",
    img: "https://avatar.vercel.sh/francois",
    hashtag: ["UnifiedEnterprise", "AIforBusiness"],
  },

  {
    name: "Expert Guidance for Superior Answers",
    username: "@michael",
    body: "Combining advanced technology with human best practices, this AI solution provides superior answers. Our team feels empowered with expert guidance.",
    img: "https://avatar.vercel.sh/michael",
    hashtag: ["ExpertGuidance", "AIInnovation"],
  },

  {
    name: "Empowered Employees",
    username: "@@christophe",
    body: "This AI solution has empowered our employees by bridging silos and providing high-quality answers through human best practices. A must-have for any enterprise!",
    img: "https://avatar.vercel.sh/christophe",
    hashtag: ["EmployeeEmpowerment", "AIinEnterprise"],
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  hashtag,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  hashtag: string[];
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">
        {body}
        <div className="flex flex-wrap justify-center gap-2 p-4">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
            #{hashtag[0]}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
            #{hashtag[1]}
          </span>
        </div>
      </blockquote>
    </figure>
  );
};

const Comments = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-4 sm:py-20 md:py-20 xl:py-20">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export { Comments };
