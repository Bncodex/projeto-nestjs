import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProdutosService } from './produtos.service.js';
import { CreateProdutoDto } from './dto/create-produto.dto.js';

@ApiTags('produtos')
@Controller('produtos')

export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}
  // POST /produtos
  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.', // Deu certo
  })
  @ApiResponse({
    status: 400,
    description: 'Dados recusados pelo Schema.', // Não de certo 
  })
  @ApiResponse({
    status: 409,
    description: 'Produto já registrado.', // Produto que já existe no banco de dados
  })
  async criar(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }
  // GET /produtos/:id
  @Get(':id')
  @ApiOperation({ summary: 'Busca um produto pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado.', // Mostra o produto
  })
  @ApiResponse({
    status: 400,
    description: 'ID em formato inválido.', // Não deu certo
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado.', // Produto não existe no banco de dados
  })
  buscarPorId(@Param('id') id: string) {
    return this.produtosService.findOne(id);
  }
}
