const countdown = (message, send) => {
  send("3...");
  setTimeout(() => {
    send("2...");
    setTimeout(() => {
      send("1...");
      setTimeout(() => send(message), 1000);
    }, 1000);
  }, 1000);
};

export default countdown;
