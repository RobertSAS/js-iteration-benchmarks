import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buildTests } from "../../testFunctions";
import { TestRunnerComponent } from "../../components/test-runner.component";
import { concatArrayRunners, concatResults } from "./concat-runners";
import { concatExpectations } from "./concat-expectations";

@Component({
  selector: 'app-array-combination',
  template: `
    <app-test-runner
      [results]="results"
      [summary]='"array.concat is faster for many large arrays; spread is faster with small arrays"'
      [runTest]="runTest"
      [title]="'Array combination'"
    ></app-test-runner>
  `,
  imports: [
    CommonModule,
    TestRunnerComponent
  ],
  standalone: true
})
export class ArrayCombinationComponent {
  results = concatResults;

  constructor() {
    buildTests(concatResults, concatArrayRunners, concatExpectations.arrayTests)
  }

  runTest(test: (duration: number) => void, duration: number): void {
    test(duration);
  }
}
