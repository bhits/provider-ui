import {Component, OnInit} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {User} from "../shared/user.model";
import {NotificationService} from "../../shared/notification.service";
import {UtilityService} from "../../shared/utility.service";
import {UserService} from "../shared/user.service";
import {PageableData} from "../../shared/pageable-data.model";

@Component({
  selector: 'c2s-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private searchTerms = new Subject<string>();
  private totalPages: number = 0;
  public totalItems: number = 0;
  public itemsPerPage: number = 0;
  public currentPage: number = 1;
  public noResult: boolean = false;
  public loading: boolean = false;
  public asyncUsers: Observable<User[]>;
  public searchUsers: User[];

  constructor(private notificationService: NotificationService,
              private userService: UserService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
    // Avoid to send too many API calls
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.userService.searchUsers(term))
      .subscribe(
        (users) => {
          this.searchUsers = users;
        },
        err => {
          this.notificationService.show("Failed to search user, please try again later...");
        });
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public getPage(page: number) {
    this.loading = true;
    this.asyncUsers = this.userService.getUsers(page - 1)
      .do((users: PageableData<User>) => {
        this.noResult = users.totalElements === 0;
        this.totalItems = users.totalElements;
        this.totalPages = users.totalPages;
        this.itemsPerPage = users.size;
        this.currentPage = users.number + 1;
        this.loading = false;
      })
      .map(pageableUser => pageableUser.content);
  }

  public redirectToUserEdit(user: User) {
    const editUserUrl: string = `${"/users/edit"}/${user.id}`;
    this.utilityService.navigateTo(editUserUrl)
  }
}
