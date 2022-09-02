import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Post } from 'src/app/features/posts/model/post';
import { PostsService } from 'src/app/features/posts/service/posts.service';
import { take } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'me-posts',
    template: `
        <div class="w-50vw mx-auto">
            <div class="flex flex-col">
                <span class="text-sm">Amount of posts to be shown</span>

                <div>
                    <span
                        class="text-me-blue cursor-pointer text-sm"
                        *ngFor="let size of steps; let i = index"
                        [ngClass]="{ 'mx-4': i % 2 !== 0 }"
                        (click)="getLatestPosts(size)">
                        {{ size }}
                    </span>
                </div>
            </div>

            <me-post *ngFor="let post of postsList" [post]="post"></me-post>
        </div>
    `,
})
export class PostsComponent {
    postsList = new Array<Post>();
    constructor(private postsService: PostsService) {
        this.getLatestPosts();
    }
    readonly steps = [5, 10, 20, 50, 100];

    getLatestPosts(amount: number = 5): void {
        this.postsService
            .getPosts()
            .pipe(take(1))
            .subscribe((res) => (this.postsList = res.slice(0, amount)));
    }
}
