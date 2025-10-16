import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonalesService } from './personales.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';

@Controller('personales')
export class PersonalesController {
  constructor(private readonly personalesService: PersonalesService) {}

  @Post()
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalesService.create(createPersonalDto);
  }

  @Get()
  findAll() {
    return this.personalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonalDto: UpdatePersonalDto,
  ) {
    return this.personalesService.update(+id, updatePersonalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalesService.remove(+id);
  }
}
