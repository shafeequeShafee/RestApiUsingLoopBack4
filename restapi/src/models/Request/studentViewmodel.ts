import { Model, model, property } from '@loopback/repository';
@model({ settings: { strict: false } })
export class studentViewModel {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  job: string;

  @property({
    type: 'string',
    required: true,
  })
  teamLead: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  course: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isQualified: boolean;

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

}
