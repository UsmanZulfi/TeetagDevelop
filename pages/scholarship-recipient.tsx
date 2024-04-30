import ApplyBanner from "@/website/components/ApplyBanner/ApplyBanner";
import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import Heading3 from "@/website/components/Heading3/Heading3";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import Image from "next/image";

const ScholarshipRecipient = () => {
  return (
    <>
      <TitleHead
        title="Scholarship Recipient"
        metaTitle="Scholarship Recipient"
        metaDesc=""
      />
      <section className="scholarship-hero">
        <Header />
        <div className="scholarship-content px-10 sm:px-0">
          <div className="container">
            <h1 className="text-center uppercase h1 font-fugaz shadow-heading">
              Scholarship recipient
            </h1>
            <p className="mt-4 text-center h10">
              I am excited to announce that the first child TeeTag is raising
              money for is - Daniel Stevens. Daniel went to my high school and
              he is a current Junior. In fact, our moms actually knew each other
              growing up. He recently lost his amazing mother this past year to
              Breast Cancer. Daniel has the biggest heart and I am blessed to
              have the opportunity to connect with him :) I’d like to proudly
              note that last year Daniel decided to start his own grief group
              through his high school with other kids who’ve lost a parent. So
              awesome.
            </p>
            <p className="mt-4 text-center h10">
              The goal is to raise $5000 for Daniel's future college education.
              The money raised will then be allocated and distributed through my
              personal foundation. A portion of every shirt sold will go
              directly toward Daniel. Once $5000 is hit, a new scholarship
              recipient will be up next. Below Daniel shares his story and more
              about who he is…
            </p>
          </div>
          <div className="mt-16 fund__progress_bar max-w-6xl mx-auto">
            <div className="image-container">
              <Image src="/assets/loader.png" fill alt="loader" />
            </div>

            <div className="flex items-center justify-between mt-8">
              <p className="h8">
                Fund Raised <span className="font-bold">$5000</span>
              </p>
              <p className="h8">
                Fund Goal <span className="font-bold">$100,000</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-32 xl:grid-cols-2">
            <div>
              <Heading3 title="Daniel Stevens" />
              <p className="mt-16 h8">
                My name is Vera Duffy and I am 16 years old. I was born in
                Russia. I do not remember anything about my biological family.
                When I was three, my sisters and I came to the United States and
                was adopted by a wonderful family -- a caring father and loving,
                trusting, supportive mom.
              </p>
              <p className="mt-16 h8">
                My mom, Karen, was my guidepost for every decision I made. She
                filled our house with friends, love, arts, and books. Thanks to
                her I have a passion in my life -- horseback riding. While I
                ride the whole world disappears. I feel wind in my hair, and
                freedom in my heart. I have no worries, and my spirits soar.
                Every so often, my mom would come and watch me ride, always
                supporting me.
              </p>
            </div>
            <div className="image-container">
              <Image
                src="/assets/sc-image1.png"
                className="mx-auto teetag-image-shadow"
                fill
                alt="story2"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-32 xl:grid-cols-2">
            <div className="image-container order-2 xl:order-1 ">
              <Image
                src="/assets/sc-image2.png"
                fill
                className="mx-auto teetag-image-shadow"
                alt="story2"
              />
            </div>
            <div className="order-1 xl:order-2">
              <p className="mt-16 h8">
                Unfortunately, last Thanksgiving my mom passed away due to
                complications from breast cancer. This was the greatest loss of
                my 16 years. My lifeline was irreparably severed or so I
                thought. But my mom lives on through my memories, her enduring
                love, and the many interests she inspired in me. She is with me
                when I ride, or when I look at a particularly vibrant, colorful
                painting. When I encounter a difficult decision I look inside
                myself and ask what would my mom do and without fail I hear her
                voice telling me, guiding me, and gently encouraging me to do
                the right thing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="text-center max-w-screen-xl mx-auto">
            <p className="h8">
              My mom's biggest legacy is her courage. Courage to experience the
              world and beyond, courage to try new things just because they are
              unknown, and courage to accept anyone and everyone for their
              differences and unique points of view. I hope to become a person
              my mom is proud of, a person full of loyalty, tolerance, and
              courage.
            </p>
            <p className="mt-16 h8 text-green-light">
              Thank you for reading my story, and your kindness and love means
              the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-16">
            <div className="image-container">
              <Image src="/assets/sc-image3.png" fill alt="story2" />
            </div>
            <div className="image-container">
              <Image src="/assets/sc-image4.png" fill alt="story2" />
            </div>
          </div>
        </div>
      </section>
      <ApplyBanner
        btnText="Apply Now"
        btnUrl="/apply-scholarship"
        title="Scholarship Recipient Application"
        titleClass="h4"
      />
      <Footer />
    </>
  );
};

export default ScholarshipRecipient;
