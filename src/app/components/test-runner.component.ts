import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestResults } from "../testFunctions";

@Component({
  selector: 'app-test-runner',
  template: `
    <h1>{{title}}</h1>
    <strong>{{summary}}</strong>
    <br>
    <br>
    Duration : (default 1s) <input #duration type="number">
    <br>
    <ng-container *ngFor="let result of results | keyvalue">
      {{result.key}} :
      <br>

      <div style="padding: 32px;">
        <ng-container *ngFor="let test of result.value | keyvalue">
          {{test.key}} :
          <button (click)="runTest(test.value.run, +duration.value || 1)" *ngIf="test.value.run">Run Test</button>

          <ng-container *ngIf="test.value.average">
            Average (of {{test.value.result.length}}) : {{test.value.average | number : '1.0-1'}}/s |
          </ng-container>
          <ng-container *ngIf="test.value.result.length">
            <ng-container *ngFor="let result of test.value.result">
              {{result  | number : '1.0-1'}}/s
            </ng-container>
          </ng-container>
          <br>
        </ng-container>
      </div>
    </ng-container>
  `,
  imports: [
    CommonModule
  ],
  standalone: true
})
export class TestRunnerComponent {
  @Input() title!: string;
  @Input() summary?: string;
  @Input() results!: TestResults;
  @Input() runTest!: (test: (duration: number) => void, duration: number) => void;
}
