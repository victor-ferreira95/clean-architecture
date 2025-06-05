import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          number: 123,
          zip: '12345',
        },
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('John Doe')
    expect(response.body.address.street).toBe('123 Main St')
    expect(response.body.address.city).toBe('Anytown')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe('12345')
  })
})
