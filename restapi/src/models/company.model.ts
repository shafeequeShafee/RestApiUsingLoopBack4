import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Company extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  companyName?: string;

  @property({
    type: 'string',
    required: true,
  })
  place: string;

  @property({
    type: 'number',
    required: true,
  })
  numberofStaffs: number;

  @property({
    type: 'string',
    required: true,
  })
  Department: string;

  @property({
    type: 'string',
    required: true,
  })
  teamLead: string;



  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
