import Link from "next/link";

interface ApplyBannerProps {
  title: string;
  btnText: string;
  btnUrl: string;
  titleClass?: string;
}

const ApplyBanner = ({
  title,
  btnText,
  btnUrl,
  titleClass,
}: ApplyBannerProps) => {
  return (
    <section className={`apply-banner ${titleClass && `lg:py-12`}`}>
      <div className="container">
        <div className="flex flex-col md:flex-row text-center md:text-left justify-center md:justify-between items-center gap-10 md:gap-0">
          <h2
            className={
              (titleClass ? titleClass : "h3") +
              " uppercase text-black-bg font-fugaz"
            }
          >
            {title}
          </h2>
          <Link
            href={btnUrl}
            className="btn-teetag black text-center text-green-light"
            style={{
              marginTop: "0px",
              color: "rgb(0 255 204 / var(--tw-text-opacity))",
            }}
          >
            {btnText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ApplyBanner;
