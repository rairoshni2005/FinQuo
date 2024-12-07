import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${index !== 2 ? "mb-6" : "mb-0"
      } feature-card bg-black-gradient hover:shadow-lg`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-white`}
    >
      <img src={icon} alt="feature-icon" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-4">
      <h4 className="font-poppins font-semibold text-gradient text-[20px] leading-[25px] mb-2">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => {
  const features = [
    {
      id: 1,
      icon: "", // Replace with the path to your Learning icon
      title: "Personalized Learning",
      content:
        "Explore tailored lessons designed to help you master budgeting, saving, and investing with engaging content.",
    },
    {
      id: 2,
      icon: "/assets/mock-stock-icon.png", // Replace with the path to your Mock Stock icon
      title: "Mock Stock Trading",
      content:
        "Experience hands-on investment strategies through simulated trading scenarios and portfolio building.",
    },
    {
      id: 3,
      icon: "/assets/community-icon.png", // Replace with the path to your Community icon
      title: "Community Forum",
      content:
        "Connect with a vibrant network of peers, share insights, and discuss financial trends and best practices.",
    },
  ];

  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={`${styles.heading2} text-gradient`}>
          Revolutionize Financial Education <br className="sm:block hidden" /> with AI-Powered Tools
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Dive into a unique blend of education, gamification, and peer learning.
          Unlock financial freedom with tools tailored to enhance your financial knowledge.
        </p>

        <Button styles={`mt-10`} />
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;
