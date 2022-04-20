


import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';

import {Student} from '../models';
import {StudentRepository} from '../repositories';

import {Company} from '../models';
import {CompanyRepository} from '../repositories';

import{studentViewModel} from '../models/Request/studentViewmodel'

// import {DbDataSource} from '../datasources';

const ObjectID = require('mongodb').ObjectID;


export class StudentController {
  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository,

    @repository(CompanyRepository)
    public companyRepository : CompanyRepository,
  ) { }

  @post('/students')
  @response(200, {
    description: 'Student model instance',
    content: {'application/json': {schema: getModelSchemaRef(Student)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {
            title: 'NewStudent',
            exclude: ['id'],
          }),
        },
      },
    })
    student: Omit<Student, 'id'>,
  ): Promise<Student> {
    return this.studentRepository.create(student);
  }

  @get('/students/count')
  @response(200, {
    description: 'Student model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Student) where?: Where<Student>,
  ): Promise<Count> {
    return this.studentRepository.count(where);
  }

  @get('/students')
  @response(200, {
    description: 'Array of Student model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Student, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Student) filter?: Filter<Student>,
  ): Promise<Student[]> {
    return this.studentRepository.find(filter);
  }

  @patch('/students')
  @response(200, {
    description: 'Student PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {partial: true}),
        },
      },
    })
    student: Student,
    @param.where(Student) where?: Where<Student>,
  ): Promise<Count> {
    return this.studentRepository.updateAll(student, where);
  }

  @get('/students/{id}')
  @response(200, {
    description: 'Student model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Student, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Student, {exclude: 'where'}) filter?: FilterExcludingWhere<Student>
  ): Promise<Student> {
    return this.studentRepository.findById(id, filter);
  }

  @patch('/students/{id}')
  @response(204, {
    description: 'Student PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {partial: true}),
        },
      },
    })
    student: Student,
  ): Promise<void> {
    await this.studentRepository.updateById(id, student);
  }

  @put('/students/{id}')
  @response(204, {
    description: 'Student PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() student: Student,
  ): Promise<void> {
    await this.studentRepository.replaceById(id, student);
  }

  @del('/students/{id}')
  @response(204, {
    description: 'Student DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.studentRepository.deleteById(id);
  }



  @get('/getAllDetails')
  @response(200, {
    description: 'Student model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Student, {includeRelations: true}),
      },
    },
  })
  async findAllDetails(): Promise<any> {
    try {
      const studentsCollection = (this.studentRepository.dataSource
        .connector as any).collection("Student");
      let studentDetails = await studentsCollection.aggregate([
        {
          $lookup:
          {
            from: "Company",
            localField: "teamLead",
            foreignField: "teamLead",
            as: "Employ details"
          }
        }
      ]).get()

      return studentDetails
    }
    catch (e) {
      return e.message

    }
  }




  @get('/getAllDetails/{id}')
  @response(200, {
    description: 'Student model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Student, {includeRelations: true}),
      },
    },
  })
  async findAllDetailsById(
    @param.path.string('id') id: string
  ): Promise<any> {
    try {

      const studentsCollection = (this.studentRepository.dataSource
        .connector as any).collection("Student");
      let studentDetails = await studentsCollection.aggregate([
        {
          $lookup:
          {
            from: "Company",
            localField: "teamLead",
            foreignField: "teamLead",
            as: "Studentdetails"
          }
        },
        {
          $match: {
            "_id": ObjectID(id)
          }
        }
      ]).get()
      return studentDetails
    }
    catch (e) {
      return e.message

    }
  }


  @post('/students/insert')
  @response(200, {
    description: 'Student model instance',
    content: {'application/json': {schema: getModelSchemaRef(Student)}},
  })
  async insertingData(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {
            title: 'NewStudent',
            exclude: ['id'],
          }),
        },
      },
    })
    student: Omit<Student, 'id'>,
  ): Promise<Student> {
    try {

      const studentsCollection = (this.studentRepository.dataSource
        .connector as any).collection("Student");
      let studentDetails = await studentsCollection.insert(student).post()
      // console.log("studentDetails",studentDetails)
      return studentDetails
    }
    catch (e) {
      return e.message

    }

  }


  @post('/students/insertbothDetails')
  @response(200, {
    description: 'Student model instance',
    content: {'application/json': {schema: getModelSchemaRef(studentViewModel)}},
  })
  async insertingDataintoBth(

    @requestBody({
      content: {
        'application/json': {
          schema:getModelSchemaRef(studentViewModel, {
            title: 'fullDetail Model',
            exclude: ['id'],
          }),
        },
      },
    })
    allDetails: Omit<studentViewModel, 'id'>,
  ): Promise<any> {
    try {
      const companyDetailz =new Company()
      companyDetailz.companyName=allDetails.companyName;
      companyDetailz.Department=allDetails.Department;
      companyDetailz.numberofStaffs=allDetails.numberofStaffs;
      companyDetailz.place=allDetails.place;
      companyDetailz.teamLead=allDetails.teamLead;

      const studentDetailz= new Student()
      studentDetailz.course=allDetails.course;
      studentDetailz.email=allDetails.email;
      studentDetailz.name=allDetails.name;
      studentDetailz.job=allDetails.job;
      studentDetailz.teamLead=allDetails.teamLead;
      studentDetailz.isQualified=allDetails.isQualified;
      studentDetailz.password=allDetails.password;

      this.studentRepository.create(studentDetailz)
      this.companyRepository.create(companyDetailz)

      // const companyCollection = (this.companyRepository.dataSource
      //   .connector as any).collection("Company");
      // let companyDetails = await companyCollection.insert(companyDetailz).post()
      // console.log("companyDetails",companyDetails)

      // const studentsCollection = (this.studentRepository.dataSource
      //   .connector as any).collection("Student");
      // let studentDetails = await studentsCollection.insert(studentDetailz).post()


      return allDetails
    }
    catch (e) {
      return e.message

    }

  }


  @post('/students/FullDetails')
  @response(200, {
    description: 'Student model instance',
  })
  async creatingFullDetails(
    @requestBody()
    allDetails:any
  ): Promise<any> {
    try{
      const companyDetailz =new Company()
      companyDetailz.companyName=allDetails.companyName;
      companyDetailz.Department=allDetails.Department;
      companyDetailz.numberofStaffs=allDetails.numberofStaffs;
      companyDetailz.place=allDetails.place;
      companyDetailz.teamLead=allDetails.teamLead;

      const studentDetailz= new Student()
      studentDetailz.course=allDetails.course;
      studentDetailz.email=allDetails.email;
      studentDetailz.name=allDetails.name;
      studentDetailz.job=allDetails.job;
      studentDetailz.teamLead=allDetails.teamLead;
      studentDetailz.isQualified=allDetails.isQualified;
      studentDetailz.password=allDetails.password;

      this.studentRepository.create(studentDetailz)
      this.companyRepository.create(companyDetailz)
    }
    catch(e){

    }
  }


}
