import {injectable, /* inject, */ BindingScope} from '@loopback/core';

import {StudentRepository} from '../repositories/student.repository';
import {repository} from '@loopback/repository';


@injectable({scope: BindingScope.TRANSIENT})
export class FirstserviceService {

  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository
  ) { }

  AllAdmin(filter:any) {
    return this.studentRepository.find(filter);
  }

}
