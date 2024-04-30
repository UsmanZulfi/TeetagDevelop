import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import Heading3 from "@/website/components/Heading3/Heading3";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import Image from "next/image";

const story = () => {
  return (
    <>
      <TitleHead
        title="My Story"
        metaTitle="My Story"
        metaDesc="AMERICA'S LARGEST GAME OF TAG For a Greater Cause!"
      />
      <section className="story-hero">
        <Header />
        <div className="story-content">
          <div className="container">
            <h1 className="text-center uppercase h1 font-fugaz shadow-heading">
              Jack Bradley
            </h1>
          </div>
        </div>
      </section>
      <p className="mt-10 mb-20 text-center h8 px-11 md:px-52 lg:px-80  font-bold">
        Hello, I'm Jack Bradley, and I am the founder and creator of TeeTag.com.
        I'm a 19-year-old sophomore at the University of Iowa. This project
        holds a special place in my heart and means the world to me due to the
        past of losing my amazing mother to esophageal cancer about 5 years ago.
        I created TeeTag in memory of my mom (Margo Bradley) but to also raise
        money for teenagers who’ve also lost a parent to cancer. I understand
        firsthand how incredibly hard it is both emotionally and financially. I
        love working on TeeTag (it's my baby) and I am excited to see where I
        can take it and how many kids I can help along the way.
      </p>
      <section className="section">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-16 xl:grid-cols-2">
            <div>
              <Heading3 title="my story/past" />
              <p className="mt-16 h8">
                I have been blessed with a wonderful family around me. I have an
                8 year old brother (Matthew) and a 16 year old sister (Jane)
                who’ve been by my side every step of the way.
              </p>
            </div>
            <div>
              <Image
                src="/assets/story2.png"
                width={700}
                className="mx-auto teetag-image-shadow"
                height={580}
                alt="story2"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <Image
                src="/assets/story3.png"
                width={700}
                className="mx-auto teetag-image-shadow"
                height={580}
                alt="story2"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="h8">
                My Mom was one of these people who would always see the bright
                side in every situation. She was positive, funny, and most
                importantly – selfless. I don’t know how she did it – helping
                with all the sports and activities my sister and I were involved
                it, Physical Therapy and help for my special needs brother,
                going all out for the countless parties held within my family…
                the list is endless. She was indeed the best Mommy ever.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="max-w-screen-xl mx-auto text-center h8">
            In August of 2017 (13 years old), my beautiful and amazing mother
            sat me down at her bedside to inform me that she had been diagnosed
            with Stage 4 Esophagus Cancer. She was my backbone; she was
            everything. All the prayers, sleepless nights by her side, and
            endless hugs weren’t enough to heal her. In February of 2018, she
            gracefully passed away.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-3">
            <div className="relative aspect-square">
              <Image src="/assets/story7.png" fill alt="story7" />
            </div>
            <div className="relative aspect-square">
              <Image src="/assets/story4.png" fill alt="story5" />
            </div>
            <div className="relative aspect-square">
              <Image src="/assets/story5.png" fill alt="story6" />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="max-w-screen-xl mx-auto text-center h8">
            Losing her at such a young age rocked my world, and still to this
            day, not a day goes by when I don't think about her. I miss her. But
            even though there will always be a hole in my heart, I know she
            would be proud of the person I have become and the person I strive
            to be. She is my motivation :)
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <Heading3 title="motivation" />
          <p className="mt-16 h8">
            I understand how hard it can be to lose a parent, and I think we
            also understand how many lives cancer touches. But I hope to shine a
            light through the dark storm of loss. And help put a bandage on a
            giant wound. Specifically, helping kids who’ve lost a parent to
            cancer and helping fund their future education. I chose this
            demographic because it is personal to me and also understand how
            expensive school can be. Additionally, I am trying to pay for my own
            college expenses and hopefully my 17-year-old sister Janes’ too.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Heading3 title="conclusion" />
          <p className="mt-16 h8">
            TeeTag is meant to be a fun, interactive game through the use of
            t-shirts to help raise money for children who’ve lost a parent to
            cancer. I am excited to hopefully unlock TeeTag’s potential and make
            a lasting difference. Thank you for listening to my story - it means
            the world.
          </p>
          <p className="mt-16 h7 text-green-light">Jack Bradley</p>

          <p className="mt-16 h8">
            ** I also wanted to link my high school senior speech below if you
            were interested in watching and seeing me speak.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default story;
