require("dotenv").config();
const tmi = require("tmi.js");

const express = require("express");
const app = express();
app.listen(3000, () => console.log("Server is up and running..."));
app.get("/", (req, res) => res.sendStatus(200));

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
    client.say(channel, message);
  };

  client.connect();

  /////////////////////////////////////
  // Периодические события
  client.on("connected", () => {
    setInterval(() => send("@chieeeeefkeef, Где бабки?"), 1800000);
  });
  /////////////////////////////////////

  let previousWinner = "";

  client.on("message", (channel, tags, message, self) => {
    const messageFixed = message.trim().toLowerCase();

    //////////////////////////////////////////
    // РАНДОМАЙЗЕР: КОММАНДЫ
    // !игра
    // !старт #private
    // !результат #private
    // !количество #private

    if (
      messageFixed === "!игра" &&
      !randomizerList.has(tags["display-name"])
    ) {
      randomizerList.add(tags["display-name"]);
      console.log("Добавлен участник:", tags["display-name"]);
    }

    if (
      messageFixed === "!старт" &&
      (tags["username"] === channel.replace("#", "") ||
        tags["username"] === "geniusooo")
    ) {
      randomizerList.clear();
      send(
        `@${tags["display-name"]}, Начат новый сбор участников. Напишите !игра, чтобы испытать судьбу PixelBob`
      );
      console.log("Список очищен... Начат новый сбор участников.");
    }

    if (
      messageFixed === "!результат" &&
      (tags["username"] === channel.replace("#", "") ||
        tags["username"] === "geniusooo")
    ) {
      if (randomizerList.size > 0) {
        let lucky = chooseRandom(randomizerList);
        while (previousWinner === lucky) {
          lucky = chooseRandom(randomizerList);
        }
        previousWinner = lucky;
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

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    // NEXT
  });
};

connection("igorstankevich");
