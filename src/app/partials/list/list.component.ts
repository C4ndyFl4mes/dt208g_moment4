import { Component, Input } from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() courses: Array<Course> = [];

  /**
   * Förflyttar användaren till en ny sida på en ny tab.
   * @param syllabus - länken.
   */
  public openLink(syllabus: string): void {
    window.open(syllabus, "_blank");
  }
}
