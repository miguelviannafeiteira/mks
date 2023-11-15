import Image from "next/image";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { GrFormSubtract } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";
import { useGobalContext } from "../../../context";
import { CartUseCase } from "../../../useCases/CartUseCase";

type Props = {
    id: string
    url: string
    name: string
    price: number
    quantity: number
    description: string
    removeItem(): void
}

export function ModalItem({ name, price, url, description, quantity, removeItem, id }: Props) {
    const beforeAfterClass = "before:absolute before:content-[''] before:w-[1px] before:h-[20px] before:bg-[#BFBFBF] before:top-[4px] sm:before:left-[21px] before:left-[34px] after:absolute after:content-[''] after:w-[1px] after:h-[20px] after:bg-[#BFBFBF] after:top-[4px] sm:after:right-[22px] after:right-[34px]"
    const [productQuantity, defineQuantity] = useState(quantity)

    const { useCartHook } = useGobalContext()
    const cartUseCase = new CartUseCase(useCartHook)

    function increaseQuantity() {
        defineQuantity((prev) => prev + 1)
        cartUseCase.addUnits(id)
    }

    function decreaseQuantity() {
        defineQuantity((prev) => prev - 1)
        cartUseCase.removeUnits(id)
    }

    return (
        <div className="mt-16 relative bg-white sm:h-[100px] sm:w-[379px] flex sm:flex-row flex-col justify-around items-center gap-4 mx-auto px-4 w-[250px] h-[220px] rounded-md shadow-md">
            <Image src={url} alt={description} width={90} height={57} className="overflow-hidden" />

            <p className="sm:text-base text-center text-lg font-normal sm:w-[113px] w-full text-[#2C2C2C]">
                {name}
            </p>

            <div className="gap-5 flex">
                <div className="flex items-center justify-around border gap-2 rounded-md relative sm:w-[65px] w-[100px]">
                    <span className="text-[#000000] text-[10px] font-normal absolute top-[-14px] left-0 sm:block hidden">
                        Qtd:
                    </span>

                    <button onClick={decreaseQuantity} className="cursor-pointer sm:pl-2 sm:pr-[4px] pl-[10px] pr-[10px] py-2">
                        <GrFormSubtract size={12} />
                    </button>

                    <span className={`${beforeAfterClass}`}>{productQuantity}</span>

                    <button onClick={increaseQuantity} className="cursor-pointer sm:pl-[4px] sm:pr-2  pl-[10px] pr-[10px] py-2">
                        <GoPlus size={12} />
                    </button>
                </div>

                <span className="sm:text-xl sm:bg-transparent sm:text-black bg-[#373737] text-white font-bold py-1 px-2 rounded-lg">
                    R${price * productQuantity}
                </span>
            </div>

            <button onClick={removeItem} className="bg-black rounded-full p-1 cursor-pointer absolute top-[-5px] right-[-6px]">
                <IoCloseOutline size={18} color="#fff" />
            </button>
        </div>
    )
}