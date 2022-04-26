import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class ApiserviceService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  SaiHello(){
    console.log('hiii sfq')
  }


}


