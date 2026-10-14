import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import ReviewText from "@/components/ReviewText";
import { GOOGLE_BUSINESS_URL } from "@/lib/constants";
import { getGoogleReviews, type GoogleReview } from "@/lib/google-reviews";

const STAR_ON = "var(--color-teal)";
const STAR_OFF = "rgb(244 246 244 / 15%)";

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        const isPartial = fill > 0 && fill < 1;
        const gradientId = `star-partial-${Math.round(fill * 100)}`;
        return (
          <svg key={i} viewBox="0 0 24 24" width={size} height={size} className="shrink-0">
            {isPartial ? (
              <defs>
                <linearGradient id={gradientId}>
                  <stop offset={`${fill * 100}%`} stopColor={STAR_ON} />
                  <stop offset={`${fill * 100}%`} stopColor={STAR_OFF} />
                </linearGradient>
              </defs>
            ) : null}
            <path
              fill={isPartial ? `url(#${gradientId})` : fill === 1 ? STAR_ON : STAR_OFF}
              d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z"
            />
          </svg>
        );
      })}
    </span>
  );
}

function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function ReviewCard({
  review,
  locale,
  labels,
}: {
  review: GoogleReview;
  locale: string;
  labels: { readMore: string; readLess: string; rating: string };
}) {
  const date = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(review.date));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface-2 p-6 transition-[transform,border-color] duration-350 hover:-translate-y-0.5 hover:border-teal/40 md:p-7">
      <header className="flex items-center gap-3">
        {review.authorPhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- external Google avatar URL
          <img
            src={review.authorPhotoUrl}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-head text-base font-bold text-teal"
          >
            {review.authorName.trim().charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-head text-[0.95rem] font-bold text-ivory">
            {review.authorName}
          </h3>
          <time dateTime={review.date} className="text-[0.7rem] tracking-wide text-slate-text">
            {date}
          </time>
        </div>
        <GoogleMark className="h-5 w-5 shrink-0" />
      </header>
      <div className="mt-4 flex items-center" role="img" aria-label={labels.rating}>
        <Stars rating={review.rating} />
      </div>
      <ReviewText text={review.text} readMoreLabel={labels.readMore} readLessLabel={labels.readLess} />
    </article>
  );
}

export default async function GoogleReviews() {
  const t = await getTranslations("reviews");
  const locale = await getLocale();
  const data = await getGoogleReviews();
  const count = data.totalCount || data.reviews.length;
  const ratingText = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(data.rating);

  return (
    <section
      id="reviews"
      className="section-deferred relative z-[1] overflow-hidden bg-surface-1 before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent"
    >
      <div className="section-inner">
        <Reveal className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="section-tag">{t("tag")}</div>
            <h2 className="section-title">{t("title")}</h2>
            <p className="section-subtitle">{t("subtitle")}</p>
          </div>

          <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-border bg-surface-2 px-6 py-5">
            <GoogleMark className="h-9 w-9 shrink-0" />
            <div>
              <div className="flex items-center gap-3">
                <span className="font-head text-3xl leading-none font-extrabold text-cream">
                  {ratingText}
                </span>
                <span role="img" aria-label={t("ratingAria", { rating: ratingText })}>
                  <Stars rating={data.rating} size={18} />
                </span>
              </div>
              <p className="mt-1.5 text-xs tracking-wide text-slate-text">
                {t("basedOn", { count })}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <ul
            aria-label={t("sliderAria")}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
          >
            {data.reviews.map((review) => (
              <li
                key={review.id}
                className="w-[85%] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none"
              >
                <ReviewCard
                  review={review}
                  locale={locale}
                  labels={{
                    readMore: t("readMore"),
                    readLess: t("readLess"),
                    rating: t("ratingAria", { rating: review.rating }),
                  }}
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center"
          >
            {t("leaveReview")}
          </a>
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-center"
          >
            {t("allReviews")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
