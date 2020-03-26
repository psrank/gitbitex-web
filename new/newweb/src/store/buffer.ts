export class SocketMsgBuffer {
  private readonly timeout: number = 0;
  private buffers: any[] = [];
  private readonly action: (buffers: any[]) => void;

  constructor(action: (buffers: any[]) => void, timeout = 200) {
    this.timeout = timeout;
    this.action = action;
    setInterval(() => {
      if (this.buffers.length > 0) {
        this.action(this.buffers);
        this.buffers = [];
      }
    }, this.timeout);
  }

  push(data: any) {
    this.buffers.push(data);
  }
}
