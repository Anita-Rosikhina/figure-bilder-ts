import {Component} from '@angular/core';
import {colorType, figureType, IFigure, rotationType} from "./models/figure.model";
import {IList, List} from "./models/list.model";
import {Triangle} from "./models/triangle.model";
import {Square} from "./models/square.model";
import {Parallelogram} from "./models/parallelogram.model";
import {Trapezoid} from "./models/trapezoid.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  list: HTMLElement;
  btnSubmit: HTMLButtonElement;
  selectSerialNumber: HTMLSelectElement;
  selectFigureTypes: HTMLSelectElement;
  selectColor: HTMLSelectElement;
  selectRotation: HTMLSelectElement;
  form: HTMLFormElement;


  AMOUNT_OF_OPTIONS: number = 10;
  elements: IList[] = [];
  listHtml: string[] = [];
  figureTypes: figureType[] = ['square', 'triangle', 'parallelogram', 'trapezoid'];
  colorOption: colorType[] = ['black', 'red', 'pink', 'green', 'skyblue', 'yellow', 'greenyellow', 'darkorange', 'darkcyan', 'rebeccapurple'];
  rotationOption: rotationType[] = ['toTheRight', 'toTheLeft'];

  constructor() {
    Promise.resolve().then(() => {
      this.getElement();
      this.getSelectOption();
      this.initForm();
      this.btnSubmit.addEventListener('click', this.onSubmit.bind(this));
    })
  }

  onSubmit(): void {
    this.addListItem();
    this.resetForm();
    this.resortListOfItems(this.elements);
    this.renderListOfItems();
    this.listenDeleteBtns();
    this.updateSelectOptions();
  }

  getElement(): void {
    this.list = document.querySelector('.list');
    this.btnSubmit = document.querySelector('.btn_submit');
    this.selectSerialNumber = document.getElementById('selectSerialNumber') as HTMLSelectElement;
    this.selectFigureTypes = document.getElementById('selectFigureTypes') as HTMLSelectElement;
    this.selectColor = document.getElementById('selectColor') as HTMLSelectElement;
    this.selectRotation = document.getElementById('selectRotation') as HTMLSelectElement;
    this.form = document.getElementById('form') as HTMLFormElement
  }

  getSelectOption(): void {
    this.generateOption(this.selectColor, this.colorOption);
    this.generateOption(this.selectFigureTypes, this.figureTypes);
    this.generateOption(this.selectRotation, this.rotationOption);
  }

  addListItem(): void {
    const typeFigure = this.selectFigureTypes?.value as figureType;
    const serialNumber: string = this.selectSerialNumber?.value;
    const rotation: string = this.selectRotation?.value;
    const color: string = this.selectColor?.value;
    const figure: IFigure = this.createElement(typeFigure, rotation, color);
    this.elements.push(new List(serialNumber, figure));
  }

  createElement(typeFigure: figureType, rotation: string, color: string): IFigure {
    switch (typeFigure) {
      case 'triangle':
        return new Triangle(rotation, color);
      case 'square':
        return new Square(rotation, color);
      case 'parallelogram':
        return new Parallelogram(rotation, color);
      case 'trapezoid':
        return new Trapezoid(rotation, color);
    }
  }

  removeElement(serialNumber: number): void {
    const i = this.elements.findIndex(el => +el.serialNumber === serialNumber);
    this.elements.splice(i, 1);
    this.renderListOfItems();
    this.listenDeleteBtns();
    this.updateSelectOptions();
  }

  resortListOfItems(list: IList[]): IList[] {
    return list.sort((a, b) => +a.serialNumber - +b.serialNumber);
  }

  renderListOfItems(): void {
    while (this.list?.firstChild) {
      this.list.removeChild(this.list.lastChild as Node);
    }
    this.listHtml = this.elements.map((e, list) => e.create());
    this.list.insertAdjacentHTML('beforeend', this.listHtml.join(''));
  }

  updateSelectOptions(): void {
    const list: number[] = this.getAvailableSelectNumberOptions();
    this.renderSelectOptions(list);
    this.disableButton(list);
  }

  getAvailableSelectNumberOptions(): number[] {
    const numberOptions = Array.from({length: this.AMOUNT_OF_OPTIONS}, (_, i) => i + 1);
    const serialNumbers = this.elements.map(e => +e.serialNumber);
    return numberOptions.filter(e => !serialNumbers.includes(e));
  }

  renderSelectOptions(list: number[]): void {
    (this.selectSerialNumber as HTMLElement).innerHTML = '';
    list.forEach(serialNumber => {
      const option = this.createOption(serialNumber.toString(), serialNumber.toString());
      this.selectSerialNumber?.appendChild(option);
    })
  }

  resetForm(): void {
    this.form.reset();
  }

  disableButton(list: number[]): void {
    (this.btnSubmit as HTMLButtonElement).disabled = !list.length;
  }

  createOption(value: string, text: string): HTMLOptionElement {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
  }

  generateOption(select: HTMLSelectElement, types: string[]): void {
    types.forEach(el => {
      select.appendChild(this.createOption(el, el));
    });
  }

  initForm(): void {
    this.updateSelectOptions();
  }

  listenDeleteBtns(): void {
    document.querySelectorAll('.btn_delete').forEach((btn, i) => {
      btn.addEventListener('click', () => this.removeElement(i + 1));
    })
  }
}
