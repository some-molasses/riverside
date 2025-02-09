namespace CoolDownGame {
  export interface PlayerData {
    id: "cool" | "down";
    remainingTime: number;
    lastTimerStart: number;
  }

  export interface Guess {
    player: "cool" | "down";
    country: string;
    points: number;
  }
}

const STARTING_TIME = 15 * 1000;

export class CoolDownGame {
  static interval: NodeJS.Timeout;

  static p1: CoolDownGame.PlayerData = {
    id: "cool",
    remainingTime: STARTING_TIME,
    lastTimerStart: 0,
  };
  static p2: CoolDownGame.PlayerData = {
    id: "down",
    remainingTime: STARTING_TIME,
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

    const range = STARTING_TIME;
    const inverseRemaining = range - remaining;
    const red = Math.max(Math.min(inverseRemaining / range, 1), 0) * 255;
    const blue = Math.max(Math.min(remaining / range, 1) * 255, 0);

    const colour = `rgb(${red}, 0, ${blue})`;
    document.getElementById("cool-down-main")!.style.background =
      `linear-gradient(180deg, var(--background), ${colour})`;
  }

  static getLatitude(country: string): number {
    return this.countries[
      country.trim().toLowerCase() as keyof typeof CoolDownGame.countries
    ];
  }

  static tryCountry(country: string) {
    if (CoolDownGame.getLatitude(country) === undefined) {
      console.error(`${country} invalid`);
      return; // add visible error
    }

    if (CoolDownGame.guesses.map((g) => g.country).includes(country)) {
      console.error(`${country} previously guessed`);
      return; // add visible error
    }

    const latitude = CoolDownGame.getLatitude(country);

    const percentageCool = (90 - Math.abs(latitude)) / 90;
    const percentageDown = Math.abs(latitude - 90) / 180;

    // update time
    CoolDownGame.activePlayer.remainingTime -=
      Date.now() - CoolDownGame.activePlayer.lastTimerStart;
    CoolDownGame.activePlayer.lastTimerStart = Date.now();
    const pointsForGuess = Math.round(
      3000 * percentageCool + 3000 * percentageDown,
    );

    CoolDownGame.activePlayer.remainingTime += pointsForGuess;

    CoolDownGame.updateTimer();

    // switch out player
    CoolDownGame.guesses.push({
      country,
      player: CoolDownGame.activePlayer.id,
      points: pointsForGuess,
    });

    document.getElementById(
      `${CoolDownGame.activePlayer.id}-guesses`,
    )!.innerHTML += `<div class="guess">${country} (${pointsForGuess})</div>`;

    CoolDownGame.activePlayer =
      CoolDownGame.activePlayer.id === "cool"
        ? CoolDownGame.p2
        : CoolDownGame.p1;

    CoolDownGame.activePlayer.lastTimerStart = Date.now();

    document.getElementById("current-player")!.innerText =
      `team ${CoolDownGame.activePlayer.id}`;

    const input = document.getElementById("country-input") as HTMLInputElement;
    input!.value = "";
  }

  static endGame() {
    clearInterval(CoolDownGame.interval);

    document.getElementById("playable-center-col")!.classList.remove("active");
    document.getElementById("endgame-center-col")!.classList.add("active");

    document.getElementById("winning-team")!.innerHTML =
      `team ${CoolDownGame.inactivePlayer.id} wins!`;
  }

  static init() {
    const input = document.getElementById("country-input") as HTMLInputElement;
    input.placeholder = "enter any country or continent to begin";

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
  }

