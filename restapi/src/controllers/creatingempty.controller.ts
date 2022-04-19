// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import{get} from '@loopback/rest'
export class CreatingemptyController {
  constructor() {}

  @get('/hello-world',{responses:{
    '200':{
      description:'this is our new description',
      content:{
        'application/json':{
          schema:{
            type:'string'
          }
        }
      }
    }
  }})
  async sayHello():Promise<Object>{   // type evidae specify cheyyaaa
    console.log('yes it is called')
    return {hello:'World'}
  }
}
