import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";

/*
  Generated class for the VitalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VitalProvider {
  ip: "10.25.150.118";
  url: string = `http://${this.ip}:8080/vitals`;
  constructor(public http: HttpClient, private storage: Storage) {
    console.log("Hello VitalProvider Provider");
  }

  /**
   * Submit Vital
   */
  submitVital(vital) {
    return new Promise(async (resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      let body = {
        token: await this.storage.get("AuthToken"),
        type: "Spirometry",
        value: vital
      };

      this.http.post(`${this.url}/add`, body, { headers: headers }).subscribe(
        data => {
          if (data == true) resolve(true);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }
}