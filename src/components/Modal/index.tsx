import { ModalItem } from "./ModalItem";
import { IoCloseOutline } from "react-icons/io5";
import { RefObject, useEffect, useMemo, useState } from "react";
import { ProductInCart } from "../../types/productsModel";
import { CartUseCase } from "../../useCases/CartUseCase";
import { useGobalContext } from "../../context";

type Props = {
    onClose(): void
    isVisible: boolean
    cartList: ProductInCart[]
    modalRef: RefObject<HTMLDivElement>
    removeFromCart: (id: string) => void
}

export function Modal({ isVisible, onClose, cartList, removeFromCart, modalRef }: Props) {
    const { useCartHook } = useGobalContext()
    const cartUseCase = useMemo(() => {
        return new CartUseCase(useCartHook);
    }, [useCartHook])

    function finalized() {
        console.log(cartUseCase.cartList);
    }

    useEffect(() => {
        cartUseCase.getTotal()
    }, [cartUseCase])

    return isVisible ? (
        <div ref={modalRef} data-testid="modal" className="z-50 h-full sm:w-[500px] w-[350px] bg-[#0F52BA] top-0 right-0 fixed shadow-lg flex flex-col justify-between overflow-y-auto">
            <div>
                <header className="flex justify-between items-center pt-9 sm:pl-14 sm:pr-5 pl-11 pr-5">
                    <h2 className="font-bold text-white text-[27px] w-[180px] leading-8">Carrinho <br /> de compras</h2>

                    <button onClick={onClose} data-testid='closeButton' className="bg-black rounded-full p-1 cursor-pointer">
                        <IoCloseOutline size={32} color="#fff" />
                    </button>
                </header>

                {cartList.map((product) => (
                    <ModalItem
                        id={product.id}
                        key={product.id}
                        url={product.photo}
                        name={product.name}
                        quantity={product.quantity}
                        description={product.description}
                        price={Number(product.price)}
                        removeItem={() => removeFromCart(product.id)}
                    />
                ))}
            </div>

            <div>
                <div className="flex justify-between px-12 my-10">
                    <p className="text-white font-bold text-3xl leading-4">Total:</p>
                    <span className="text-white font-bold text-3xl leading-4">
                        R${useCartHook.totalPrice}
                    </span>
                </div>

                <button onClick={finalized} className="bg-black text-white font-bold text-3xl leading-4 w-full py-10">
                    Finalizar Compra
                </button>
            </div>
        </div>
    ) : null
}