import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buildTests } from "../../testFunctions";
import { TestRunnerComponent } from "../../components/test-runner.component";
import { uniqByArrayRunners, uniqByResults } from "./uniq-by-runners";
import { uniqByExpectations } from "./uniq-by-expectations";

@Component({
  selector: 'app-array-combination',
  template: `
    <app-test-runner
      [results]="results"
      [summary]='""'
      [runTest]="runTest"
      [title]="'Unique by property filtering'"
    ></app-test-runner>
  `,
  imports: [
    CommonModule,
    TestRunnerComponent
  ],
  standalone: true
})
export class UniqByComponent {
  results = uniqByResults;

  constructor() {
    buildTests(uniqByResults, uniqByArrayRunners, uniqByExpectations.arrayTests)
  }

  runTest(test: (duration: number) => void, duration: number): void {
    test(duration);
  }
}
