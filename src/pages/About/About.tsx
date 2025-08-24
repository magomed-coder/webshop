import styles from "./about.module.css";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.header}>О нас</h1>
        <p className={styles.paragraph}>
          Добро пожаловать в <span className={styles.brand}>Share&Earn</span>!
          Мы создали эту платформу, чтобы предоставить вам уникальную
          возможность зарабатывать деньги, делая репосты в свои социальные сети.
          Если кто-то перейдёт по вашей ссылке и совершит покупку, вы получите
          вознаграждение.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>Как это работает?</h2>
        <p className={styles.paragraph}>
          1. Делитесь интересными товарами или услугами из нашего каталога в
          своих социальных сетях.
        </p>
        <p className={styles.paragraph}>
          2. Если кто-то из ваших подписчиков перейдёт по вашей уникальной
          ссылке и купит товар, вы автоматически получите комиссию.
        </p>
        <p className={styles.paragraph}>
          3. Чем больше людей покупают через ваши ссылки, тем больше вы
          зарабатываете.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>
          Почему стоит выбрать <span className={styles.brand}>Share&Earn</span>?
        </h2>
        <p className={styles.paragraph}>
          - Широкий выбор товаров: от недвижимости и автомобилей до мебели и
          бытовой техники.
        </p>
        <p className={styles.paragraph}>
          - Простота использования: никаких сложных настроек, просто делитесь и
          зарабатывайте.
        </p>
        <p className={styles.paragraph}>
          - Прозрачная система вознаграждений: отслеживайте свои доходы в личном
          кабинете.
        </p>
        <p className={styles.paragraph}>
          - Поддержка и обучение: мы поможем вам максимально эффективно
          использовать платформу.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>Наша миссия</h2>
        <p className={styles.paragraph}>
          Мы верим, что каждый может извлечь выгоду из силы социальных сетей.
          <span className={styles.brand}> Share&Earn </span>
          создано для того, чтобы вы могли зарабатывать, делая то, что любите —
          общаясь и делясь контентом с друзьями.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>
          Присоединяйтесь к <span className={styles.brand}>Share&Earn</span>!
        </h2>
        <p className={styles.paragraph}>
          Станьте частью нашего сообщества и начните зарабатывать уже сегодня.
          Вместе с <span className={styles.brand}>Share&Earn</span> мы создаём
          будущее, где каждый может получать вознаграждение за своё влияние в
          социальных сетях.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
