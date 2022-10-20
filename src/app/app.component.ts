import { Component } from '@angular/core';
import { routes } from "./lodash-test/lodash-test-routing.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'benchmarking';
  routes = routes;
}
