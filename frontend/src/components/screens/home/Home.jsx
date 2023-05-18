import styles from "./Home.module.css";
import globalStyles from "../../../assets/styles/global.css";
import { useState, useEffect } from "react";
import { tickets as ticketsData } from "./tickets.data.js";
import TicketItem from "./ticket-item/TicketItem";
import CreateTicketForm from "./create-ticket-form/CreateTicketForm";
import Header from "./Header";

function Home() {
  const [tickets, setTickets] = useState([]);
  console.log(tickets);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY0MDQyNWJmYzhhOWVjNjEwOTFmOTIiLCJpYXQiOjE2ODQyNzYyNjEsImV4cCI6MTY4Njg2ODI2MX0.wRuL_E1tfgkIAr1KzwFSCnLRbBjd9nbxYGS-xJIbYRM";
      
        const response = await fetch("http://37.220.85.199:4444/tickets", {
        "Authorization": `Bearer ${token}`,
        //"Access-Control-Allow-Origin":"*",
      });
      const data = await response.json();

      console.log(response);

      setTickets(data);
    };

    fetchData();
  }, []);

  return (
    <div className="main">
      <Header />
      <CreateTicketForm setTickets={setTickets} />
      <div>
        {tickets.length ? (
          tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <p className="noTickets">There are no tickets</p>
        )}
      </div>
    </div>
  );
}

export default Home;
