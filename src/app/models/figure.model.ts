export type figureType = 'square' | 'triangle' | 'parallelogram' | 'trapezoid';
export type colorType = 'black' | 'red' | 'pink' | 'green' | 'skyblue' | 'yellow' | 'greenyellow' | 'darkorange' | 'darkcyan' | 'rebeccapurple';
export type rotationType = 'toTheLeft' | 'toTheRight';

export interface IFigure {
  rotation: string;
  color: string;

  create(): string;
}

export abstract class Figure implements IFigure {
  protected constructor(
    public rotation: string,
    public color: string,
  ) {}

  abstract create(): string;
}
