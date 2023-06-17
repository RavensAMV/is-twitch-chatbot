
const countdown = (seconds, text, send) => {
  let remainingSeconds = seconds;
  send(`${remainingSeconds}...`);

  const intervalId = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds > 0) {
      send(`${remainingSeconds}...`);
    } else {
      clearInterval(intervalId);
      send(text);
    }
  }, 1000);
}

export default countdown;
