import styles from "../Home.module.css";

function TicketItem({ticket}) {
  return (
    <div href="#" key={ticket.id} className={styles.item}>
      <a href="#">
        <ul className={styles.itemList}>
          <li className={styles.title}>
            <b>{ticket.title}</b>
          </li>
          <li className={styles.description}>{ticket.description}</li>
          <li className={styles.status}>{ticket.status}</li>
        </ul>
      </a>
    </div>
  );
}
export default TicketItem;
