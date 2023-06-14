const randomizerList = new Set();

const chooseRandom = (set, boostedChance = 0.2) => {
  const chooseIndex = (array) =>
    Math.floor(Math.random() * array.length);

  const boostedUsers = [];
  const vip = ['hoolywood_', 'is_adilyator', 'ens_a_se', 'geniusooo', 'st1ch192', 'is_mainis_raev', 'nowraly'];

  for (const user of set) {
    if (user.startsWith("is_") || vip.includes(user.toLowerCase())) {
      boostedUsers.push(user);
    }
  }

  const random = Math.random();
  console.log(`Проверка юзеров с припиской: ${random} <= ${boostedChance}?`);

  if (boostedUsers.length > 0 && random <= boostedChance) {
    const randomIndex = chooseIndex(boostedUsers);
    console.log("Сработал шанс приписки!");
    console.log(`${boostedUsers}: участник №${randomIndex}.`);
    return boostedUsers[randomIndex];
  }

  const usersArray = Array.from(set);
  const randomIndex = chooseIndex(usersArray);
  console.log(
    usersArray,
    "Выбор из общего числа участников, рандомный номер:",
    randomIndex
  );
  return usersArray[randomIndex];
};

module.exports = { randomizerList, chooseRandom };
