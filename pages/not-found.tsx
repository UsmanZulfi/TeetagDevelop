import SecondaryLayout from "module/website/layout/SecondaryLayout";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div className="notFound__wrapper mt-28">
        <div className="heading font-fugaz uppercase text-center relative">
          <h1>404</h1>
          <h3>404</h3>
        </div>
        <p className="text-center h6">Oops! Unfortunately Page not found.</p>
        <Link href="/" className="btn-teetag yellow">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;

NotFound.getLayout = function (page: React.ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
