import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPosts(): void {
    this.http
      .get<{message: string, posts: any}>('http://localhost:4201/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);

      });
  }

  // tslint:disable-next-line:typedef
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string, image: File): void {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{message: string, post: Post}>(
        'http://localhost:4201/api/posts',
        postData)
      .subscribe((res) => {
        const post: Post = {
          id: res.post.id,
          title: title,
          content: content,
          imagePath: res.post.imagePath
        }

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/'])
      });
  }

  deletePost(postId: string): void {
    this.http
      .delete('http://localhost:4201/api/posts/' + postId)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>(
      'http://localhost:4201/api/posts/' + id);
  }

  updatePost(id: string, title: string, content: string): void {
    const post: Post = {id, title, content, imagePath: null};
    this.http
      .put('http://localhost:4201/api/posts/' + id, post)
      .subscribe(res => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/'])
      });
  }
}
