import Image from "next/image";
import Link from "next/link";

interface SecondaryLayoutProps {
  children: React.ReactNode;
}

const SecondaryLayout = ({ children }: SecondaryLayoutProps) => {
  return (
    <>
      <div className="login__wrapper">
        <header className="flex justify-center login__header">
          <Link href="/">
            <Image
              src="/assets/logo-header.png"
              width={240}
              height={85}
              alt="header-logo"
            />
          </Link>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
};

export default SecondaryLayout;
