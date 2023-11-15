export type ProductsOutput = {
    products: Product[]
}

export type Product = {
    id: string
    name: string
    price: string
    photo: string
    brand: string
    description: string
}

export type ProductInCart = {
    id: string
    quantity: number
    name: string
    price: string
    photo: string
    brand: string
    description: string
}