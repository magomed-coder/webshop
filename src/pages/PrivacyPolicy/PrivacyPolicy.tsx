import { Title } from "@/components/shared/Title/Title";
import { Container } from "@/components/shared/Container/Container";
import styles from "./privacy-policy.module.css";
import { SUPPORT_EMAIL } from "@/constants/main";

const PrivacyPolicy = () => {
  return (
    <Container>
      <section className={styles.section}>
        <Title title="Политика конфиденциальности" />
        <p className={styles.paragraph}>
          Для пользователей сервиса{" "}
          <span className={styles.brand}>Share&Earn</span>
        </p>
        <p className={styles.paragraph}>Версия от 20.07.2025</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>1. Общие положения</h2>
        <p className={styles.paragraph}>
          Настоящая Политика конфиденциальности определяет порядок сбора,
          использования и защиты персональных данных пользователей приложения{" "}
          <span className={styles.brand}>Share&Earn</span>.
        </p>
        <p className={styles.paragraph}>
          Используя приложение, вы подтверждаете своё согласие с условиями
          настоящей Политики.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>2. Какие данные мы собираем</h2>
        <p className={styles.paragraph}>
          В рамках работы приложения мы можем обрабатывать следующие данные:
        </p>
        <p className={styles.paragraph}>— адрес электронной почты (email);</p>
        <p className={styles.paragraph}>— номер телефона для связи.</p>
        <p className={styles.paragraph}>
          Данные предоставляются пользователем добровольно.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>3. Цели обработки данных</h2>
        <p className={styles.paragraph}>
          Персональные данные используются исключительно для:
        </p>
        <p className={styles.paragraph}>
          — обеспечения работы функционала приложения;
        </p>
        <p className={styles.paragraph}>
          — связи с пользователем и идентификации в системе.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>4. Основания для обработки</h2>
        <p className={styles.paragraph}>
          Обработка персональных данных осуществляется на основании согласия
          пользователя и его запроса на использование сервиса.
        </p>
        <p className={styles.paragraph}>
          Пользователь вправе в любой момент отозвать согласие на обработку
          данных.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>5. Передача данных третьим лицам</h2>
        <p className={styles.paragraph}>
          Мы не передаём персональные данные третьим лицам, за исключением
          случаев, предусмотренных законодательством.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>6. Защита данных</h2>
        <p className={styles.paragraph}>
          Мы принимаем необходимые технические и организационные меры для защиты
          персональных данных от несанкционированного доступа, утраты или
          изменения.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>7. Права пользователя</h2>
        <p className={styles.paragraph}>
          Пользователь имеет право запросить информацию о своих данных,
          потребовать их исправления или удаления, а также отозвать согласие на
          обработку.
        </p>
        <p className={styles.paragraph}>
          Для обращения используйте email:{" "}
          <span className={styles.brand}>{SUPPORT_EMAIL}</span>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>8. Изменения в Политике</h2>
        <p className={styles.paragraph}>
          Мы оставляем за собой право изменять настоящую Политику. Актуальная
          версия всегда доступна в приложении.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>9. Контактная информация</h2>
        <p className={styles.paragraph}>
          По вопросам обработки персональных данных:
        </p>
        <p className={styles.paragraph}>
          Email: <span className={styles.brand}>s{SUPPORT_EMAIL}</span>
        </p>
      </section>
    </Container>
  );
};

export default PrivacyPolicy;
