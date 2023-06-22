const chooseRandom = (
  users,
  boostedChanceIS = 0.15,
  boostedChanceSubs = 0.3
) => {
  const chooseIndex = (array) =>
    Math.floor(Math.random() * array.length);



  const boostedUsers = [];
  const subscribers = [];
  const allUsers = [];

    const messageGenerator = (winner) => {
    if (boostedUsers.includes(winner) && subscribers.includes(winner)) {
      return " - Сработал шанс подписки на приписке!";
    }

      if (boostedUsers.includes(winner)) {
        return " - Сработал шанс приписки!"
      }

      if (subscribers.includes(winner)) {
        return " - Сработал шанс подписки!"
      }

      return "";
  };

  for (const user of Object.keys(users)) {
    if (user.startsWith("is_")) {
      boostedUsers.push(user);
    }

    if (users[user].subscriber) {
      subscribers.push(user);
    }

    allUsers.push(user);
  }

  let random = Math.random();

  console.log(
    `Проверка юзеров с подпиской: ${random} <= ${boostedChanceSubs}}?`
  );

  if (subscribers.length > 0 && random <= boostedChanceSubs) {
    const randomIndex = chooseIndex(subscribers);
    console.log("Сработал шанс подписки!");
    console.log(`${subscribers}: участник №${randomIndex}.`);

    if (subscribers[randomIndex].toLowerCase().startsWith('is_')) {
      return {winner: subscribers[randomIndex], message: messageGenerator(subscribers[randomIndex])};
    }
    
    return {winner: subscribers[randomIndex], message: messageGenerator(subscribers[randomIndex])};
  }

  random = Math.random();
  console.log(
    `Проверка юзеров с припиской: ${random} <= ${boostedChanceIS}}?`
  );

  if (boostedUsers.length > 0 && random <= boostedChanceIS) {
    const randomIndex = chooseIndex(boostedUsers);
    console.log("Сработал шанс приписки!");
    console.log(`${boostedUsers}: участник №${randomIndex}.`);
    return {winner: boostedUsers[randomIndex], message: messageGenerator(boostedUsers[randomIndex])};
  }

  const randomIndex = chooseIndex(allUsers);
  console.log(
    allUsers,
    "Выбор из общего числа участников, рандомный номер:",
    randomIndex
  );
  return {winner: allUsers[randomIndex], message: messageGenerator(allUsers[randomIndex])};
};

export default chooseRandom;
