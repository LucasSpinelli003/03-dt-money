import { ReactNode, createContext, useEffect, useState } from "react";

export interface Transaction {
    "id":number,
    "type":'outcome' | 'income',
    "description":string,
    "category":string,
    "price":number,
    "createdAt":string
}

interface TransactionContextType {
    transactions: Transaction[],
    fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviderProps{
    children: ReactNode
}


export const TransactionsContext = createContext({} as TransactionContextType)


export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string){
        const url = new URL('http://localhost:3333/transactions');

        if(query){
            url.searchParams.append('q', query)
        }
        const resource = await fetch(url)
        const data = await resource.json()

        setTransactions(data)
      } 

    useEffect(() =>{
        fetchTransactions()
    }, [])
   

    return(
    <TransactionsContext.Provider value={{
        transactions,
        fetchTransactions
        }} >
        {children}
    </TransactionsContext.Provider>
    )
}