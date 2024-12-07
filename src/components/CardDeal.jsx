import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Master the Stock Market<br className="sm:block hidden" /> in Just a Few Steps.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Uncover the secrets of investing with our AI-powered insights. Learn to analyze
        market trends, make informed decisions, and grow your portfolio confidently.
        Whether you're a beginner or a seasoned trader, we've got you covered.

      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
