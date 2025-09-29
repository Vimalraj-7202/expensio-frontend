import { ReactNode } from "react"

export interface Expense{
    date: ReactNode
    category: any
    _id?:String,
    merchant:String[],
    categories:String[],
    description:String,
    totalAmount:String
}

export type ExpenseData={
    expense:Expense
}