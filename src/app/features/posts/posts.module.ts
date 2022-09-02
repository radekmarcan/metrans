import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './container/posts.componen';
import { PostsService } from 'src/app/features/posts/service/posts.service';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [{ path: '', component: PostsComponent }];

@NgModule({
    declarations: [PostsComponent, PostComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    providers: [PostsService],
})
export class PostsModule {}