  static readonly countries = {
    afghanistan: 33,
    albania: 41,
    algeria: 28,
    andorra: 42.5,
    angola: -12.5,
    "antigua and barbuda": 17.05,
    argentina: -34,
    armenia: 40,
    australia: -25,
    austria: 47.3333,
    azerbaijan: 40.5,
    bahamas: 24.25,
    bahrain: 26,
    bangladesh: 24,
    barbados: 13.1667,
    belarus: 53,
    belgium: 50.8333,
    belize: 17.25,
    benin: 9.5,
    bhutan: 27.5,
    bolivia: -17,
    "bosnia and herzegovina": 44,
    botswana: -22,
    brazil: -10,
    brunei: 4.5,
    bulgaria: 43,
    "burkina faso": 13,
    burundi: -3.5,
    "cabo verde": 16,
    cambodia: 13,
    cameroon: 6,
    canada: 60,
    "central african republic": 7,
    chad: 15,
    chile: -30,
    china: 35,
    colombia: 4,
    comoros: -12.1667,
    "congo, democratic republic of the": -2,
    "congo, republic of the": -1,
    "costa rica": 10,
    croatia: 45.1667,
    cuba: 21.5,
    cyprus: 35,
    "czech republic": 49.75,
    denmark: 56,
    djibouti: 11.5,
    dominica: 15.4167,
    "dominican republic": 19,
    ecuador: -2,
    egypt: 27,
    "el salvador": 13.8333,
    "equatorial guinea": 2,
    eritrea: 15,
    estonia: 59,
    eswatini: -26.5,
    ethiopia: 8,
    fiji: -18,
    finland: 64,
    france: 46,
    gabon: -1,
    gambia: 13.4667,
    georgia: 42,
    germany: 51,
    ghana: 8,
    greece: 39,
    grenada: 12.1167,
    guatemala: 15.5,
    guinea: 11,
    "guinea-bissau": 12,
    guyana: 5,
    haiti: 19,
    honduras: 15,
    hungary: 47,
    iceland: 65,
    india: 20,
    indonesia: -5,
    iran: 32,
    iraq: 33,
    ireland: 53,
    israel: 31.5,
    italy: 42.8333,
    jamaica: 18.25,
    japan: 36,
    jordan: 31,
    kazakhstan: 48,
    kenya: 1,
    kiribati: 1.4167,
    "north korea": 40,
    "south korea": 37,
    kuwait: 29.5,
    kyrgyzstan: 41,
    laos: 18,
    latvia: 57,
    lebanon: 33.8333,
    lesotho: -29.5,
    liberia: 6.5,
    libya: 25,
    liechtenstein: 47.1667,
    lithuania: 56,
    luxembourg: 49.75,
    madagascar: -20,
    malawi: -13.5,
    malaysia: 2.5,
    maldives: 3.25,
    mali: 17,
    malta: 35.8333,
    "marshall islands": 9,
    mauritania: 20,
    mauritius: -20.2833,
    mexico: 23,
    micronesia: 6.9167,
    moldova: 47,
    monaco: 43.7333,
    mongolia: 46,
    montenegro: 42,
    morocco: 32,
    mozambique: -18.25,
    myanmar: 22,
    namibia: -22,
    nauru: -0.5333,
    nepal: 28,
    netherlands: 52.5,
    "new zealand": -41,
    nicaragua: 13,
    niger: 16,
    nigeria: 10,
    "north macedonia": 41.8333,
    norway: 62,
    oman: 21,
    pakistan: 30,
    palau: 7.5,
    panama: 9,
    "papua new guinea": -6,
    paraguay: -23,
    peru: -10,
    philippines: 13,
    poland: 52,
    portugal: 39.5,
    qatar: 25.5,
    romania: 46,
    russia: 60,
    rwanda: -2,
    "saint kitts and nevis": 17.3333,
    "saint lucia": 13.8833,
    "saint vincent and the grenadines": 13.25,
    samoa: -13.5833,
    "san marino": 43.9333,
    "sao tome and principe": 1,
    "saudi arabia": 25,
    senegal: 14,
    serbia: 44,
    seychelles: -4.5833,
    "sierra leone": 8.5,
    singapore: 1.3667,
    slovakia: 48.6667,
    slovenia: 46,
    "solomon islands": -8,
    somalia: 10,
    "south africa": -29,
    "south sudan": 7.5,
    spain: 40,
    "sri lanka": 7,
    sudan: 15,
    suriname: 4,
    sweden: 62,
    switzerland: 47,
    syria: 35,
    taiwan: 23.5,
    tajikistan: 39,
    tanzania: -6,
    thailand: 15,
    "timor-leste": -8.8333,
    togo: 8,
    tonga: -20,
    "trinidad and tobago": 11,
    tunisia: 34,
    turkey: 39,
    turkmenistan: 40,
    tuvalu: -8,
    uganda: 1,
    ukraine: 49,
    "united arab emirates": 24,
    "united kingdom": 54,
    "united states": 38,
    uruguay: -33,
    uzbekistan: 41,
    vanuatu: -16,
    "vatican city": 41.9,
    venezuela: 8,
    vietnam: 16,
    yemen: 15,
    zambia: -15,
    zimbabwe: -19,
    africa: 1,
    asia: 34,
    europe: 47,
    "north america": 45,
    "south america": -15,
    oceania: -50,
    antarctica: -90,
  };
}
