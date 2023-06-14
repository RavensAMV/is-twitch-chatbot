require("dotenv").config();
const tmi = require("tmi.js");

const countdown = require("./utils/countdown");
const { randomizerList, chooseRandom } = require("./utils/randomize");

const connection = (channel) => {
  const client = new tmi.Client({
    options: { debug: true },
    connection: {
      reconnect: true,
      secure: true,
    },
    identity: {
      username: "is_helper",
      password: process.env.TOKEN,
    },
    channels: [channel],
  });

  const send = (message) => {
    client.action(channel, message);
  };

  client.connect();

  client.on("message", (channel, tags, message, self) => {
    const messageFixed = message.trim().toLowerCase();

    // РАНДОМАЙЗЕР: КОММАНДЫ
    // !игра
    // !заново #private
    // !выбор #private
    // !количество #private

    if (messageFixed.toLowerCase() === "!игра") {
      randomizerList.add(tags["display-name"]);
      console.log(randomizerList);
    }

    if (
      messageFixed.toLowerCase() === "!заново" &&
      (tags["username"] === channel.replace("#", "") ||
        tags["username"] === "geniusooo")
    ) {
      randomizerList.clear();
      send(
        `@${tags["display-name"]}, Список участников рандомайзера очищен FBtouchdown`
      );
      console.log("Список участников рандомайзера очищен...");
    }

    if (
      messageFixed.toLowerCase() === "!выбор" &&
      (tags["username"] === channel.replace("#", "") ||
        tags["username"] === "geniusooo")
    ) {
      if (randomizerList.size > 0) {
        const lucky = chooseRandom(randomizerList);
        randomizerList.clear();
        console.log("Победитель:", lucky);
        countdown(
          `@${tags["display-name"]}, Победитель: @${lucky}! GlitchCat`,
          send
        );
      } else {
        send(
          `@${tags["display-name"]}, Список участников пуст PixelBob`
        );
      }
    }

    if (
      messageFixed.toLowerCase() === "!участники" &&
      (tags["username"] === channel.replace("#", "") ||
        tags["username"] === "geniusooo")
    ) {
      send(
        `@${tags["display-name"]}, Количество участников: ${randomizerList.size}`
      );
    }

    // NEXT
  });
};

connection("igorstankevich");
