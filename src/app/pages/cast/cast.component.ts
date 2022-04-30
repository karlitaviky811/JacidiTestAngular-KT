import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {
  cast: any = []
  dataSource: any = new MatTableDataSource<any[]>();
  displayedColumns: string[] = ['name', 'known_for_department', 'popularity', 'character', 'profile_path'];
  isLoadingResults = false;
  @ViewChild('paginator') paginator!: MatPaginator;


  /**
   *  Constructor
   * 
   * @param _route 
   * @param _api 
   */
  constructor(private _route: ActivatedRoute,
    private _api: ApiService,
  ) { }
  
  //-----------------------------------------------------------------------
  //  @ Lifecycle Hooks
  //-----------------------------------------------------------------------
  
  /**
   * ngOnInit
   * 
   */
  ngOnInit(): void {
    this.isLoadingResults = true;
    this._route.params.subscribe(
      params => {
        let movieId = +params['id'];

        this._api.getCastsMovies(movieId)
          .subscribe((data) => {
            this.cast = data.results;
            this.dataSource.data = data.cast;
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
            })
            this.isLoadingResults = false;
          }

          )
      }
    )
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
    let img = ''
    if(item !== null){
      img = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + item
    }else{
      img = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg'
    }
    
  
    return img;
  }

  
}
