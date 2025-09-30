import { ReactNode } from "react"

export interface Expense{
    date: ReactNode
    category: any
    _id?:string,
    merchant:string[],
    categories:string[],
    description:string,
    totalAmount:string
}

export type ExpenseData={
    expense:Expense
}