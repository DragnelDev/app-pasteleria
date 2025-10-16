import { Injectable } from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';

@Injectable()
export class PersonalesService {
  create(createPersonalDto: CreatePersonalDto) {
    return 'This action adds a new personale';
  }

  findAll() {
    return `This action returns all personales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personale`;
  }

  update(id: number, updatePersonalDto: UpdatePersonalDto) {
    return `This action updates a #${id} personale`;
  }

  remove(id: number) {
    return `This action removes a #${id} personale`;
  }
}
