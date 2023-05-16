import { useState } from "react";
import styles from "./CreateTicketForm.module.css";

const clearData = {
  title: "",
  description: "",
  status: "new",
};

const CreateTicketForm = ({ setTickets }) => {
  const [data, setData] = useState({
    clearData: clearData,
    //priority: "low",
  });

  const createTicket = (e) => {
    e.preventDefault();

    setTickets((prev) => [{ id: prev.length + 1, ...data }, ...prev]);

    setData(clearData);
  };

  return (
    <form className={styles.form}>
      <div>
        <input
          className={styles.title}
          required
          placeholder="title"
          maxlength="15"
          onChange={(e) =>
            setData((prev) => ({ ...prev, title: e.target.value }))
          }
          value={data.title}
        />
        <input
          className={styles.description}
          required
          placeholder="description"
          maxlength="25"
          onChange={(e) =>
            setData((prev) => ({ ...prev, description: e.target.value }))
          }
          value={data.description}
        />
        <select
          className={styles.status}
          required
          onChange={(e) =>
            setData((prev) => ({ ...prev, status: e.target.value }))
          }
          value={data.status}
        >
          <option selected value="new">
            new
          </option>
          <option>in progress</option>
          <option>closed</option>
        </select>

        <button onClick={(e) => createTicket(e)}>Create</button>
      </div>
    </form>
  );
};

export default CreateTicketForm;
