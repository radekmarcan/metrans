import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'users', loadChildren: () => import('./features/users/users.module').then((users) => users.UsersModule) },
    { path: 'posts', loadChildren: () => import('./features/posts/posts.module').then((posts) => posts.PostsModule) },
    { path: '', pathMatch: 'full', redirectTo: 'users' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
