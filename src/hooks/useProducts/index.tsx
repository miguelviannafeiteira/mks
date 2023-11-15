import { RefObject, useState } from "react"
import { Product, ProductInCart } from "../../types/productsModel"

export interface useProductsInterface {
    isLoading: boolean
    stopLoading(): void
    startLoading(): void
    products: Product[]
    mountProductsList(products: Product[]): void
    showModal(): void
    hideModal(): void
    isModalVisible: boolean
    outSideClick(modalRef: RefObject<HTMLDivElement>): void
}

export function useProducts(): useProductsInterface {
    const [products, setProducts] = useState<Product[]>([])

    const [isLoading, shouldDisplayLoading] = useState(false)
    const [isModalVisible, shouldDisplayModal] = useState(false)

    function mountProductsList(dataProducts: Product[]) {
        setProducts(dataProducts)
    }

    function startLoading() {
        shouldDisplayLoading(true)
    }

    function stopLoading() {
        shouldDisplayLoading(false)
    }

    function showModal() {
        shouldDisplayModal(true)
    }

    function hideModal() {
        shouldDisplayModal(false)
    }

    function outSideClick(modalRef: RefObject<HTMLDivElement>) {
        const outSideClickOnModal = (e: any) => {
            if (!modalRef?.current?.contains(e.target)) {
                hideModal()
            }
        }
        document.addEventListener("mousedown", outSideClickOnModal)
    }

    return {
        products,
        mountProductsList,
        isLoading,
        stopLoading,
        startLoading,
        hideModal,
        isModalVisible,
        showModal,
        outSideClick
    }
}