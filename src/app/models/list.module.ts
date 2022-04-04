import {IFigure} from "./figure.model";

export interface IList {
  serialNumber: string
  date: Date
  figure: IFigure

  create(): string
}

export class List implements IList {

  public date: Date = new Date();

  constructor(
    public serialNumber: string,
    public figure: IFigure,
  ) {
  }

  create(): string {
    return `<div class="block">
            <p>${this.serialNumber}</p>
            ${this.figure.create()}
            <div class="block_btn_delete_create_date">
                <p>${this.date.toLocaleTimeString()}</p>
                <button class="btn_delete">X</button>
            </div>
        </div>`
  }
}
