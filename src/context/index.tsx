'use client'

import { PropsWithChildren, createContext, useContext } from "react"
import { useProducts, useProductsInterface } from "../hooks/useProducts"
import { useCart, useCartInterface } from "../hooks/useCart"

type ContextType = PropsWithChildren & {
    useCartHook: useCartInterface
    useProductsHook: useProductsInterface
}

export const GlobalContext = createContext({} as ContextType)

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
    const useCartHook = useCart()
    const useProductsHook = useProducts()

    return (
        <GlobalContext.Provider value={{ useCartHook, useProductsHook }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGobalContext() {
    return useContext(GlobalContext)
}