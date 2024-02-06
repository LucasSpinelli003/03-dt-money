import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionContainer, TrasactionsTable } from "./styles";

interface Transaction {
    "id":number
    "description": string
    "type": "income" | "outcome"
    "Category": string
    "price": number
    "CreateAt": string
}

export function Transactions (){
    
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        async function loadTransference(){
            const response =  await fetch('http://localhost:3000/transactions')
            const data = await response.json()
    
           setTransactions(data)
          }
        loadTransference()
    }, [])

    


    return( 
    <div>
        <Header />
        <Summary />


        <TransactionContainer>
        <SearchForm />
            <TrasactionsTable>
                <tbody>
                  {transactions.map(transaction => {
                    return(
                        <tr key={transaction.id}>
                            <td width="50%">{transaction.description}</td>
                            <td> <PriceHighlight variant={transaction.type}>{transaction.price}</PriceHighlight></td>
                            <td>{transaction.Category}</td>
                            <td>{transaction.CreateAt}</td>    
                        </tr>
                    )
                  })}
                </tbody>
            </TrasactionsTable>
        </TransactionContainer>
    </div>
    )
}