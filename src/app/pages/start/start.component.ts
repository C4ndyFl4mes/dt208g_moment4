import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { ListComponent } from "../../partials/list/list.component";
import { ControlsComponent } from "../../partials/controls/controls.component";
import { Sort } from '../../models/sort';

@Component({
  selector: 'app-start',
  imports: [ListComponent, ControlsComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  private courses: Array<Course> = []; // <------------------ Original array av kurser.
  public coursesOnDisplay: Array<Course> = []; // <---------- Den array av kurser som ska visas i listan.
  constructor(private courseService: CourseService) { }

  public ngOnInit() {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      this.coursesOnDisplay = data;
    });
  }

  /**
   * Filtrerar utefter sökterm på både kurskod och kursnamn, bryr sig inte om versaler.
   * @param searchQuery - söktermen som kommer från controls component.
   */
  public search(searchQuery: string): void {
    const term: string = searchQuery.toLowerCase();
    this.coursesOnDisplay = this.courses.filter(
      course => course.code.toLowerCase().includes(term) || course.coursename.toLowerCase().includes(term)
    );
  }

  /**
   * Den sorterar utefter objektet sort. Jag visste inte hur jag skulle göra med egenskaper vs strängar så det blev nästlade switch-satser...
   * @param sort - det objekt som kommer från controls component.
   */
  public sort(sort: Sort): void {
    switch (sort.columnName) {
      case "code":
        switch (sort.state) {
          case 0:
            this.coursesOnDisplay = this.shuffleArray(this.coursesOnDisplay);
          break;
          case 1:
            this.coursesOnDisplay.sort((a, b) => a.code.localeCompare(b.code));
          break;
          case 2:
            this.coursesOnDisplay.sort((a, b) => b.code.localeCompare(a.code));
          break;
          default:
            break;
        }
        break;
      case "coursename":
        switch (sort.state) {
          case 0:
            this.coursesOnDisplay = this.shuffleArray(this.coursesOnDisplay);
          break;
          case 1:
            this.coursesOnDisplay.sort((a, b) => a.coursename.localeCompare(b.coursename));
          break;
          case 2:
            this.coursesOnDisplay.sort((a, b) => b.coursename.localeCompare(a.coursename));
          break;
          default:
            break;
        }
        break;
      case "progression":
        switch (sort.state) {
          case 0:
            this.coursesOnDisplay = this.shuffleArray(this.coursesOnDisplay);
          break;
          case 1:
            this.coursesOnDisplay.sort((a, b) => a.progression.localeCompare(b.progression));
          break;
          case 2:
            this.coursesOnDisplay.sort((a, b) => b.progression.localeCompare(a.progression));
          break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  /**
   * Jag tog denna metod från internet för att kunna slumpa ordningen i kurser. Den använder Fisher-Yates (Knuth) blandningsalgoritm.
   * @param array - den array som ska slumpas.
   * @returns slumpad array.
   */
  private shuffleArray<T>(array: T[]): T[] {
    const arr = [...array]; // copy to avoid mutating original
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
  }
}
