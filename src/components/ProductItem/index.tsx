import Image from "next/image";
import { FiShoppingBag } from "react-icons/fi";
import { formatPrice } from "../../utils";

type Props = {
    url: string
    name: string
    price: string
    addToCart(): void
    description: string
}

export function ProductItem({ addToCart, name, price, url, description }: Props) {
    return (
        <div className="w-[220px] h-[360px] shadow-lg rounded-xl flex flex-col justify-between relative">
            <div className="px-4 pt-2">
                <Image src={url} alt={description} width={210} height={138} />
            </div>

            <div className="">
                <div className="flex gap-[8px] px-4 pt-2 items-start justify-between">
                    <h3 className="leading-5 font-normal text-base text-[#2C2C2C]">
                        {name}
                    </h3>

                    <span className="bg-[#373737] text-white font-bold py-1 px-2 rounded-lg">R${formatPrice(price)}</span>
                </div>

                <p className="px-4 font-normal text-[#9b9b9b] leading-4 text-[12px] pt-2">Redesigned from scratch and completely revised.</p>


                <button onClick={addToCart} className="flex justify-center items-center gap-4 py-2 px-12 bg-[#0F52BA] text-white w-full rounded-b-xl font-bold text-sm mt-3">
                    <FiShoppingBag color="#fff" />
                    COMPRAR
                </button>
            </div>
        </div>
    )
}