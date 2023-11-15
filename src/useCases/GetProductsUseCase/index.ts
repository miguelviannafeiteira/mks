import { PRODUCTS_RESPONSE } from "../../mocks";
import { ProductsOutput } from "../../types/productsModel";
import { useProductsInterface } from "../../hooks/useProducts";

export class GetProductsUseCase {
    private api: () => Promise<ProductsOutput>
    private useProducts: useProductsInterface

    constructor(api: () => Promise<ProductsOutput>, useProducts: useProductsInterface) {
        this.api = api;
        this.useProducts = useProducts;
    }

    async execute() {
        this.useProducts.startLoading()
        this.useProducts.mountProductsList(PRODUCTS_RESPONSE)

        try {

            const data = await this.api()
            this.useProducts.mountProductsList(data.products)
        } catch (e) {
            console.error({ e, message: "Houve um erro ao buscar os produtos" })
        }
        finally {
            this.useProducts.stopLoading()
        }
    }

    get products() {
        return this.useProducts.products
    }
}