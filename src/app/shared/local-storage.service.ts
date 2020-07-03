export class StorageHelper {
    static getLocal<T>(key: string): T {
      return JSON.parse(localStorage.getItem(key));
    }
  
    static setLocal(key: string, value: any): any {
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    static removeLocal(key: string) {
      localStorage.removeItem(key);
    }
  
    static clearLocal() {
      localStorage.clear();
    }
  
    static getSession<T>(key: string): T {
      return JSON.parse(sessionStorage.getItem(key));
    }
  
    static setSession(key: string, value: any): any {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  
    static removeSession(key: string) {
      sessionStorage.removeItem(key);
    }
  
    static clearSession() {
      sessionStorage.clear();
    }
  
    static clear() {
      localStorage.clear();
      sessionStorage.clear();
    }
  
}
  