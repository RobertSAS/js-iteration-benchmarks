import { Component } from '@angular/core';
import { foreachResults, lodashArrayRunners, lodashObjectRunners } from "./foreach-runners";
import { buildTests } from "../../testFunctions";
import { foreachExpectations } from "./foreach-expectations";
import { CommonModule } from "@angular/common";
import { TestRunnerComponent } from "../../components/test-runner.component";

@Component({
  selector: 'app-lodash-foreach-test',
  template: `
    <app-test-runner
      [results]="results"
      [summary]="'fastForEachObject key faster on objects, for const of faster on arrays'"
      [runTest]="runTest"
      [title]="'Foreach test'"
    ></app-test-runner>
  `,
  imports: [
    CommonModule,
    TestRunnerComponent
  ],
  standalone: true
})
export class LodashTestComponent {
  results = foreachResults;

  constructor() {
    buildTests(foreachResults, lodashArrayRunners, foreachExpectations.arrayTests)
    buildTests(foreachResults, lodashObjectRunners, foreachExpectations.objectTests)
  }

  runTest(test: (duration: number) => void, duration: number): void {
    test(duration);
  }
}
