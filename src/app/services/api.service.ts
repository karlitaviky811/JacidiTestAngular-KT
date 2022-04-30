import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'https://api.themoviedb.org/3/'
  private key = 'api_key=12d5adbd48868887ee10cd978312d4be&language=en-US'

  /**
   * Constructor
   * 
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Get Casts Movies
   * 
   * @param item 
   * @returns 
   */
  public getCastsMovies(item: Number): Observable<any> {
    return this.http.get<any>(`${this.URL}movie/${item}/credits?${this.key}`)
  }

  /**
   *  Get Review Series
   * 
   * @param item 
   * @returns 
   */
  public getReviewSeries(item: Number): Observable<any> {
    return this.http.get<any>(`${this.URL}/tv/${item}/reviews?${this.key}`)
    
  }

  /**
   * Get Tv Popular
   * 
   * @returns 
   */
  public getTvPopular(): Observable<any> {
    return this.http.get(`${this.URL}tv/popular?${this.key}`)
  }

  /**
   * Get Trending
   * 
   * @returns 
   */
  public getTrending(): Observable<any> {
    return this.http.get(`${this.URL}trending/all/day?${this.key}`)
  }

  /**
   * Get Top Rated
   * 
   * @returns 
   */
  public getTopRated(): Observable<any> {
    return this.http.get(`${this.URL}movie/top_rated?${this.key}`)
  }

  /**
   * Get Movie Detail
   * 
   * @returns 
   */
  public getMovieDetail(movieId: Number): Observable<any> {
    return this.http.get(`${this.URL}movie/${movieId}?${this.key}`)
  }

  /**
   * Get Genre Movie 
   * 
   * @returns 
   */
  public genreMovie() {
    return this.http.get(`${this.URL}/genre/movie/list?${this.key}`)
  }

  /**
   * Get Genre Tv
   * 
   * @returns 
   */
  public genreTv() {
    return this.http.get(`${this.URL}/genre/tv/list?${this.key}`)
  }
}
