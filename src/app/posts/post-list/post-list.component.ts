import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
  totalPosts=0;
  currentPage=1;
  postPerPage=5;
  pageSizeOptions=[1,2,5,10];

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage,1);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData:{posts: Post[], postCount:number}) => {
        this.isLoading = false;
        this.totalPosts=postData.postCount;
        this.posts = postData.posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(()=>
    {
      this.postsService.getPosts(this.postPerPage,this.currentPage);
    });
  }

  onChangedPage(pageData:PageEvent){
    this.isLoading = true;
    this.currentPage=pageData.pageIndex+1;
    this.postPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  
}
