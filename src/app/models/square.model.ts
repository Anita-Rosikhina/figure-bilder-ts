import {Figure} from "./figure.model";

export class Square extends Figure {
  constructor(
    rotation: string,
    color: string,
  ) {
    super(rotation, color);
  }

  create(): string {
    return `<div
              class="square" style="background: ${this.color};
                animation-name: ${this.rotation}">
            </div>`;
  }
}
