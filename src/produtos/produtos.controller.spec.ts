import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { ProdutosController } from './produtos.controller.js';
import { ProdutosService } from './produtos.service.js';

describe('ProdutosController', () => {
  let controller: ProdutosController;
  // Service falso: o controller é testado sem o Mongoose.
  const produtosService = {
    create: vi.fn(),
    findOne: vi.fn(),

  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [
        {
          provide: ProdutosService,
          useValue: produtosService,
        },
      ],

    }).compile();
    controller = module.get<ProdutosController>(ProdutosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('buscarPorId deve devolver o produto', () => {
    produtosService.findOne.mockReturnValue({
      id: 2,
      nome: 'Mouse',
      preco: 80,
    });
    expect(controller.buscarPorId('2').nome).toBe('Mouse');
  });

  it('criar deve devolver o documento criado', async () => {
    const dto = {
      nome: 'Torno CNC X200',
      preco: 15000,
      categoria: 'Ferramentas',
    };

    produtosService.create.mockResolvedValue({
      _id: 'abc123',
      ...dto,
    });
    
    const criado = await controller.criar(dto);
    expect(produtosService.create).toHaveBeenCalledWith(dto);
    expect(criado).toMatchObject({ _id: 'abc123' });
  });
});
