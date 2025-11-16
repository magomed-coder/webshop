import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Dashboard</h1>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Заказы</div>
          <div className={styles.cardContent}>Всего заказов: 123</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Товары</div>
          <div className={styles.cardContent}>Всего товаров: 54</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Пользователи</div>
          <div className={styles.cardContent}>Всего пользователей: 87</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Оплаты</div>
          <div className={styles.cardContent}>Последняя оплата: 10 000 ₽</div>
        </div>
      </div>
    </div>
  );
}
