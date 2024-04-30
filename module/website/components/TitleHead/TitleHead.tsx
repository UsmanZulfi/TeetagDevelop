import Head from "next/head";

interface TitleHeadProps {
  title: string;
  metaTitle: string;
  metaDesc: string;
}
export const TitleHead = ({ title, metaDesc, metaTitle }: TitleHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDesc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};
