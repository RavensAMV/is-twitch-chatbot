const chooseRandom = (
  users,
  boostedChanceIS = 0.1,
  boostedChanceSubs = 0.2
) => {
  const chooseIndex = (array) =>
    Math.floor(Math.random() * array.length);

  const boostedUsers = [];
  const subscribers = [];
  const allUsers = [];

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
      return {winner: subscribers[randomIndex], message: " - Сработал шанс подписки на приписке!"};
    }
    
    return {winner: subscribers[randomIndex], message: " - Сработал шанс подписки!"};
  }

  random = Math.random();
  console.log(
    `Проверка юзеров с припиской: ${random} <= ${boostedChanceIS}}?`
  );

  if (boostedUsers.length > 0 && random <= boostedChanceIS) {
    const randomIndex = chooseIndex(boostedUsers);
    console.log("Сработал шанс приписки!");
    console.log(`${boostedUsers}: участник №${randomIndex}.`);
    return {winner: boostedUsers[randomIndex], message: " - Сработал шанс приписки!"};
  }

  const randomIndex = chooseIndex(allUsers);
  console.log(
    allUsers,
    "Выбор из общего числа участников, рандомный номер:",
    randomIndex
  );
  return {winner: allUsers[randomIndex], message: ' - '};
};

export default chooseRandom;
