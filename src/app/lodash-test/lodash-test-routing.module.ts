import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'forEach',
    loadComponent: () => import('./lodash-foreach-test/lodash-test.component').then(c => c.LodashTestComponent)
  },
  {
    path: 'map',
    loadComponent: () => import('./lodash-map-test/map-test.component').then(c => c.MapTestComponent)
  },
  {
    path: 'concat',
    loadComponent: () => import('./array-combination/array-combination.component').then(c => c.ArrayCombinationComponent)
  },
  {
    path: 'uniqBy',
    loadComponent: () => import('./uniqBy/uniq-by.component').then(c => c.UniqByComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LodashTestRoutingModule {
}
