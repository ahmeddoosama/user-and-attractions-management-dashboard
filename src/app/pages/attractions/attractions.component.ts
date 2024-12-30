import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IAttraction, IAttractionsResponse } from '@core/interfaces/attraction.interface';
import { AttractionsService } from '@core/services/app-services/attractions/attractions.service';
import { NotificationService } from '@core/services/app-services/notification/notification.service';
import { ContainerComponent } from '@layout/container/container.component';
import { debounceTime, distinctUntilChanged, finalize, Subject } from 'rxjs';
import { CreateEditAttractionComponent } from './components/create-edit-attraction/create-edit-attraction.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

const MODULES = [FormsModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatMenuModule];
const COMPONENTS = [ContainerComponent];

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [MODULES, COMPONENTS],
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.scss'
})
export class AttractionsComponent implements OnInit{

  displayedColumns: string[] = ['coverimage', 'name', 'detail', 'latitude', 'longitude', 'actions'] as const;
  dataSource!: MatTableDataSource<IAttraction>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading: boolean = false;
  attractions: IAttraction[] = [];
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
    coverimage: '',
    name: '',
    detail: '',
    location: ''
  });

  constructor(
    private attractionsService: AttractionsService,
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
      this.getAttractions();
    });
  }

  ngOnInit(): void {
    this.getAttractions();
  }

  /**
   * Handle pagination events
   */
  pageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAttractions();
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

    this.getAttractions();
  }

  getAttractions(): void {
    this.isLoading = true;

    this.attractionsService.getAttractions(
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
      next: (res: IAttractionsResponse) => {
        if(res) {
          this.attractions = res.data;
          this.dataSource = new MatTableDataSource(this.attractions);
          this.total = res.total;
          this.isEmpty = this.attractions.length >= 10;
        }
      },
      error: (error) => {
        const errorMessage = error?.error?.message;
        this.notification.error(errorMessage);
      }
    });
  }

  attractionDialog(type: 'create' | 'edit', attraction?: IAttraction): void {
    const dialogRef = this.dialog.open(CreateEditAttractionComponent, {
      data: {
        type: type,
        attraction: attraction
      },
      panelClass: 'create-edit-user-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAttractions();
      }
    });
  }

  confirmDelete(attraction: IAttraction): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Attraction',
        message: 'Are you sure you want to delete this attraction?',
      },
      panelClass: 'confirmation-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteAttraction(attraction);
      }
    });
  }

  deleteAttraction(attraction: IAttraction): void {
    this.isLoading = true;
    this.attractionsService.deleteAttraction(attraction.id).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: () => {
        this.notification.success(`${attraction.name} deleted successfully`);
        this.getAttractions();
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
