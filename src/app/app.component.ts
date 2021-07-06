import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ServiceService} from "./service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'my-app';
  category: string = "javascript";
  limit: string = "5";
  expandedElement: any | null;
  nextPage: string = "";
  previousPage: string = "";
  test: any;

  private BASE_URL = 'https://www.reddit.com/r/';
  private URL_LIMIT: string = ".json?limit=";


  columnsToDisplay = [
    'title',
    'thumbnail',
    'created',
    'num_comments',
    'author',
    'score',
    'permalink'
  ];

  categoryOptions = [
    {name: 'javascript'},
    {name: 'angular'}];

  numberPostsOnPage = [
    {name: '5'},
    {name: '10'},
    {name: '15'}
  ];

  constructor(private service: ServiceService) {
  }

  ngOnInit() {
    this.getAllPosts()
  }

  getAllPosts() {
    return this.service.getPosts(this.BASE_URL + this.category + this.URL_LIMIT + this.limit)
      .subscribe(response => {
      this.setStringObjectAndBeforeAfterPage(response)
    })
  }

  private setStringObjectAndBeforeAfterPage(response: any) {

    const data = response;
    let json = JSON.parse(JSON.stringify(data)).data.children;
    this.nextPage = JSON.parse(JSON.stringify(data)).data.after;
    this.previousPage = JSON.parse(JSON.stringify(data)).data.before;
    this.test = json;
  }

  getNext() {
    this.service.getPosts(this.BASE_URL + this.category + this.URL_LIMIT + this.limit + '&after=' + this.nextPage + '&count=' + this.limit)
      .subscribe(response => {
        this.setStringObjectAndBeforeAfterPage(response)
      })
  }

  getPrevious() {
    this.service.getPosts(this.BASE_URL + this.category + this.URL_LIMIT + this.limit + '&before=' + this.previousPage + '&count=' + this.limit)
      .subscribe(response => {
        this.setStringObjectAndBeforeAfterPage(response)
      })
  }

  onChangeCategory(event: any) {
    this.category = event.target.value;
    this.getAllPosts();
  }

  onChangeNumberPostsOnPage(event: any) {
    this.limit = event.target.value;
    this.getAllPosts();
  }
}
