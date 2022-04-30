import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  welcomMovies: any = []

  /**
   * Constructor
   * 
   * @param _api 
   */
  constructor(
    private _api: ApiService
  ) { }

  //-----------------------------------------------------------------------
  //  @ Lifecycle Hooks
  //-----------------------------------------------------------------------

  /**
   *  ngOnInit
   * 
   */
  ngOnInit(): void {

    this._api.getTrending().subscribe(data => {
      this.welcomMovies = data.results;
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
   * Validate Text
   * 
   * @param item 
   * @returns 
   */
  validateText(item: any) {
    let text = ''
    if (item.original_title) {
      text = item.original_title;
    }
    if (item.original_name) {
      text = item.original_name;
    }

    return text;
  }
}
