function Header() {
  return (
    <div className="header">
      <ul>
        <li className="logo">
          <a href="/">workbench</a>
        </li>
        <li>
          <a href="tickets">
            <b>Тикеты</b>
          </a>
        </li>
        <li>
          <a href="requests">
            <b>Заявки</b>
          </a>
        </li>
        <li>
          <a href="clients">
            <b>Клиенты</b>
          </a>
        </li>
        <li>
          <a href="monitoring">
            <b>Мониторинг</b>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Header;
