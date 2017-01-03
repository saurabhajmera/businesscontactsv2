import { Injectable } from '@angular/core';
import {Business} from "../model/Business";

@Injectable()
export class ActiveBusinessService {

  activeBusiness:Business;
  activeKey:any;

  constructor() { }

}
