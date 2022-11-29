import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories/user.repository';
import {BcryptHasher} from './hash.password';

export class MyUserService implements UserService<User, Credentials>{
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher

  ) {}
  async verifyCredentials(credentials: Credentials): Promise<User> {
    // implement this method
    const foundCustomer = await this.userRepository.findOne({
      where: {
        email: credentials.email
      }
    });
    if (!foundCustomer) {
      throw new HttpErrors.NotFound('customer not found');
    }
    const passwordMatched = await this.hasher.comparePassword(credentials.password, foundCustomer.password)
    if (!passwordMatched)
      throw new HttpErrors.Unauthorized('password is not valid');
    return foundCustomer;
    }
  convertToUserProfile(customer: User): UserProfile {
    return {
      [securityId]: customer.id!.toString(),
      id: customer.id,
      email: customer.email,
      roles: customer.role,
    };
    // throw new Error('Method not implemented.');
  }

}