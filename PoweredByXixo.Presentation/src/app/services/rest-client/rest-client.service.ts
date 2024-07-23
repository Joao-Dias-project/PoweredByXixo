import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
  export class RestClientService {
    constructor(private http: HttpClient) { }

    baseUrl = 'https://localhost:7205/api';

    public getAll<T>(endpoint: string) :  undefined {
        this.http.get<T>(this.baseUrl+endpoint).subscribe((data) => {return data;});
    };


}
