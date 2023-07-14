import "dotenv/config";
import tmi from "tmi.js";

import express from "express";
const app = express();
app.listen(3000, () => console.log("Server is up and running..."));
app.get("/", (req, res) => res.sendStatus(200));

import countdown from "./utils/countdown.js";
import chooseRandom from "./utils/randomize.js";

const connection = (channel) => {
  const client = new tmi.Client({
    options: { debug: false },
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

  let previousWinner = "";
  let randomizerList = {};
  const ignoreUsers = process.env.ban.split(', ');

  client.on("message", (channel, tags, message) => {
    const messageFixed = message.trim().toLowerCase();

    //////////////////////////////////////////
    // РАНДОМАЙЗЕР: КОММАНДЫ
    // !игра
    // !старт #private
    // !результат #private
    // !количество #private

    if (
      messageFixed === "!игра" &&
      !randomizerList[tags["display-name"]] &&
      tags["display-name"] !== previousWinner && !ignoreUsers.includes(tags["display-name"])
    ) {
      randomizerList[tags["display-name"]] = {
        subscriber: tags["subscriber"],
      };
      console.log("Добавлен участник:", tags["display-name"]);
    }

    if (
      messageFixed === "!старт" &&
      (tags["username"] === channel.replace("#", "") ||
        tags["username"] === "geniusooo")
    ) {
      randomizerList = {};
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
      if (Object.keys(randomizerList).length > 0) {
        let lucky = chooseRandom(randomizerList);
        while (
          Object.keys(randomizerList).length > ignoreUsers.length + 1 &&
          (previousWinner === lucky.winner ||
            ignoreUsers.includes(lucky.winner))
        ) {
          lucky = chooseRandom(randomizerList);
        }
        previousWinner = lucky.winner;
        console.log("Победитель:", lucky.winner);
        countdown(5,
          `@${tags["display-name"]}, Победитель: @${lucky.winner}${lucky.message} GlitchCat`,
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
        `@${tags["display-name"]}, Количество участников: ${Object.keys(randomizerList).length}`
      );
    }

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    // NEXT
  });
};

connection("is_ravensamv");
