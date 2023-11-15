import { Fragment, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
    isLoading: boolean
    className?: string
}

export function ShimmerEffect({ children, isLoading = false, className = "w-[220px] h-[360px] rounded-xl" }: Props) {
    return isLoading ? (
        <div className={`${className} animate-pulse inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200`} />

    ) : <Fragment>{children}</Fragment>
}