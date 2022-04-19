import {injectable, /* inject, */ BindingScope, Provider} from '@loopback/core';

/*
 * Fix the service type. Possible options can be:
 * - import {Test} from 'your-module';
 * - export type Test = string;
 * - export interface Test {}
 */
export type Test = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class TestProvider implements Provider<Test> {
  constructor(/* Add @inject to inject parameters */) {}

  value() {
    // Add your implementation here
    throw new Error('To be implemented');
  }
}
