import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import * as XLSX from "xlsx";
import { RequestOptions, ResponseContentType } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class TemplateService {
  private xlsxUrl: string = "assets/template/template.xlsx";
  
  constructor(private http: HttpClient) {}

  getFile(): Observable<ArrayBuffer> {
    return this.http.get<ArrayBuffer>("assets/template/template.xlsx", {
      responseType: "arraybuffer" as "json"
    });
  }

  downloadFile(): Observable<Blob> {
    return this.http
      .get(this.xlsxUrl, {
        responseType: "blob"
      })
      .pipe(map((res: any) => res));
  }

}
