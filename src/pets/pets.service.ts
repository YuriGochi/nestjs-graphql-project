import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); //newPet = new Pet(); newPet.name = createPetInput.name; ...
    return this.petsRepository.save(newPet); // insert into pet ...
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); // SELECT * FROM pet
  }

  findOne(id: number): Promise<Pet> {
    const options: FindOneOptions = { where: { id } };
    return this.petsRepository.findOneOrFail(options); // SELECT * FROM pet WHERE id = id
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
