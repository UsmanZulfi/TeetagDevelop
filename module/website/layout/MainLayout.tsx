interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
