namespace CoolDownGame {
  export interface PlayerData {
    id: "cool" | "down";
    side: "left" | "right";
    remainingTime: number;
    lastTimerStart: number;
  }

  export interface Guess {
    player: "cool" | "down";
    country: string;
  }
}

export class CoolDownGame {
  static interval: NodeJS.Timeout;

  static STARTING_SECONDS = 20;
  static STARTING_TIME = CoolDownGame.STARTING_SECONDS * 1000;

  static pointsPerMetric = 3000;

  static p1: CoolDownGame.PlayerData = {
    id: "cool",
    side: "left",
    remainingTime: CoolDownGame.STARTING_TIME,
    lastTimerStart: 0,
  };
  static p2: CoolDownGame.PlayerData = {
    id: "down",
    side: "right",
    remainingTime: CoolDownGame.STARTING_TIME,
    lastTimerStart: 0,
  };

  static activePlayer = CoolDownGame.p1;
  static guesses: CoolDownGame.Guess[] = [];

  static get inactivePlayer() {
    if (this.activePlayer === CoolDownGame.p1) {
      return CoolDownGame.p2;
    } else {
      return CoolDownGame.p1;
    }
  }

  static get input(): HTMLInputElement {
    return document.getElementById("country-input") as HTMLInputElement;
  }

  static updateTimer() {
    const now = Date.now();

    const remaining =
      CoolDownGame.activePlayer.lastTimerStart +
      CoolDownGame.activePlayer.remainingTime -
      now;

    const s = Math.max(Math.round((remaining / 1000) % 60), 0);
    const ms = Math.max(Math.round(remaining % 1000), 0);

    document.getElementById("timer-text")!.innerText = `${s}:${ms}`;
    document.getElementById(`${CoolDownGame.activePlayer.id}-time`)!.innerText =
      `${s}:${ms}`;

    if (remaining < 0) {
      CoolDownGame.endGame();
    }

    const range = CoolDownGame.STARTING_TIME;
    const inverseRemaining = range - remaining;
    const red = Math.max(Math.min(inverseRemaining / range, 1), 0) * 255;
    const blue = Math.max(Math.min(remaining / range, 1) * 255, 0);

    const colour = `rgb(${red}, 0, ${blue})`;
    document.getElementById("cool-down-main")!.style.background =
      `linear-gradient(180deg, var(--background), ${colour})`;
  }

  static getData(country: string) {
    return CoolDownGame.countryData[
      country.trim().toLowerCase() as keyof typeof CoolDownGame.countryData
    ];
  }

  static shakeInput() {
    CoolDownGame.input.classList.add("error");
    setTimeout(() => {
      CoolDownGame.input.classList.remove("error");
    }, 500);
  }

  static tryCountry(country: string) {
    if (CoolDownGame.getData(country) === undefined) {
      CoolDownGame.shakeInput();
      console.log(`Invalid input: ${country} not recognized`);
      return; // add visible error
    }

    if (CoolDownGame.guesses.map((g) => g.country).includes(country)) {
      console.log(`Invalid input: ${country} previously guessed`);
      CoolDownGame.shakeInput();
      return; // add visible error
    }

    const { avg_latitude: latitude, avg_temp: temperature } =
      CoolDownGame.getData(country);

    const percentageHot =
      (temperature - CoolDownGame.minTemp) /
      (CoolDownGame.maxTemp - CoolDownGame.minTemp);
    const percentageCool = 1 - percentageHot;

    const percentageUp =
      (latitude - CoolDownGame.minLat) /
      (CoolDownGame.maxLat - CoolDownGame.minLat);
    const percentageDown = 1 - percentageUp;

    // update time
    CoolDownGame.activePlayer.remainingTime -=
      Date.now() - CoolDownGame.activePlayer.lastTimerStart;
    CoolDownGame.activePlayer.lastTimerStart = Date.now();

    const coolPoints = Math.round(
      CoolDownGame.pointsPerMetric * percentageCool,
    );
    const downPoints = Math.round(
      CoolDownGame.pointsPerMetric * percentageDown,
    );

    CoolDownGame.activePlayer.remainingTime += coolPoints + downPoints;

    CoolDownGame.updateTimer();

    // log guess
    CoolDownGame.guesses.push({
      country,
      player: CoolDownGame.activePlayer.id,
    });

    document.getElementById(
      `${CoolDownGame.activePlayer.id}-guesses`,
    )!.innerHTML += `<div class="guess">
        <span class="countryName">${country}</span>
        <span class="countryScore">(${Math.round(percentageCool * 100)}% cool, ${Math.round(percentageDown * 100)}% down)</span>
      </div>`;

    // switch out player
    CoolDownGame.activePlayer =
      CoolDownGame.activePlayer.id === "cool"
        ? CoolDownGame.p2
        : CoolDownGame.p1;

    CoolDownGame.activePlayer.lastTimerStart = Date.now();

    document.getElementById("current-player")!.innerText =
      `team ${CoolDownGame.activePlayer.side}`;
    CoolDownGame.input.value = "";

    // update points per metric
    console.log(CoolDownGame.pointsPerMetric);
    if (CoolDownGame.activePlayer === CoolDownGame.p1) {
      CoolDownGame.pointsPerMetric *= 0.9;
    }
  }

