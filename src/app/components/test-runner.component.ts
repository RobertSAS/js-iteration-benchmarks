import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTestResults, forEachObjectKey, TestResultItem, TestResults } from "../testFunctions";

@Component({
  selector: 'app-test-runner',
  template: `
    <h1>{{title}}</h1>
    <strong>{{summary}}</strong>
    <br>
    <br>
    Duration :<input #duration type="number" [placeholder]="'0.4s default'">
    <br>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
      <ng-container *ngFor="let result of results | keyvalue">
        <ng-container *ngIf="bestTest(testResultsType(result.value)) as bestTestResult">
          <div style="display: grid">
            <h2>{{result.key}}</h2>
            <p>
              Fastest runner was : {{bestTestResult.name}}
            </p>
            <div style="padding: 32px;">
              <ng-container *ngFor="let test of result.value | keyvalue">

                <ng-container *ngIf="benchmarkResultType(test.value) as testResults">
                  <div style="display: flex; align-items: center">
                    <div [ngStyle]="testVsBest(testResults, bestTestResult)">
                    </div>
                    <p>
                      {{test.key}}
                      <button (click)="runTest(testResults.run, +duration.value || 0.4)" *ngIf="testResults.run">Run
                        Test
                      </button>

                    </p>
                  </div>

                  <ng-container *ngIf="testResults.results.length">
                    <p>Average (of {{testResults.results.length}})
                      : {{testResults.average | number : '1.0-1'}}/s
                      += {{testResults.marginOfError}}% |</p>
                  </ng-container>
                  <ng-container *ngIf="testResults.results.length">
                    <ng-container *ngFor="let result of testResults.results">
                      {{result.average | number : '1.0-1'}}/s +- {{result.marginOfError}}%
                    </ng-container>
                  </ng-container>
                  <br>
                </ng-container>
              </ng-container>
            </div>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
  imports: [
    CommonModule
  ],
  standalone: true
})
export class TestRunnerComponent {
  @Input() title!: string;
  @Input() summary?: string;
  @Input() results!: AllTestResults;
  @Input() runTest!: (test: (duration: number) => void, duration: number) => void;

  testResultsType = (input: any) => input as TestResults;
  benchmarkResultType = (input: any) => input as TestResultItem;

  bestTest = (input: TestResults): TestResultItem & { name: string } => {
    let fastestTime = Number.NEGATIVE_INFINITY;
    let fastestRun: TestResultItem & { name: string };
    forEachObjectKey(input, (key, value) => {
      if (!value.average) {
        return;
      }
      if (value.average > fastestTime) {
        fastestTime = value.average;
        fastestRun = {
          ...value,
          name: key
        };
      }
    })
    return fastestRun! || {
      average: 0,
      results: [],
      run: () => {
      },
      name: "none"
    };
  }

  testVsBest(input: TestResultItem, best: TestResultItem & { name: string }) {
    const difference = (input.average / best.average);
    if (!input.average || !best.average) {
      return {
        "background-color": `black`
        , "width": "10px",
        "height": "10px",
      }
    }
    return {
      "background-color": `rgba(${ Math.max(Math.min((1 - difference) * 255, 255), 0) } ${ (Math.abs(difference)) * 255 } 0)`
      , "width": "10px",
      "height": "10px",
    }
  }
}
