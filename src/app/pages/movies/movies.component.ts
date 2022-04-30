import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  selected = '';
  categories: any = []
  dataSource: any = new MatTableDataSource<any[]>();
  displayedColumns: string[] = ['name', 'vote_average', 'overview', 'release_date', 'logo', 'cast'];
  select = new FormControl();
  auxArr = []
  dataAuxMovies = []
  isLoadingResults = false;
  @ViewChild('paginator') paginator!: MatPaginator;

 /**
  * Constructor
  * 
  * @param _api 
  */
  constructor(private _api: ApiService) { }

  //-----------------------------------------------------------------------
  //  @ Lifecycle Hooks
  //-----------------------------------------------------------------------

  /**
   *  ngOnInit
   * 
   */
  ngOnInit(): void {
    this.isLoadingResults = true;

    this.getMovies()
    this.getGenres()


    this.select.valueChanges.subscribe(value => {
      if (value !== 0) {
        let movies = this.dataAuxMovies
        let dataNew: any = []

        movies.forEach((element: any) => {
          this.auxArr = element.genre_ids.filter((item: any) => item === value)

          if (this.auxArr.length > 0) {
            dataNew.push(element)
          }

        });

        this.dataSource.data = dataNew

      } else {

        this.getMovies()
      }

    })
  }

  //-----------------------------------------------------------------------
  //  @ Methods
  //-----------------------------------------------------------------------

  /**
   * Base Img
   * 
   * @param item 
   * @returns 
   */
  baseImg(item: string) {
    return 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + item
  }

  /**
   * get Movies
   * 
   */
  getMovies() {
    this._api.getTopRated().subscribe((data) => {
      this.dataAuxMovies = data.results;
      this.dataSource.data = data.results;
      this.isLoadingResults = false;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      })

    });
  }

  /**
   * Get Genres
   * 
   */
  getGenres() {
    this._api.genreMovie().subscribe((data: any) => {
      data.genres.unshift({ name: 'All', id: 0 })
      this.categories = data.genres
    });
  }




}
