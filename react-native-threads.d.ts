// react-native-threads.d.ts
declare module 'react-native-threads' {
    export class Thread {
      constructor(filePath: string);
      postMessage(message: any): void;
      terminate(): void;
      onmessage: (message: any) => void;
    }
  }