  static endGame() {
    clearInterval(CoolDownGame.interval);

    document.getElementById("playable-center-col")!.classList.remove("active");
    document.getElementById("endgame-center-col")!.classList.add("active");

    document.getElementById("winning-team")!.innerHTML =
      `team ${CoolDownGame.inactivePlayer.side} wins!`;
  }

  static startGame() {
    const input = CoolDownGame.input;
    input.placeholder = "enter any country to begin";

    this.p1.lastTimerStart = Date.now();
    this.p2.lastTimerStart = Date.now();

    input.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.key === "Enter") {
        CoolDownGame.tryCountry(input.value);
      }
    });

    CoolDownGame.interval = setInterval(() => {
      CoolDownGame.updateTimer();
    }, 16);

    document.getElementById("tutorial-contents")!.classList.remove("active");
    document.getElementById("game-contents")!.classList.add("active");

    CoolDownGame.guesses = [];
  }

  static init() {
    document.getElementById("start-button")!.addEventListener("click", () => {
      CoolDownGame.startGame();
    });
  }

  static readonly countryData: {
    [name: string]: { avg_temp: number; avg_latitude: number };
  } = {
    afghanistan: { avg_temp: 12, avg_latitude: 33 },
    albania: { avg_temp: 15, avg_latitude: 41 },
    algeria: { avg_temp: 25, avg_latitude: 28 },
    andorra: { avg_temp: 10, avg_latitude: 42.5 },
    angola: { avg_temp: 21, avg_latitude: -12.5 },
    "antigua and barbuda": { avg_temp: 27, avg_latitude: 17.05 },
    argentina: { avg_temp: 14, avg_latitude: -34 },
    armenia: { avg_temp: 11, avg_latitude: 40 },
    australia: { avg_temp: 21, avg_latitude: -25 },
    austria: { avg_temp: 8, avg_latitude: 47.3333 },
    azerbaijan: { avg_temp: 12, avg_latitude: 40.5 },
    bahamas: { avg_temp: 25, avg_latitude: 24.25 },
    bahrain: { avg_temp: 27, avg_latitude: 26 },
    bangladesh: { avg_temp: 25, avg_latitude: 24 },
    barbados: { avg_temp: 26, avg_latitude: 13.1667 },
    belarus: { avg_temp: 7, avg_latitude: 53 },
    belgium: { avg_temp: 10, avg_latitude: 50.8333 },
    belize: { avg_temp: 25, avg_latitude: 17.25 },
    benin: { avg_temp: 27, avg_latitude: 9.5 },
    bhutan: { avg_temp: 12, avg_latitude: 27.5 },
    bolivia: { avg_temp: 20, avg_latitude: -17 },
    "bosnia and herzegovina": { avg_temp: 10, avg_latitude: 44 },
    botswana: { avg_temp: 22, avg_latitude: -22 },
    brazil: { avg_temp: 25, avg_latitude: -10 },
    brunei: { avg_temp: 27, avg_latitude: 4.5 },
    bulgaria: { avg_temp: 11, avg_latitude: 43 },
    "burkina faso": { avg_temp: 28, avg_latitude: 13 },
    burundi: { avg_temp: 20, avg_latitude: -3.5 },
    "cabo verde": { avg_temp: 24, avg_latitude: 16 },
    cambodia: { avg_temp: 27, avg_latitude: 13 },
    cameroon: { avg_temp: 25, avg_latitude: 6 },
    canada: { avg_temp: -5, avg_latitude: 60 },
    "central african republic": { avg_temp: 26, avg_latitude: 7 },
    chad: { avg_temp: 28, avg_latitude: 15 },
    chile: { avg_temp: 14, avg_latitude: -30 },
    china: { avg_temp: 9, avg_latitude: 35 },
    colombia: { avg_temp: 24, avg_latitude: 4 },
    comoros: { avg_temp: 25, avg_latitude: -12.1667 },
    "congo, democratic republic of the": { avg_temp: 25, avg_latitude: -2 },
    "congo, republic of the": { avg_temp: 25, avg_latitude: -1 },
    "costa rica": { avg_temp: 25, avg_latitude: 10 },
    croatia: { avg_temp: 14, avg_latitude: 45.1667 },
    cuba: { avg_temp: 25, avg_latitude: 21.5 },
    cyprus: { avg_temp: 19, avg_latitude: 35 },
    "czech republic": { avg_temp: 8, avg_latitude: 49.75 },
    denmark: { avg_temp: 8, avg_latitude: 56 },
    djibouti: { avg_temp: 30, avg_latitude: 11.5 },
    dominica: { avg_temp: 26, avg_latitude: 15.4167 },
    "dominican republic": { avg_temp: 25, avg_latitude: 19 },
    ecuador: { avg_temp: 20, avg_latitude: -2 },
    egypt: { avg_temp: 22, avg_latitude: 27 },
    "el salvador": { avg_temp: 25, avg_latitude: 13.8333 },
    "equatorial guinea": { avg_temp: 25, avg_latitude: 2 },
    eritrea: { avg_temp: 25, avg_latitude: 15 },
    estonia: { avg_temp: 5, avg_latitude: 59 },
    eswatini: { avg_temp: 20, avg_latitude: -26.5 },
    ethiopia: { avg_temp: 20, avg_latitude: 8 },
    fiji: { avg_temp: 25, avg_latitude: -18 },
    finland: { avg_temp: 2, avg_latitude: 64 },
    france: { avg_temp: 11, avg_latitude: 46 },
    gabon: { avg_temp: 25, avg_latitude: -1 },
    gambia: { avg_temp: 27, avg_latitude: 13.4667 },
    georgia: { avg_temp: 12, avg_latitude: 42 },
    germany: { avg_temp: 9, avg_latitude: 51 },
    ghana: { avg_temp: 27, avg_latitude: 8 },
    greece: { avg_temp: 18, avg_latitude: 39 },
    grenada: { avg_temp: 26, avg_latitude: 12.1167 },
    guatemala: { avg_temp: 25, avg_latitude: 15.5 },
    guinea: { avg_temp: 27, avg_latitude: 11 },
    "guinea-bissau": { avg_temp: 27, avg_latitude: 12 },
    guyana: { avg_temp: 27, avg_latitude: 5 },
    haiti: { avg_temp: 25, avg_latitude: 19 },
    honduras: { avg_temp: 25, avg_latitude: 15 },
    hungary: { avg_temp: 11, avg_latitude: 47 },
    iceland: { avg_temp: 2, avg_latitude: 65 },
    india: { avg_temp: 24, avg_latitude: 20 },
    indonesia: { avg_temp: 27, avg_latitude: -5 },
    iran: { avg_temp: 17, avg_latitude: 32 },
    iraq: { avg_temp: 22, avg_latitude: 33 },
    ireland: { avg_temp: 10, avg_latitude: 53 },
    israel: { avg_temp: 20, avg_latitude: 31.5 },
    italy: { avg_temp: 15, avg_latitude: 42.8333 },
    jamaica: { avg_temp: 27, avg_latitude: 18.25 },
    japan: { avg_temp: 15, avg_latitude: 36 },
    jordan: { avg_temp: 18, avg_latitude: 31 },
    kazakhstan: { avg_temp: 6, avg_latitude: 48 },
    kenya: { avg_temp: 20, avg_latitude: 1 },
    kiribati: { avg_temp: 28, avg_latitude: 1.4167 },
    "north korea": { avg_temp: 8, avg_latitude: 40 },
    "south korea": { avg_temp: 12, avg_latitude: 37 },
    kuwait: { avg_temp: 28, avg_latitude: 29.5 },
    kyrgyzstan: { avg_temp: 10, avg_latitude: 41 },
    laos: { avg_temp: 25, avg_latitude: 18 },
    latvia: { avg_temp: 6, avg_latitude: 57 },
    lebanon: { avg_temp: 18, avg_latitude: 33.8333 },
    lesotho: { avg_temp: 15, avg_latitude: -29.5 },
    liberia: { avg_temp: 27, avg_latitude: 6.5 },
    libya: { avg_temp: 22, avg_latitude: 25 },
    liechtenstein: { avg_temp: 10, avg_latitude: 47.1667 },
    lithuania: { avg_temp: 6, avg_latitude: 56 },
    luxembourg: { avg_temp: 9, avg_latitude: 49.75 },
    madagascar: { avg_temp: 25, avg_latitude: -20 },
    malawi: { avg_temp: 22, avg_latitude: -13.5 },
    malaysia: { avg_temp: 27, avg_latitude: 2.5 },
    maldives: { avg_temp: 28, avg_latitude: 3.25 },
    mali: { avg_temp: 28, avg_latitude: 17 },
    malta: { avg_temp: 19, avg_latitude: 35.8333 },
    "marshall islands": { avg_temp: 27, avg_latitude: 9 },
    mauritania: { avg_temp: 28, avg_latitude: 20 },
    mauritius: { avg_temp: 25, avg_latitude: -20.2833 },
    mexico: { avg_temp: 21, avg_latitude: 23 },
    micronesia: { avg_temp: 27, avg_latitude: 6.9167 },
    moldova: { avg_temp: 10, avg_latitude: 47 },
    monaco: { avg_temp: 16, avg_latitude: 43.7333 },
    mongolia: { avg_temp: -2, avg_latitude: 46 },
    montenegro: { avg_temp: 14, avg_latitude: 42 },
    morocco: { avg_temp: 18, avg_latitude: 32 },
    mozambique: { avg_temp: 25, avg_latitude: -18.25 },
    myanmar: { avg_temp: 27, avg_latitude: 22 },
    namibia: { avg_temp: 20, avg_latitude: -22 },
    nauru: { avg_temp: 28, avg_latitude: -0.5333 },
    nepal: { avg_temp: 15, avg_latitude: 28 },
    netherlands: { avg_temp: 10, avg_latitude: 52.5 },
    "new zealand": { avg_temp: 10, avg_latitude: -41 },
    nicaragua: { avg_temp: 27, avg_latitude: 13 },
    niger: { avg_temp: 28, avg_latitude: 16 },
    nigeria: { avg_temp: 27, avg_latitude: 10 },
    "north macedonia": { avg_temp: 12, avg_latitude: 41.8333 },
    norway: { avg_temp: 2, avg_latitude: 62 },
    oman: { avg_temp: 28, avg_latitude: 21 },
    pakistan: { avg_temp: 21, avg_latitude: 30 },
    palau: { avg_temp: 28, avg_latitude: 7.5 },
    panama: { avg_temp: 27, avg_latitude: 9 },
    "papua new guinea": { avg_temp: 25, avg_latitude: -6 },
    paraguay: { avg_temp: 24, avg_latitude: -23 },
    peru: { avg_temp: 19, avg_latitude: -10 },
    philippines: { avg_temp: 27, avg_latitude: 13 },
    poland: { avg_temp: 8, avg_latitude: 52 },
    portugal: { avg_temp: 16, avg_latitude: 39.5 },
    qatar: { avg_temp: 28, avg_latitude: 25.5 },
    romania: { avg_temp: 10, avg_latitude: 46 },
    russia: { avg_temp: -5, avg_latitude: 60 },
    rwanda: { avg_temp: 20, avg_latitude: -2 },
    "saint kitts and nevis": { avg_temp: 27, avg_latitude: 17.3333 },
    "saint lucia": { avg_temp: 27, avg_latitude: 13.8833 },
    "saint vincent and the grenadines": { avg_temp: 27, avg_latitude: 13.25 },
    samoa: { avg_temp: 27, avg_latitude: -13.5833 },
    "san marino": { avg_temp: 14, avg_latitude: 43.9333 },
    "sao tome and principe": { avg_temp: 25, avg_latitude: 1 },
    "saudi arabia": { avg_temp: 28, avg_latitude: 25 },
    senegal: { avg_temp: 27, avg_latitude: 14 },
    serbia: { avg_temp: 11, avg_latitude: 44 },
    seychelles: { avg_temp: 27, avg_latitude: -4.5833 },
    "sierra leone": { avg_temp: 27, avg_latitude: 8.5 },
    singapore: { avg_temp: 28, avg_latitude: 1.3667 },
    slovakia: { avg_temp: 9, avg_latitude: 48.6667 },
    slovenia: { avg_temp: 10, avg_latitude: 46 },
    "solomon islands": { avg_temp: 27, avg_latitude: -8 },
    somalia: { avg_temp: 27, avg_latitude: 10 },
    "south africa": { avg_temp: 17, avg_latitude: -29 },
    "south sudan": { avg_temp: 27, avg_latitude: 7.5 },
    spain: { avg_temp: 15, avg_latitude: 40 },
    "sri lanka": { avg_temp: 27, avg_latitude: 7 },
    sudan: { avg_temp: 28, avg_latitude: 15 },
    suriname: { avg_temp: 27, avg_latitude: 4 },
    sweden: { avg_temp: 2, avg_latitude: 62 },
    switzerland: { avg_temp: 8, avg_latitude: 47 },
    syria: { avg_temp: 18, avg_latitude: 35 },
    taiwan: { avg_temp: 23, avg_latitude: 23.5 },
    tajikistan: { avg_temp: 12, avg_latitude: 39 },
    tanzania: { avg_temp: 25, avg_latitude: -6 },
    thailand: { avg_temp: 27, avg_latitude: 15 },
    "timor-leste": { avg_temp: 27, avg_latitude: -8.8333 },
    togo: { avg_temp: 27, avg_latitude: 8 },
    tonga: { avg_temp: 25, avg_latitude: -20 },
    "trinidad and tobago": { avg_temp: 27, avg_latitude: 11 },
    tunisia: { avg_temp: 20, avg_latitude: 34 },
    turkey: { avg_temp: 13, avg_latitude: 39 },
    turkmenistan: { avg_temp: 15, avg_latitude: 40 },
    tuvalu: { avg_temp: 28, avg_latitude: -8 },
    uganda: { avg_temp: 20, avg_latitude: 1 },
    ukraine: { avg_temp: 7, avg_latitude: 49 },
    "united arab emirates": { avg_temp: 28, avg_latitude: 24 },
    "united kingdom": { avg_temp: 10, avg_latitude: 54 },
    "united states": { avg_temp: 12, avg_latitude: 38 },
    uruguay: { avg_temp: 17, avg_latitude: -33 },
    uzbekistan: { avg_temp: 15, avg_latitude: 41 },
    vanuatu: { avg_temp: 25, avg_latitude: -16 },
    "vatican city": { avg_temp: 15, avg_latitude: 41.9 },
    venezuela: { avg_temp: 27, avg_latitude: 8 },
    vietnam: { avg_temp: 25, avg_latitude: 16 },
    yemen: { avg_temp: 25, avg_latitude: 15 },
    zambia: { avg_temp: 22, avg_latitude: -15 },
    zimbabwe: { avg_temp: 20, avg_latitude: -19 },
  };

  static minTemp = Object.values(CoolDownGame.countryData)
    .map(({ avg_temp }) => avg_temp)
    .reduce((prev, current) => Math.min(prev, current), Infinity);

  static maxTemp = Object.values(CoolDownGame.countryData)
    .map(({ avg_temp }) => avg_temp)
    .reduce((prev, current) => Math.max(prev, current), -Infinity);

  static minLat = Object.values(CoolDownGame.countryData)
    .map(({ avg_latitude }) => avg_latitude)
    .reduce((prev, current) => Math.min(prev, current), Infinity);

  static maxLat = Object.values(CoolDownGame.countryData)
    .map(({ avg_latitude }) => avg_latitude)
    .reduce((prev, current) => Math.max(prev, current), -Infinity);
}
