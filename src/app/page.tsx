'use client'

import { TiShoppingCart } from "react-icons/ti";
import { FormEvent, Fragment, useEffect, useRef, useState } from 'react'

import { getProduts } from '../services/products'
import { useProducts } from '../hooks/useProducts'
import { ProductItem } from '../components/ProductItem'
import { GetProductsUseCase } from '../useCases/GetProductsUseCase'
import { Modal } from "../components/Modal";
import { CartUseCase } from "../useCases/CartUseCase";
import { useCart } from "../hooks/useCart";
import { useGobalContext } from "../context";
import { ShimmerEffect } from "../components/ShimmerEffect";

export default function Home() {
  const modalRef = useRef<HTMLDivElement>(null)

  const { useCartHook, useProductsHook } = useGobalContext()

  const cartUseCase = new CartUseCase(useCartHook)
  const getProductsUseCase = new GetProductsUseCase(getProduts, useProductsHook)

  useEffect(() => {
    useProductsHook.outSideClick(modalRef)
  })

  useEffect(() => {
    getProductsUseCase.execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='bg-white w-full h-full min-h-screen text-black font-san' ref={modalRef}>
      <header className='bg-[#0F52BA] text-white flex justify-between py-6 md:px-16 px-2'>
        <div className='flex items-end gap-2'>
          <h1 className='font-semibold text-4xl'>MKS</h1>
          <span className='font-light text-xl'>Sistemas</span>
        </div>

        <button onClick={useProductsHook.showModal} className="flex gap-4 items-center bg-white rounded-lg py-3 pl-4 pr-7">
          <TiShoppingCart size={26} color="#000" />

          <span className="text-black font-bold text-lg">
            {cartUseCase.cartList.length}
          </span>
        </button>
      </header>


      <div className="max-w-[940px] grid gap-12 md:grid-cols-4 md:place-items-end grid-cols-1 mt-[90px] mx-auto place-items-center">
        {getProductsUseCase.products.map((product) => (
          <ShimmerEffect key={product.id} isLoading={useProductsHook.isLoading}>
            <ProductItem
              key={product.id}
              url={product.photo}
              name={product.name}
              price={product.price}
              description={product.description}
              addToCart={() => cartUseCase.addToCart(product)}
            />
          </ShimmerEffect>
        ))}
      </div>

      <Modal
        modalRef={modalRef}
        cartList={cartUseCase.cartList}
        onClose={useProductsHook.hideModal}
        isVisible={useProductsHook.isModalVisible}
        removeFromCart={useCartHook.removeFromCartList}
      />

      <footer className="font-normal text-xs mt-10 py-2 w-full mx-auto text-center bg-[#EEEEEE] h-full">
        MKS Sistemas © Todos os direitos reservados
      </footer>
    </div >
  )
}
