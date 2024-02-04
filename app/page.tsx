import { unstable_noStore as noStore } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
// import summit from "public/images/home/summit.jpg"
import ViewCounter from "app/blog/view-counter"
import { PreloadResources } from "app/preload"
import df_logo from "public/df_logo.svg"
import df_logo_light from "public/df_logo_light.png"

import macbook from "public/images/home/macbook.jpg"
import meWithDF from "public/images/home/me-with-df.jpg"
import meWithTeam1 from "public/images/home/me-with-team1.jpeg"
import me1 from "public/images/home/me1.jpeg"
import me2 from "public/images/home/me2.jpeg"
import screenCode from "public/images/home/screen-code.jpg"

import {
  getLeeYouTubeSubs,
  getVercelYouTubeSubs,
  getViewsCount,
} from "app/db/queries"
import Confetti from "./components/confetti"
import BlurImage from "./components/blur-image"

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
    />
  )
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ChannelLink({ img, link, name }) {
  return (
    <div className="group flex w-full">
      <a
        href={link}
        target="_blank"
        className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full"
      >
        <div className="flex items-center space-x-3">
          <div className="relative h-16">
            <Image
              alt={name}
              src={img}
              height={64}
              width={64}
              sizes="33vw"
              className="border border-neutral-200 dark:border-neutral-700 rounded-full h-16 w-16"
              priority
            />
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-full bg-white inline-flex p-1 relative h-6 w-6 items-center -top-6 -right-10">
              <svg width="15" height="11" role="img" aria-label="YouTube logo">
                <use href="/sprite.svg#youtube" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {name}
            </p>
            <Suspense fallback={<p className="h-6" />}>
              <Subs name={name} />
            </Suspense>
          </div>
        </div>
        <div className="text-neutral-700 dark:text-neutral-300 transform transition-transform duration-300 group-hover:-rotate-12">
          <ArrowIcon />
        </div>
      </a>
    </div>
  )
}

async function Subs({ name }: { name: string }) {
  noStore()
  let subscribers
  if (name === "@leerob") {
    subscribers = await getLeeYouTubeSubs()
  } else {
    subscribers = await getVercelYouTubeSubs()
  }

  return (
    <p className="text-neutral-600 dark:text-neutral-400">
      {subscribers} subscribers
    </p>
  )
}

function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-6" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="text-neutral-700 dark:text-neutral-300 transform transition-transform duration-300 group-hover:-rotate-12">
          <ArrowIcon />
        </div>
      </a>
    </div>
  )
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount()
  return <ViewCounter allViews={views} slug={slug} />
}

