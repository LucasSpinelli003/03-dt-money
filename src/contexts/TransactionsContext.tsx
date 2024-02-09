import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

export interface Transaction {
  id: number
  type: 'outcome' | 'income'
  description: string
  category: string
  price: number
  createdAt: string
}
export interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'outcome' | 'income'
}
interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data
      const response = await api.post('/transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date().toISOString(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
