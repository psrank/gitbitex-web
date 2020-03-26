import { Service } from "./service";

export class FileService extends Service {
  getFileUrl() {
    return this.request.get(`/files/url`);
  }

  upload(file: any) {
    return new Promise(
      (resolve: (value?: any) => void, reject: (reason?: any) => void) => {
        this.getFileUrl().then((response: any) => {
          const reader = new FileReader();
          reader.onload = e => {
            const ui8a = new Uint8Array(reader.result as ArrayBuffer);
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("PUT", response.url);
            xmlHttp.send(ui8a.buffer);
            xmlHttp.onreadystatechange = () => {
              resolve(response.key);
            };
          };
          reader.readAsArrayBuffer(file);
        });
      }
    );
  }
}
