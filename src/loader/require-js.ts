export abstract class RequireJs {
  static import<T>(module: string): Promise<T> {
    return new Promise((resolve, reject) => {
      (<any>window).require(
        [module],
        (resource: T) => {
          resolve(<T>resource);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
}
