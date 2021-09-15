import { ActionDispatcher } from "./ActionDispatcher";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BaseActionDispatcher implements ActionDispatcher {
  constructor() { }
  /**
   * Get the token convert it and call the method requested .
   */
  dispatchAction(token: string,...args): any {
    const tokenArray = token.split("-");
    let transformedToken = [];
    for (let i = 0; i < tokenArray.length; i++) {
      if (i !== 0) {
        transformedToken.push(tokenArray[i].charAt(0).toUpperCase() + tokenArray[i].slice(1));
      } else {
        transformedToken.push(tokenArray[i]);
      }
    }
    const methodName = transformedToken.join("");
    return this[methodName].apply(this,args);
  }

}