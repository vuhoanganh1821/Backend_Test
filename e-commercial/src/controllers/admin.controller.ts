import * as _ from 'lodash';
import {
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
  getJsonSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import {User} from '../models';
import {UserRepository, Credentials} from '../repositories';
import {validateCredentials} from '../services'
import {PasswordHasherBindings} from '../keys'
import {BcryptHasher} from '../services/hash.password';
import {basicAuthorization} from '../services/basic.authorizor';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';

export class AdminController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,

  ) {}


  @get("/admin/readAgency/{id}")
  @response(200, {
    description: 'Admin read data of agency',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @post("/admin/createAgency", {
    responses: {
      '200': {
        description: 'Admin create Agency',
        content: {
          schema: getJsonSchemaRef(User)
        }
      }
    }
  })
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  async createUser(@requestBody() userData: User) {
    await validateCredentials(_.pick(userData, ['email', 'password']), this.userRepository);
    userData.password = await this.hasher.hashPassword(userData.password)
    userData.roles = ['agency']
    const savedUser = await this.userRepository.create(userData);
    savedUser.password = "******"
    return savedUser;
  }

  @patch("/admin/updateAgency/{id}")
  @response(204, {
    description: 'Agency PATCH success',
  })
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @del("/admin/deleteAgency/{id}")
  @response(204, {
    description: 'Agency DELETE success',
  })
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin'], voters: [basicAuthorization]})
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }


}