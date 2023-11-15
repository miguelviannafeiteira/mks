import { useCartInterface } from "../../hooks/useCart";
import { Product, ProductInCart } from "../../types/productsModel";

export class CartUseCase {
    private useCart: useCartInterface

    constructor(useProducts: useCartInterface) {
        this.useCart = useProducts;
    }

    increaseQuantity(product: ProductInCart) {
        product.quantity++
    }

    decreaseQuantity(product: ProductInCart) {
        product.quantity--
    }

    addToCart(product: Product) {
        const itemInCart = this.cartList.find((cartItem) => cartItem.id === product.id)

        if (itemInCart) {
            this.increaseQuantity(itemInCart)
            return
        }

        this.useCart.addToCartList(product)
    }

    getPrice(product: ProductInCart): number {
        return Number(product.price) * product.quantity
    }

    addUnits(id: string) {
        const itemInCart = this.cartList.find((cartItem) => cartItem.id === id)
        this.increaseQuantity(itemInCart!)
        this.getTotal()
    }

    removeUnits(id: string) {
        const itemInCart = this.cartList.find((cartItem) => cartItem.id === id)

        if (itemInCart?.quantity === 1) {
            this.useCart.removeFromCartList(id)
        }

        this.decreaseQuantity(itemInCart!)
        this.getTotal()
    }

    get cartList(): ProductInCart[] {
        return this.useCart.cartList
    }

    getTotal() {
        this.useCart.defineTotalPrice(this.cartList.reduce((prevValue, acc) => this.getPrice(acc) + prevValue, 0))
    }
}