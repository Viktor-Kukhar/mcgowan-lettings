import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-server";
import { AnimateIn } from "@/components/AnimateIn";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: post } = await supabaseAdmin
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return { title: "Post Not Found | McGowan Residential Lettings" };
  }

  return {
    title: `${post.title} | McGowan Residential Lettings`,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { data: post } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  const paragraphs = (post.content ?? "")
    .split(/\n\n+/)
    .filter((p: string) => p.trim());

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[40vh] min-h-[280px] flex items-end overflow-hidden noise-overlay bg-dark pt-16">
        <div className="absolute inset-0">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              sizes="100vw"
              quality={85}
              className="object-cover object-center opacity-40"
              priority
            />
          ) : (
            <Image
              src="/hero.jpg"
              alt="Greater Manchester"
              fill
              sizes="100vw"
              quality={85}
              className="object-cover object-center opacity-40"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-10 w-full">
          <time className="text-brand text-sm font-semibold tracking-[0.15em] uppercase">
            {new Date(post.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.15]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* ─── BREADCRUMB + CONTENT ─── */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <AnimateIn>
            <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
              <Link href="/" className="hover:text-dark transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-dark transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-dark font-medium truncate max-w-[200px] sm:max-w-none">
                {post.title}
              </span>
            </nav>
          </AnimateIn>

          {/* Article content */}
          <AnimateIn delay={0.1}>
            <article className="prose-custom">
              {post.excerpt && (
                <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-8 font-medium">
                  {post.excerpt}
                </p>
              )}

              <div className="space-y-5">
                {paragraphs.map((paragraph: string, i: number) => (
                  <p
                    key={i}
                    className="text-dark/80 leading-relaxed text-[15px] md:text-base"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </article>
          </AnimateIn>

          {/* Back to blog */}
          <AnimateIn delay={0.2}>
            <div className="mt-12 pt-8 border-t border-black/5">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:text-brand transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Back to blog
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
