import { RequestHandler } from 'msw';
import type { SetupWorker } from 'msw/browser';

class WorkerManager {
  private static instance: WorkerManager;
  private worker: SetupWorker | null = null;
  private orginHandlers: Array<RequestHandler> = [];

  private constructor() {}

  // Singleton 인스턴스 반환
  public static getInstance(): WorkerManager {
    if (!WorkerManager.instance) {
      WorkerManager.instance = new WorkerManager();
    }
    return WorkerManager.instance;
  }

  // Worker 초기화
  public initializeWorker(worker: SetupWorker): void {
    if (!this.worker) {
      this.worker = worker;
      this.orginHandlers = worker
        .listHandlers()
        .filter((handler) => handler instanceof RequestHandler);

      console.log('Worker initialized.');
    } else {
      console.warn('Worker is already initialized.');
    }
  }

  public start(): void {
    if (!this.worker) {
      throw new Error('Worker is not initialized.');
    }
    this.worker.start();
    console.log('Worker started.');
  }

  public stop(): void {
    if (!this.worker) {
      throw new Error('Worker is not initialized.');
    }
    this.worker.stop();
    console.log('Worker stopped.');
  }

  public getWorker(): SetupWorker | null {
    return this.worker;
  }

  public getOriginalHandlers(): Array<RequestHandler> {
    if (!this.worker) {
      throw new Error('Worker is not initialized.');
    }
    return this.orginHandlers;
  }
}

export default WorkerManager;
