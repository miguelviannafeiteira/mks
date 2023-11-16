import React from "react";
import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"

import Home from "@/app/page";
import { GlobalContextProvider } from "@/context";

describe("<Home />", () => {
    describe("A tela inicial deve conter", () => {
        beforeEach(() => {
            render(
                <GlobalContextProvider>
                    <Home />
                </GlobalContextProvider>
            )
        })

        it("um cabeçalho com os textos MKS Sistemas e 0 itens no carrinho", () => {
            const cartIcon = screen.getByTestId('cart-icon')
            expect(cartIcon).toBeInTheDocument()

            const cartItens = screen.getByText("0")
            expect(cartItens).toBeInTheDocument()

            const header1 = screen.getByText("MKS")
            expect(header1).toBeInTheDocument()

            const header2 = screen.getByText("Sistemas")
            expect(header2).toBeInTheDocument()
        })

        it("um roda pé com o texto MKS Sistemas © Todos os direitos reservados", () => {
            const footer = screen.getByText('MKS Sistemas © Todos os direitos reservados')
            expect(footer).toBeInTheDocument()
        })

        it("Ao iniciar deve aparecer 8 elementos com efeito shimmer", async () => {
            expect(screen.getAllByTestId("shimmer")).toHaveLength(8)
        })

        it("Após finalizar o loading deve exibir 8 produtos e não deve exibir o efeito shimmer", async () => {
            expect(screen.getAllByTestId("shimmer")).toHaveLength(8)

            await waitFor(() => {
                expect(screen.getAllByTestId("product")).toHaveLength(8)
            })

            expect(screen.queryByTestId("shimmer")).not.toBeInTheDocument()
        })

        it("Ao clicar em comprar no primeiro produto o número no carrinho deve ser atualizado para 1", async () => {
            await waitFor(() => {
                expect(screen.getAllByTestId("product")).toHaveLength(8)
            })

            const firstProduct = screen.getAllByText("COMPRAR")[1]
            fireEvent.click(firstProduct)

            expect(screen.getByText("1")).toBeInTheDocument()
        })

        it("Ao clicar em comprar no primeiro produto deve exibir uma tag notificando que foi adicionado ao carrinho", async () => {
            await waitFor(() => {
                expect(screen.getAllByTestId("product")).toHaveLength(8)
            })

            const firstProduct = screen.getAllByText("COMPRAR")[1]
            fireEvent.click(firstProduct)

            expect(screen.getByText("Produto adicionado ao carrinho")).toBeInTheDocument()
        })
    })

    it("ao clicar no carrinho deve exibir a modal do carrinho de compras", async () => {
        render(
            <GlobalContextProvider>
                <Home />
            </GlobalContextProvider>
        )

        fireEvent.click(screen.getByText("0"))
        expect(screen.getByText("Carrinho de compras")).toBeInTheDocument()
    })
})

describe("Modal", () => {
    beforeEach(() => {
        render(
            <GlobalContextProvider>
                <Home />
            </GlobalContextProvider>
        )
    })

    it("Ao clicar no X deve fechar a modal", async () => {
        fireEvent.click(screen.getByText("0"))

        fireEvent.click(screen.getByTestId("closeButton"))
        expect(screen.queryByText("Carrinho de compras")).not.toBeInTheDocument()
    })

    it("Ao abrir o carrinho de compras deve haver 1 item dentro", async () => {
        await waitFor(() => {
            expect(screen.getAllByTestId("product")).toHaveLength(8)
        })

        const firstProduct = screen.getAllByText("COMPRAR")[1]
        fireEvent.click(firstProduct)
        fireEvent.click(screen.getByText("1"))

        const modal = within(screen.getByTestId('modal'))


        expect(modal.getAllByTestId("modal-item")).toHaveLength(1)
    })

    it("Ao clicar em + deve aumentar a quantidade do item", async () => {
        await waitFor(() => {
            expect(screen.getAllByTestId("product")).toHaveLength(8)
        })

        const firstProduct = screen.getAllByText("COMPRAR")[1]
        fireEvent.click(firstProduct)
        fireEvent.click(screen.getByText("1"))
        const modal = within(screen.getByTestId('modal'))

        expect(modal.getByText('1')).toBeInTheDocument()

        fireEvent.click(modal.getByTestId("increase-btn"))
        expect(modal.getByText('2')).toBeInTheDocument()
    })

    it("Ao clicar em - deve diminuir a quantidade do item", async () => {
        await waitFor(() => {
            expect(screen.getAllByTestId("product")).toHaveLength(8)
        })

        const firstProduct = screen.getAllByText("COMPRAR")[1]
        fireEvent.click(firstProduct)
        fireEvent.click(screen.getByText("1"))
        const modal = within(screen.getByTestId('modal'))

        fireEvent.click(modal.getByTestId("increase-btn"))
        expect(modal.getByText('2')).toBeInTheDocument()

        fireEvent.click(modal.getByTestId("decrease-btn"))
        expect(modal.getByText('1')).toBeInTheDocument()
    })

    it("Ao clicar no X excluir o item", async () => {
        await waitFor(() => {
            expect(screen.getAllByTestId("product")).toHaveLength(8)
        })

        const firstProduct = screen.getAllByText("COMPRAR")[1]
        fireEvent.click(firstProduct)
        fireEvent.click(screen.getByText("1"))

        const modal = within(screen.getByTestId('modal'))

        expect(modal.queryByTestId("modal-item")).toBeInTheDocument()
        expect(modal.getAllByTestId("modal-item")).toHaveLength(1)

        fireEvent.click(modal.getByTestId("remove-item"))

        expect(modal.queryByTestId("modal-item")).not.toBeInTheDocument()
    })
})
