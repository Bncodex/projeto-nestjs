import { Controller, Get, Param } from '@nestjs/common';
import { LivrosService } from './livros.service.js';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  // GET /livros/:id
  @Get(':id')
  buscarPorId(@Param('id') id: string) { // sempre que vem da url tem que ser do tipo String
    return this.livrosService.findOne(+id); // +id converte o id do tipo String para Number.
  }
}
