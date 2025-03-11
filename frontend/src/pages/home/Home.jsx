import React from "react";
import backgroundImage from "@/assets/background.jpg";
import { BotIcon, User2Icon, UserIcon } from "lucide-react";
import middlemanImage from "@/assets/middleman.png";
import nomiddlemantImage from "@/assets/nomiddleman.png";
import arrowImage from "@/assets/arrow.png";
import ecommerceImage from "@/assets/ecommerce.png";
import blogImage from "@/assets/blog.png";
import resourcesImage from "@/assets/resources.png";
import hirecontractorImage from "@/assets/hirecontractor.png";
import weatherImage from "@/assets/weather.png";
import chatbotImage from "@/assets/chatbot.png";
import FAQs from "./FAQs";

const Home = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="h-[90vh] w-full bg-cover bg-center"
      >
        <div className="text-primary-foreground h-[90vh] bg-black/50 px-14 pt-40">
          <div className="mx-auto max-w-7xl space-y-14 px-7">
            <h1 className="w-1/2 font-serif text-5xl leading-[64px] font-semibold tracking-wide">
              Farmers plant hope, harvest strength.{" "}
            </h1>
            <p className="w-1/2 text-lg leading-8 font-medium tracking-wide">
              {" "}
              Farmers are the heart of our land, turning hard work into harvests
              and hope into growth. With unwavering dedication and faith in the
              soil, they nurture the earth to feed the world. Their resilience
              and commitment inspire us to build a better tomorrow, one seed at
              a time.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="py-20">
          <div className="mx-auto max-w-7xl space-y-28 px-7">
            <div className="space-y-7 text-center text-4xl font-bold">
              <h1>Uplaod your corps details and</h1>
              <h1>
                get{" "}
                <span className="bg-primary rounded-sm px-2 py-1 text-white">
                  best value without middleman
                </span>
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <img src={middlemanImage} alt="" />
              <img src={arrowImage} alt="" />
              <img src={nomiddlemantImage} alt="" />
            </div>
          </div>
        </div>
        <div className="bg-muted py-20">
          <div className="mx-auto max-w-7xl space-y-16 px-7">
            <div>
              <h1 className="text-center text-4xl font-bold">Why Choose Us?</h1>
            </div>
            <div className="grid grid-cols-3 gap-16">
              <div>
                <img src={ecommerceImage} alt="" className="mx-auto size-14" />
                <h2 className="text-primary pt-5 pb-2 text-center text-xl font-semibold">
                  Crops E-Commerce
                </h2>
                <p className="text-muted-foreground px-7 text-sm leading-6">
                  {" "}
                  We offer a comprehensive range of solutions designed to
                  simplify and enhance your experience. Explore our unique
                  features tailored to address your specific needs.
                </p>
              </div>
              <div>
                <img src={blogImage} alt="" className="mx-auto size-14" />
                <h2 className="text-primary pt-5 pb-2 text-center text-xl font-semibold">
                  Share your doubts
                </h2>
                <p className="text-muted-foreground px-7 text-sm leading-6">
                  Join our community-driven platform to share your questions and
                  receive expert advice and peer support on various topics,
                  ensuring you never feel stuck alone.
                </p>
              </div>
              <div>
                <img src={resourcesImage} alt="" className="mx-auto size-14" />
                <h2 className="text-primary pt-5 pb-2 text-center text-xl font-semibold">
                  Resources
                </h2>
                <p className="text-muted-foreground px-7 text-sm leading-6">
                  Access a curated collection of resources, guides, and tools
                  designed to enhance your learning and productivity, making it
                  easier to find what you need.
                </p>
              </div>
              <div>
                <img
                  src={hirecontractorImage}
                  alt=""
                  className="mx-auto size-14"
                />
                <h2 className="text-primary pt-5 pb-2 text-center text-xl font-semibold">
                  Hire contracgtors
                </h2>
                <p className="text-muted-foreground px-7 text-sm leading-6">
                  Simplify your project management by finding and hiring skilled
                  contractors effortlessly. Connect directly with professionals
                  suited to your needs.
                </p>
              </div>
              <div>
                <img src={weatherImage} alt="" className="mx-auto size-14" />
                <h2 className="text-primary pt-5 pb-2 text-center text-xl font-semibold">
                  Weather{" "}
                </h2>
                <p className="text-muted-foreground px-7 text-sm leading-6">
                  Stay informed with real-time weather updates, forecasts, and
                  insights to plan your day efficiently, whether for travel or
                  agricultural needs.
                </p>
              </div>
              <div>
                <img src={chatbotImage} alt="" className="mx-auto size-14" />
                <h2 className="text-primary pt-5 pb-2 text-center text-xl font-semibold">
                  Chatbot{" "}
                </h2>
                <p className="text-muted-foreground px-7 text-sm leading-6">
                  Get instant assistance and information through our intelligent
                  chatbot, designed to answer your queries quickly and
                  accurately.
                </p>
              </div>
            </div>
          </div>
        </div>
        <FAQs />
      </div>
    </>
  );
};

export default Home;
