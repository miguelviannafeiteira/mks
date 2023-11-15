import { ProductsOutput } from "../types/productsModel";
import { api } from "./api";

export async function getProduts(): Promise<ProductsOutput> {
    const { data } = await api.get<ProductsOutput>("/products?page=1&rows=8&sortBy=id&orderBy=DESC")
    return data
}