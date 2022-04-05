import {Figure} from "./figure.model";

export class Parallelogram extends Figure {
  constructor(
    rotation: string,
    color: string,
  ) {
    super(rotation, color);
  }

  create(): string {
    return `<div
              class="parallelogram" style="background: ${this.color};
                animation-name: ${this.rotation}">
            </div>`;
  }
}
