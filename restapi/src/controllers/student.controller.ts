//for service
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
//Accessing HTTP request and response objects
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, Request, requestBody, RequestContext, Response, response, RestBindings
} from '@loopback/rest';
import {Company, Student} from '../models';
import {studentViewModel} from '../models/Request/studentViewmodel';
import {CompanyRepository, StudentRepository} from '../repositories';
import {ApiserviceService} from '../services/apiservice.service';
// service aadd cheyunnath
import {FirstserviceService} from '../services/firstservice.service';






// import {DbDataSource} from '../datasources';
const ObjectID = require('mongodb').ObjectID;


export class StudentController {
  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository,

    @repository(CompanyRepository)
    public companyRepository: CompanyRepository,
    /// service add cheyunnu
    @inject('services.FirstserviceService')
    public Firstservice: FirstserviceService,
    // Request
    @inject(RestBindings.Http.REQUEST) private request: Request,
    // Response
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    //RequestContext
    @inject(RestBindings.Http.CONTEXT) private requestCtx: RequestContext
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
    const apiserviceService = new ApiserviceService()
    apiserviceService.SaiHello()

    return this.studentRepository.count(where);
  }
  //////////   ethil service use cheythkknnu
  @get('/studentsssss')
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
    return this.Firstservice.AllAdmin(filter);
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
          schema: getModelSchemaRef(studentViewModel, {
            title: 'fullDetail Model',
            exclude: ['id'],
          }),
        },
      },
    })
    allDetails: Omit<studentViewModel, 'id'>,
  ): Promise<any> {
    try {
      const companyDetailz = new Company()
      companyDetailz.companyName = allDetails.companyName;
      companyDetailz.Department = allDetails.Department;
      companyDetailz.numberofStaffs = allDetails.numberofStaffs;
      companyDetailz.place = allDetails.place;
      companyDetailz.teamLead = allDetails.teamLead;

      const studentDetailz = new Student()
      studentDetailz.course = allDetails.course;
      studentDetailz.email = allDetails.email;
      studentDetailz.name = allDetails.name;
      studentDetailz.job = allDetails.job;
      studentDetailz.teamLead = allDetails.teamLead;
      studentDetailz.isQualified = allDetails.isQualified;
      studentDetailz.password = allDetails.password;

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
    allDetails: any
  ): Promise<any> {
    try {
      const companyDetailz = new Company()
      companyDetailz.companyName = allDetails.companyName;
      companyDetailz.Department = allDetails.Department;
      companyDetailz.numberofStaffs = allDetails.numberofStaffs;
      companyDetailz.place = allDetails.place;
      companyDetailz.teamLead = allDetails.teamLead;

      const studentDetailz = new Student()
      studentDetailz.course = allDetails.course;
      studentDetailz.email = allDetails.email;
      studentDetailz.name = allDetails.name;
      studentDetailz.job = allDetails.job;
      studentDetailz.teamLead = allDetails.teamLead;
      studentDetailz.isQualified = allDetails.isQualified;
      studentDetailz.password = allDetails.password;

      this.studentRepository.create(studentDetailz)
      this.companyRepository.create(companyDetailz)
    }
    catch (e) {

    }
  }


  @post('/students/FullDetailsnew')
  @response(200, {
    description: 'Student model instance',
  })
  async creatingFullDetailsnew(
    @param.query.object('student') student: Student,
    @param.query.object('company') company: Company,
  ): Promise<any> {
    this.studentRepository.create(student);
    this.companyRepository.create(company);
  }



  // @get('/student/getStud')
  // @response(200, {
  //   description: 'Array of Student model instances',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'array',
  //         items: getModelSchemaRef(Student, {includeRelations: true}),
  //       },
  //     },
  //   },
  // })findDetails(): object {
  //     // Reply with a greeting, the current time, the url, and request headers
  //     return {
  //       greeting: 'Hello from LoopBack',
  //       date: new Date(),
  //       url: this.request.url,
  //       headers: Object.assign({}, this.request.headers),
  //     };
  //   }




  ////////////   Request , Response, Inject HTTP request context      ethil ellaaam und/////////////////////////////



  ////  Request

  @get('/student/getStud')
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
  }) async findDetails(): Promise<any> {
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

      return {
        studentdetails: studentDetails,
        url: this.request.url,
        headers: Object.assign({}, this.request.headers),

      }
    }
    catch (e) {
      return e.message

    }
  }


  @post('/students/input')
  @response(200, {
    description: 'Student model instance',
    content: {'application/json': {schema: getModelSchemaRef(Student)}},
  })
  async inputData(
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
  ): Promise<any> {
    try {
      const body = this.request.body      // eth nalloru example aaannu
      console.log("body", body)

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


  ///////  Response

  @get('/getResponseDetails/{id}')
  @response(200, {
    description: 'Student model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Student, {includeRelations: true}),
      },
    },
  })
  async findDetailsById(
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
      this.response.status(200).send({
        studentDetails: studentDetails,
        date: new Date(),
      });
      // return studentDetails
    }
    catch (e) {
      return e.message

    }
  }


  /////  RequestContext

  @get('/getDet/{id}')
  @response(200, {
    description: 'Student model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Student, {includeRelations: true}),
      },
    },
  })
  async findDetById(
    @param.path.string('id') id: string
  ): Promise<any> {
    try {
      const {request, response} = this.requestCtx;
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
      response.status(200).send({
        studentDetails: studentDetails,
        date: new Date(),
      });
      // return studentDetails
    }
    catch (e) {
      return e.message

    }
  }






}
