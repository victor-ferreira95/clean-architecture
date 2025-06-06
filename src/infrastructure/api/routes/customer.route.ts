import express, { Request, Response, Router } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase'
import CustomerRepository from '../../costumer/repository/sequelize/costumer.repository'
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase'

export const customerRoute: Router = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    }

    const output = await usecase.execute(customerDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository())
  const output = await usecase.execute({})
  res.send(output)
})
