import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts(): void {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:4201/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  // tslint:disable-next-line:typedef
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string): void {
    const post: Post = {id: null, title, content};
    this.http.post<{message: string}>('http://localhost:4201/api/posts', post)
      .subscribe((res) => {
        console.log(res.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
