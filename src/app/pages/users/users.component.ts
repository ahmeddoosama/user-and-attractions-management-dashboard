import { Component, OnInit, ViewChild } from '@angular/core';
import { ContainerComponent } from '@layout/container/container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '@core/services/app-services/users/users.service';
import { IUser, IUsersResponse } from '@core/interfaces/auth.interface';
import { finalize, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { NotificationService } from '@core/services/app-services/notification/notification.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';

const MODULES = [FormsModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatMenuModule];
const COMPONENTS = [ContainerComponent];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MODULES, COMPONENTS],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['avatar', 'name', 'username', 'actions'] as const;
  dataSource!: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading: boolean = false;
  users: IUser[] = [];
  total: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  sortColumn: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  isEmpty: boolean = false;
  nameSearch: string = '';
  private searchSubject = new Subject<string>();
  skeletonData = Array(10).fill({
    avatar: '',
    fname: '',
    lname: '',
    username: ''
  });

  constructor(
    private usersService: UsersService,
    private notification: NotificationService,
    private paginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog
  ) {
    this.paginatorIntl.itemsPerPageLabel = 'Items per page:';

    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after the last event before emitting
      distinctUntilChanged() // Only emit if value is different from previous value
    ).subscribe(searchTerm => {
      this.nameSearch = searchTerm;
      this.currentPage = 1; // Reset to first page when searching
      if (this.paginator) {
        this.paginator.firstPage();
      }
      this.getUsers();
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Handle pagination events
   */
  pageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  /**
   * Handle sort events
   */
  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      // Reset sort parameters if sorting is cleared
      this.sortColumn = '';
      this.sortOrder = 'asc';
    } else {
      this.sortColumn = sort.active;
      this.sortOrder = sort.direction as 'asc' | 'desc';
    }

    this.getUsers();
  }

  /**
   * Get users with current pagination and sorting
   */
  getUsers(): void {
    this.isLoading = true;

    this.usersService.getUsers(
      this.currentPage,
      this.pageSize,
      this.nameSearch,
      this.sortColumn,
      this.sortOrder
    ).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (res: IUsersResponse) => {
        if(res) {
          this.users = res.data;
          this.dataSource = new MatTableDataSource(this.users);
          this.total = res.total;
          this.isEmpty = this.users.length >= 10;
        }
      },
      error: (error) => {
        const errorMessage = error?.error?.message;
        this.notification.error(errorMessage);
      }
    });
  }

  userDialog(type: 'create' | 'edit', user?: IUser): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        type: type,
        user: user
      },
      panelClass: 'create-edit-user-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getUsers();
      }
    });
  }

  confirmDelete(user: IUser): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
      },
      panelClass: 'confirmation-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteUser(user);
      }
    });
  }

  deleteUser(user: IUser): void {
    this.isLoading = true;
    this.usersService.deleteUser(user.id).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: () => {
        this.notification.success(`${user.fname} ${user.lname} deleted successfully`);
        this.getUsers();
      },
      error: (error) => {
        const errorMessage = error?.error?.message;
        this.notification.error(errorMessage);
      }
    });
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }
}
