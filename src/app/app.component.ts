import {Component, OnInit} from '@angular/core';

interface IFigure {
  typeFigure: string
  serialNumber: string
  rotation: string
  color: string
  date: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  list?: HTMLElement
  btnSubmit?: HTMLButtonElement
  selectSerialNumber?: HTMLSelectElement
  selectFigureTypes?: HTMLSelectElement
  selectColor?: HTMLSelectElement
  rotation?: HTMLSelectElement

  AMOUNT_OF_OPTIONS: number = 10
  elements: IFigure[] = []
  figureTypes: string[] = ['square', 'triangle', 'parallelogram', 'trapezoid']
  colorOption: string[] = ['black', 'red', 'pink', 'green', 'skyblue', 'yellow', 'greenyellow', 'darkorange', 'darkcyan', 'rebeccapurple']

  ngOnInit(): void {
    this.list = document.querySelector('.list') as HTMLElement
    this.btnSubmit = document.querySelector('.btn_submit') as HTMLButtonElement
    this.selectSerialNumber = document.getElementById('selectSerialNumber') as HTMLSelectElement
    this.selectFigureTypes = document.getElementById('selectFigureTypes') as HTMLSelectElement
    this.selectColor = document.getElementById('selectColor') as HTMLSelectElement
    this.rotation = document.querySelector('.rotation') as HTMLSelectElement

    this.generateColorOption(this.colorOption)
    this.generateFigureTypes(this.figureTypes)
    this.initForm()
    this.btnSubmit.addEventListener('click', () => {
      this.elements.push({
        typeFigure: (this.selectFigureTypes as HTMLSelectElement).value,
        serialNumber: (this.selectSerialNumber as HTMLSelectElement).value,
        rotation: (this.rotation as HTMLSelectElement).value,
        color: (this.selectColor as HTMLSelectElement).value,
        date: new Date().toLocaleTimeString()
      })
      this.resetForm()
      this.resortListOfItems()
      this.renderListOfItems()
      this.listenDeleteBtns()
      this.updateSelectOptions()
    })
  }

  createElement({serialNumber, typeFigure, rotation, color, date}: IFigure): string | void {
    switch (typeFigure) {
      case 'triangle':
        return this.createTriangle({serialNumber, rotation, color, date})
      case 'square':
        return this.createSquare({serialNumber, rotation, color, date})
      case 'parallelogram':
        return this.createParallelogram({serialNumber, rotation, color, date})
      case 'trapezoid':
        return this.createTrapezoid({serialNumber, rotation, color, date})
    }
  }

  removeElement(serialNumber: number): void {
    const i = this.elements.findIndex(el => +el.serialNumber === serialNumber)
    this.elements.splice(i, 1)
    this.renderListOfItems()
    this.listenDeleteBtns()
    this.updateSelectOptions()
  }

  createTriangle({serialNumber, rotation, color, date}: Partial<IFigure>): string {
    const typeFigure = `<div class="triangle" style="border-bottom-color: ${color}; animation-name: ${rotation}"></div>`
    return this.generateListItem({typeFigure, serialNumber, date})
  }

  createSquare({serialNumber, rotation, color, date}: Partial<IFigure>): string {
    const typeFigure = `<div class="square" style="background: ${color}; animation-name: ${rotation}"></div>`
    return this.generateListItem({typeFigure, serialNumber, date})
  }

  createParallelogram({serialNumber, rotation, color, date}: Partial<IFigure>): string {
    const typeFigure = `<div class="parallelogram" style="background: ${color}; animation-name: ${rotation}"></div>`
    return this.generateListItem({typeFigure, serialNumber, date})
  }

  createTrapezoid({serialNumber, rotation, color, date}: Partial<IFigure>): string {
    const typeFigure = `<div class="trapezoid" style="border-bottom-color: ${color}; animation-name: ${rotation}"></div>`
    return this.generateListItem({typeFigure, serialNumber, date})
  }

  generateListItem({typeFigure: figure, serialNumber, date}: Partial<IFigure>): string {
    return `<div class="block">
            <p>${serialNumber}</p>
            ${figure}
            <div class="block_btn_delete_create_date">
                <p>${date}</p>
                <button class="btn_delete">Х</button>
            </div>
        </div>`
  }

  resortListOfItems() {
    this.elements.sort((a, b) => +a.serialNumber - +b.serialNumber)
  }

  renderListOfItems() {
    while (this.list?.firstChild) {
      this.list.removeChild(this.list.lastChild as Node)
    }
    this.elements.forEach(el => {
      this.list?.insertAdjacentHTML('beforeend', this.createElement(el) as string)
    })
  }

  updateSelectOptions() {
    const list: number[] = this.getAvailableSelectNumberOptions()
    this.renderSelectOptions(list)
    this.disableButton(list)
  }

  getAvailableSelectNumberOptions(): number[] {
    const numberOptions = Array.from({length: this.AMOUNT_OF_OPTIONS}, (_, i) => i + 1)
    const serialNumbers = this.elements.map(e => +e.serialNumber)
    return numberOptions.filter(e => !serialNumbers.includes(e))
  }

  renderSelectOptions(list: number[]): void {
    (this.selectSerialNumber as HTMLElement).innerHTML = ''
    list.forEach(serialNumber => {
      const option = this.createOption(serialNumber.toString(), serialNumber.toString())
      this.selectSerialNumber?.appendChild(option)
    })
  }

  resetForm() {
    document.forms[0].reset()
  }

  disableButton(list: number[]): void {
    (this.btnSubmit as HTMLButtonElement).disabled = !list.length
  }

  createOption(value: string, text: string): HTMLOptionElement {
    const option = document.createElement('option')
    option.value = value
    option.text = text
    return option
  }

  generateFigureTypes(types: string[]): void {
    types.forEach(el => {
      this.selectFigureTypes?.appendChild(this.createOption(el, el))
    })
  }

  generateColorOption(types: string[]): void {
    types.forEach(el => {
      this.selectColor?.appendChild(this.createOption(el, el))
    })
  }

  initForm(): void {
    this.updateSelectOptions()
  }

  listenDeleteBtns(): void {
    document.querySelectorAll('.btn_delete').forEach((btn, i) => {
      btn.addEventListener('click', () => this.removeElement(i + 1))
    })
  }
}
