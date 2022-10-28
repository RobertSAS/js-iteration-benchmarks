import { Component } from '@angular/core';
import { buildTests } from "../../testFunctions";
import { CommonModule } from "@angular/common";
import { mapObjectRunners, mapResults } from "./map-runners";
import { mapExpectations } from "./map-expectations";
import { TestRunnerComponent } from "../../components/test-runner.component";

@Component({
  selector: 'app-map-test',
  template: `
    <app-test-runner
      [results]="results"
      [runTest]="runTest"
      [title]="'Map test'"
      [summary]="'very even but custom approach is faster'"
    ></app-test-runner>
  `,
  imports: [
    CommonModule,
    TestRunnerComponent
  ],
  standalone: true
})
export class MapTestComponent {
  results = mapResults;

  constructor() {
    buildTests(mapResults, mapObjectRunners, mapExpectations.objectTests)
  }

  runTest(test: (duration: number) => void, duration: number): void {
    test(duration);
  }
}
