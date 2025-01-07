import { PacmanEntityEnum } from "../../helper";
import { PacmanConstants } from "../constants";
import { PacmanEntity } from "./entity";


export class PacmanPickup extends PacmanEntity {
  constructor(x: number, y: number, radius: number, colour: string, name: PacmanEntityEnum) {
    const diameter = radius * 2;
    super(x, y, diameter, diameter, colour, name);
  }

  get diameter() {
    return this.radius * 2;
  }

  get radius() {
    return this.width / 2;
  }

  static BASE_WIDTH = PacmanConstants.HALL_WIDTH / 8;
  static CHASE_WIDTH = PacmanConstants.HALL_WIDTH / 2;
}
