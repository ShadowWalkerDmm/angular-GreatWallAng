import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private subject: Subject<MessageEvent> | undefined;

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = new Observable((observer) => {
      ws.onmessage = observer.next.bind(observer);
      ws.onerror = observer.error.bind(observer);
      ws.onclose = observer.complete.bind(observer);
      return () => {
        ws.close();
      };
    });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }

  public sendMessage(message: any): void {
    if (this.subject) {
      this.subject.next(message);
    } else {
      console.error('WebSocket connection is not established.');
    }
  }

}
