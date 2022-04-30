import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'vote_average', 'overview', 'note', 'logo', 'review'];
  dataSource: any = new MatTableDataSource<any[]>();
  categories: any = []
  select = new FormControl();
  auxArr = []
  dataAuxMovies = []
  isLoadingResults = false;
  selected = '';

  @ViewChild('paginator') paginator!: MatPaginator;

  /**
   * Constructor
   * 
   * @param _api 
   */
  constructor(private _api: ApiService,) { }

  //-----------------------------------------------------------------------
  //  @ Lifecycle Hooks
  //-----------------------------------------------------------------------

  /**
   * ngOnInit
   * 
   */
  ngOnInit(): void {
    this.isLoadingResults = true;
    this.getTv()
    this.getGenreTv()
    

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
        this.getTv()
      }

    })
  }

  //-----------------------------------------------------------------------
  //  @ Methods
  //-----------------------------------------------------------------------

  /**
   * get Tv
   * 
   */
  getTv() {
    this._api.getTvPopular().subscribe((data) => {
      this.dataSource.data = data.results;
      this.dataAuxMovies = data.results;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      })
      this.isLoadingResults = false;
    })


  }

  /**
   * get Genre Tv
   * 
   */
  getGenreTv(){
    this._api.genreTv().subscribe((data: any) => {
      data.genres.unshift({ name: 'All', id: 0 })
      this.categories = data.genres
    });
  }

  /**
   * Base Img
   * 
   * @param item 
   * @returns 
   */
  baseImg(item: string) {
    return 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + item;
  }

}
