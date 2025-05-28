import Product from '../../../domain/product/entity/product'
import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'
import { InputListProductDto, OutputListProductDto } from './list.product.dto'

export default class ListProductUseCase {
  private productInterface: ProductRepositoryInterface

  constructor(productInterface: ProductRepositoryInterface) {
    this.productInterface = productInterface
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productInterface.findAll()
    return OutputMapper.toOutput(products)
  }
}

class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    }
  }
}
