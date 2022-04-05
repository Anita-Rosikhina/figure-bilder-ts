import {Figure} from "./figure.model";

export class Triangle extends Figure {
  constructor(
    rotation: string,
    color: string,
  ) {
    super(rotation, color);
  }

  create(): string {
    return `<div
              class="triangle" style="border-bottom-color: ${this.color}; animation-name: ${this.rotation}">
            </div>`;
  }
}
