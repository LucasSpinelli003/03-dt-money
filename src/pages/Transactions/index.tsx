import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionContainer, TrasactionsTable } from "./styles";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

interface Transaction {
    "id":number,
    "type":'outcome' | 'income',
    "description":string,
    "category":string,
    "price":number,
    "createdAt":string
}


export function Transaction (){


    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function datatype(){
        const resource = await fetch('http://localhost:3000/transactions')
        const data = await resource.json()

        setTransactions(data)
      } 

    useEffect(() =>{
        datatype()
    }, [])
   

    return( 
    <div>
        <Header />
        <Summary />


        <TransactionContainer>
        <SearchForm />
            <TrasactionsTable>
                <tbody>

                    {transactions.map((transation) =>{
                        return (
                            <tr key={transation.id}>
                                <td width="50%">{transation.description}</td>
                                <td>{transation.category}</td>
                                <td> <PriceHighlight variant={transation.type}>{transation.price}</PriceHighlight></td>
                                <td>{formatDistanceToNow(new Date(transation.createdAt), {
                                    addSuffix: true,
                                    locale: ptBR,})}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </TrasactionsTable>
        </TransactionContainer>
    </div>
    )
}