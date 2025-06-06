import express, { Request, Response, Router } from 'express'
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase'
import ProductRepository from '../../product/repository/sequelize/product.repository'
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase'

export const productRoute: Router = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    }
    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

productRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository())
  const output = await usecase.execute({})
  res.send(output)
})
