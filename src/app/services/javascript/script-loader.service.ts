import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  constructor(private http: HttpClient) { }

  loadScripts(urls: string[]): Promise<any[]> {
    const loadScript = (url: string) => {
      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = url;
        scriptElement.onload = resolve;
        scriptElement.onerror = reject;
        document.head.appendChild(scriptElement);
      });
    };

    const promises = urls.map((url) => loadScript(url));
    return Promise.all(promises);
  }
}
