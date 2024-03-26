import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface OrganisationDTO {
    name: string,
    shortCode: string,
    gstNumber: string,
    addressStreet1: string,
    addressStreet2: string,
    addressCityTown: string,
    country: string,
    postCode: string,
    phonePrefix: string,
    phone: string
  }
  
   
  const EXAMPLE_DATA: OrganisationDTO[] = [
    {name: 'Test ORG', shortCode: 'TEST', gstNumber: '123456', addressStreet1: 'Upper HUtt', addressStreet2: 'Welington', addressCityTown: 'Welington',
     country: 'New Zealand', postCode: '5018', phonePrefix: '022',  phone: '5088053'},
    {name: 'Test ORG2', shortCode: 'TEST2', gstNumber: '1234562', addressStreet1: 'Upper HUtt2', addressStreet2: 'Welington2', addressCityTown: 'Welington',
    country: 'New Zealand2', postCode: '5018', phonePrefix: '022',  phone: '50880532'}
  ];
  

  //const EXAMPLE_DATA: OrganisationData[] = [];

  export class OrganisationDataSource extends DataSource<OrganisationDTO> {
    data: OrganisationDTO[] = EXAMPLE_DATA;
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;
  
    constructor(
      
    ) {
      
      super();
    }
  
    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<OrganisationDTO[]> {
      if (this.paginator && this.sort) {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
          .pipe(map(() => {
            return this.getPagedData(this.getSortedData([...this.data ]));
          }));
      } else {
        throw Error('Please set the paginator and sort on the data source before connecting.');
      }
    }
  
    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {}
  
    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: OrganisationDTO[]): OrganisationDTO[] {
      if (this.paginator) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
      } else {
        return data;
      }
    }
  
    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: OrganisationDTO[]): OrganisationDTO[] {
      if (!this.sort || !this.sort.active || this.sort.direction === '') {
        return data;
      }
  
      return data.sort((a, b) => {
        const isAsc = this.sort?.direction === 'asc';
        switch (this.sort?.active) {
          case 'name': return compare(a.name, b.name, isAsc);
          case 'id': return compare(+a.name, +b.gstNumber, isAsc);
          default: return 0;
        }
      });
    }
  }
  
  
  /** Simple sort comparator for example ref/name columns (for client-side sorting). */
  function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
    