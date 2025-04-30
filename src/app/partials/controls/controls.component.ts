import { Component, Output, EventEmitter } from '@angular/core';
import { State } from '../../models/state';
import { Sort } from '../../models/sort';

@Component({
  selector: 'app-controls',
  imports: [],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {
  private states: Array<State> = [
    {
      state: 0,
      className: "random",
      name: "Slumpvis"
    },
    {
      state: 1,
      className: "ascending",
      name: "Stegande"
    },
    {
      state: 2,
      className: "descending",
      name: "Fallande"
    }
  ];

  @Output() onSearchQuery: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSort: EventEmitter<Sort> = new EventEmitter<Sort>();

  /**
   * Hämtar värdet från inmatningsfältet och skickar den till parent component, vilket är start.
   * @param event - händelsen som utlöser metoden.
   */
  public onSearch(event: Event): void {
    const searchINPUT = event.target as HTMLInputElement;
    this.onSearchQuery.emit(searchINPUT.value);
  }

  public onCodeSort(event: Event): void {
    const button = event.target as HTMLButtonElement;
    this.onSort.emit({columnName: "code", state: this.cycleStateForward(button)});
  }

  public onNameSort(event: Event): void {
    const button = event.target as HTMLButtonElement;
    this.onSort.emit({columnName: "coursename", state: this.cycleStateForward(button)});
  }

  public onProgressionSort(event: Event): void {
    const button = event.target as HTMLButtonElement;
    this.onSort.emit({columnName: "progression", state: this.cycleStateForward(button)});
  }

  private cycleStateForward(button: HTMLButtonElement): number {
    for(const state of this.states) {
      if (state.className === button.className) {
        const currentState: number = state.state;
        if ((currentState + 1) < (this.states.length)) {
          const newState: number = currentState + 1;
          button.className = this.states[newState].className;
          button.textContent = this.states[newState].name;
          return currentState + 1;
        } else if ((currentState + 1) === (this.states.length)) {
          button.className = this.states[0].className;
          button.textContent = this.states[0].name;
          return 0;
        }
      }
    }
    return 0;
  }
}
