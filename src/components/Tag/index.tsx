type Props = {
    isVisible: boolean
}

export function Tag({ isVisible }: Props) {
    const visibilityClass = isVisible ? "top-[100px] opacity-80" : "top-20 opacity-0"

    return (
        <div className={`fixed right-3 ${visibilityClass} flex justify-center py-2 duration-500 ease-in-out text-[#007b47] bg-[#a7f0ba] rounded-lg w-[200px]`}>
            <span className="text-center">
                Produto adicionado ao carrinho
            </span>
        </div>
    )
}