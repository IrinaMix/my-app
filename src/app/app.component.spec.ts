import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {ServiceService} from "./service.service";
import {async, of} from "rxjs";

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: any;

  const posts: {} = {
    data:   {
      children:   [
        {
          title: 'JavaScript',
          thumbnail: '',
          created: '',
          num_comments: '2',
          author: 'Test',
          score: '2',
          permalink: '',
          selftext: 'test'
        },
        {
          title: 'JavaScript2',
          thumbnail: '',
          created: '',
          num_comments: '4',
          author: 'Test2',
          score: '4',
          permalink: '',
          selftext: 'test2'
        }
      ]}};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ {
        provide: ServiceService,
        useValue: {
          // pass  data to Service getPosts method
          getPosts: () => of(posts)
        }
      } ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it('should change number of posts', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(appComponent, 'getAllPosts');
    const event = {target: {value: '10'}};
    // Act
    appComponent.onChangeNumberPostsOnPage(event);
    // Assert
    expect(appComponent.getAllPosts).toHaveBeenCalledTimes(1);
    expect(appComponent.limit).toMatch(event.target.value);
  });

  it('should get posts from service', () => {

    let response: any;
    const fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
    appComponent.getAllPosts();
    expect(appComponent.test).toEqual(JSON.parse(JSON.stringify(posts)).data.children);

  });
});

