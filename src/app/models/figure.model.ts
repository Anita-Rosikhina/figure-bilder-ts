export type figureType = 'square' | 'triangle' | 'parallelogram' | 'trapezoid'
export type colorType = 'black' | 'red' | 'pink' | 'green' | 'skyblue' | 'yellow' | 'greenyellow' | 'darkorange' | 'darkcyan' | 'rebeccapurple'
export type rotationType = 'toTheLeft' | 'toTheRight'

export interface IFigure {
  rotation: string
  color: string

  create(): string
}

export abstract class Figure implements IFigure {
  constructor(
    public rotation: string,
    public color: string,
  ) {}

  abstract create(): string
}

export class Triangle extends Figure {
  constructor(
    rotation: string,
    color: string,
  ) {
    super(rotation, color);
  }

  create(): string {
    return `<div
                class="triangle"
                style="border-bottom-color: ${this.color};
                animation-name: ${this.rotation}">
            </div>`
  }
}

export class Square extends Figure {
  constructor(
    rotation: string,
    color: string,
  ) {
    super(rotation, color);
  }

  create(): string {
    return `<div
                class="square"
                style="background: ${this.color};
                animation-name: ${this.rotation}">
            </div>`
  }
}

export class Parallelogram extends Figure {
  constructor(
    rotation: string,
    color: string,
  ) {
    super(rotation, color);
  }

  create(): string {
    return `<div
                class="parallelogram"
                style="background: ${this.color};
                animation-name: ${this.rotation}">
            </div>`
  }
}

export class Trapezoid extends Figure {
  constructor(
    rotation: string,
    color: string,
  ) {
    super(rotation, color);
  }

  create(): string {
    return `<div
                class="trapezoid"
                style="border-bottom-color: ${this.color};
                animation-name: ${this.rotation}">
            </div>`
  }
}


