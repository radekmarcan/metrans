import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/features/posts/model/post';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostsService {
    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.baseUrl}/posts`);
    }
}
