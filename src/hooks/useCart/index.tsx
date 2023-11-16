import { Dispatch, SetStateAction, useState } from "react"
import { Product, ProductInCart } from "../../types/productsModel"

export interface useCartInterface {
    cartList: ProductInCart[]
    addToCartList(product: Product): void
    removeFromCartList(id: string): void
    totalPrice: number
    defineTotalPrice: Dispatch<SetStateAction<number>>
    isTagVisible: boolean
    showTag(): void
}

export function useCart(): useCartInterface {
    const [totalPrice, defineTotalPrice] = useState(0)
    const [isTagVisible, shouldDisplayTag] = useState(false)
    const [cartList, addProductsToCart] = useState<ProductInCart[]>([])

    function addToCartList(product: Product) {
        addProductsToCart((prev) => ([...prev, { ...product, quantity: 1 }]))
    }

    function removeFromCartList(id: string) {
        addProductsToCart(cartList.filter((item) => item.id !== id))
    }

    function showTag() {
        shouldDisplayTag(true)

        setTimeout(() => {
            shouldDisplayTag(false)
        }, 2000);
    }

    return {
        cartList,
        addToCartList,
        removeFromCartList,
        defineTotalPrice,
        totalPrice,
        isTagVisible,
        showTag
    }
}