export default function Page() {
  return (
    <section>
      <PreloadResources />
      <div className=" font-medium text-2xl mb-8 tracking-tighter flex gap-2 items-center flex-col sm:flex-row">
        hey, I'm kinhbach 👋
        <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline">
          <Confetti />
        </div>
      </div>
      <p className="prose prose-neutral dark:prose-invert">
        {`I'm a frontend developer. I currently `}
        <Link href="/work">working</Link>
        {` at `}
        <span className="not-prose">
          <Badge href="https://digitalfortress.dev">
            <span className="w-4 h-4 mr-1 dark:block hidden">
              <BlurImage src={df_logo} alt="df-logo" width={20} height={20} />
            </span>
            <span className="w-4 h-4 mr-1 dark:hidden block">
              <BlurImage
                src={df_logo_light}
                alt="df-logo"
                width={20}
                height={20}
              />
            </span>
            Digital <span className="text-red-500 ml-1">Fortress</span>
          </Badge>
        </span>
        {`, where I work on projects that use `}
        <Badge href="https://nextjs.org">
          <BlurImage
            alt="Next.js logomark"
            src="/next-logo.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          Next.js
        </Badge>
        {", "}
        <Badge href="https://react.dev">
          <svg
            width="14"
            height="14"
            role="img"
            aria-label="React logo"
            className="!mr-1"
          >
            <use href="/sprite.svg#react" />
          </svg>
          React
        </Badge>
        .
      </p>
      <div className="columns-2 sm:columns-3 gap-4 my-8">
        <div className="relative h-40 mb-4">
          <BlurImage
            alt="Me speaking on stage at React Summit about the future of Next.js"
            src={screenCode}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80 mb-4 sm:mb-0">
          <BlurImage
            alt="Me, Lydia, and Delba filming the Next.js Conf keynote"
            src={macbook}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-[-16px] sm:object-center"
          />
        </div>
        <div className="relative h-40 sm:h-80 sm:mb-4">
          <BlurImage
            alt="Me standing on stage at Reactathon delivering the keynote"
            src={me1}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative h-40 mb-4 sm:mb-0">
          <BlurImage
            alt="Me standing on stage at SmashingConf giving a talk about my optimism for the web"
            src={meWithTeam1}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40 mb-4">
          <BlurImage
            alt="Me and Guillermo Rauch on stage for Vercel Ship, answering questions from the Next.js community"
            src={meWithDF}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80">
          <BlurImage
            alt="My badge on top of a pile of badges from a Vercel meetup we held"
            src={me2}
            fill
            sizes="(min-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          With expertise in JavaScript and TypeScript, passionate about using
          technologies like Next.js, React.js not only optimizes performance but
          also creates flexible and maintainable web applications.
        </p>
      </div>
      {/* <div className="my-8 flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 w-full">
        <ChannelLink
          img={avatar}
          name="@leerob"
          link="https://www.youtube.com/@leerob"
        />
        <ChannelLink
          img={vercel}
          name="@vercel"
          link="https://www.youtube.com/@vercelhq"
        />
      </div> */}
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          With a logical mindset and refined design skills, I always seek ways
          to integrate unique features and ideas into my projects. Prioritizing
          the development of user-friendly, easy-to-use, and aesthetically
          pleasing interfaces is always my top priority. With each project, I
          always focus on creating highly interactive and user-friendly
          interfaces.
        </p>
      </div>
      {/* <div className="my-8 flex flex-col space-y-4 w-full">
        <BlogLink
          name="What Makes A Great Developer Experience?"
          slug="developer-experience-examples"
        />
        <BlogLink name="What is Developer Relations?" slug="devrel-at-vercel" />
        <BlogLink name="The Story of Heroku" slug="heroku" />
      </div> */}
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Throughout my journey as a front-end developer, I've honed my skills
          with a variety of powerful tools and technologies to bring ideas to
          life. Here are some of the key tools in my toolkit:
        </p>
      </div>
      <div className="my-8 flex flex-row space-x-2 w-full h-14 overflow-x-auto">
        <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4">
          <a href="https://tailwindcss.com/">
            <svg
              width="100"
              height="20"
              role="img"
              aria-label="TailwindCss logo"
            >
              <use href="/sprite.svg#tailwindcss" />
            </svg>
          </a>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4">
          <a href="https://ui.shadcn.com/">
            <svg width="30" height="19" role="img" aria-label="ShadCn logo">
              <use href="/sprite.svg#shadcn" />
            </svg>
          </a>
          <p className="font-bold">shadcn/ui</p>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4">
          <a href="https://nextui.org/">
            <svg width="30" height="19" role="img" aria-label="NextUI logo">
              <use href="/sprite.svg#nextui" />
            </svg>
          </a>
          <p className="font-normal">NextUI</p>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4">
          <a href="https://nextui.org/">
            <svg width="30" height="19" role="img" aria-label="GitHub logo">
              <use href="/sprite.svg#github" />
            </svg>
          </a>
          <p className="font-semibold ">GitHub</p>
        </div>
      </div>

      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/kinhdev24/"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">connect with me</p>
          </a>
        </li>
      </ul>
    </section>
  )
}
