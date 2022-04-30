import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  cast: any = []
  dataSource: any = new MatTableDataSource<any[]>();
  displayedColumns: string[] = ['author', 'content', 'created_at', 'rating', 'avatar_pat'];
  isLoadingResults = false;
  @ViewChild('paginator') paginator!: MatPaginator;


  /**
   *  Constructor
   * 
   * @param _route 
   * @param _api 
   */
  constructor(private _route: ActivatedRoute,
    private _api: ApiService,) { }
  
  //-----------------------------------------------------------------------
  //  @ Lifecycle Hooks
  //-----------------------------------------------------------------------
  /**
   *  ngOnInit
   * 
   */
  ngOnInit(): void {
    this.isLoadingResults = true;
    this._route.params.subscribe(
      params => {
        let serieId = +params['id'];
        this._api.getReviewSeries(serieId)
          .subscribe((data) => {
            console.log("data--->", data)
            this.cast = data.results;
            this.dataSource.data = data.results;
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
   * Base Url
   * 
   * @param item 
   * @returns 
   */
  baseUrl(item: string) {
    let reg = '/h'
    let cad = ''

    if (item !== null) {
      let text = item.split('/')[1]
      if (text == 'http:' || text == 'https:') {
        cad = item.replace(reg, 'h')
      } else
        if (text !== 'http:' && text !== 'https:') {
          console.log("cadddd", text)
          cad = "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + item
        }
    } else {
      cad = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg'
    }


    return cad;
  }

}
