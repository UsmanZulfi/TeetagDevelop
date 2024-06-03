import { Footer } from "@/website/components/Footer/Footer";
import Minions from "@/website/components/Minions/Minions";
import ProgressBanner from "@/website/components/ProgressBanner/ProgressBanner";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import Hero from "@/website/containers/Hero/Hero";
import HowItWorks from "@/website/containers/HowItWorks/HowItWorks";
import Order from "@/website/containers/Orders/Order";
import Players from "@/website/containers/Players/Players";
import States from "@/website/containers/States/States";
import Story from "@/website/containers/Story/Story";
import WhatIsTeetag from "@/website/containers/WhatIsTeetag/WhatIsTeetag";
import PreviewPage from '../Package'
export default function Home() {
  return (
    <>
      <TitleHead
        title="Tee Tag - Tag Across America"
        metaTitle="Tee Tag"
        metaDesc="AMERICA'S LARGEST GAME OF TAG For a Greater Cause!"
      />
      <Hero />
      <WhatIsTeetag />
      <HowItWorks />
      <ProgressBanner />
      <Story />
      <States />
      <Minions />
      <Players />
      <PreviewPage/>
      <Order showBanner={true} />
      <Footer />
    </>
  );
}
