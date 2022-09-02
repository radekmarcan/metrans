import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from 'src/app/features/posts/model/post';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'me-post',
    template: `
        <div class="w-100 border rounded my-4">
            <div class="text-xl font-semibold first-letter:uppercase rounded-t w-100 p-4 bg-me-blue text-white">
                {{ post.title }}
            </div>
            <div class="p-4">
                <p class="first-letter:uppercase">{{ post.body }}</p>
            </div>
        </div>
    `,
})
export class PostComponent {
    @Input() post!: Post;
}
