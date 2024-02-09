import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionContainer,
  TrasactionsTable,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />
        <TrasactionsTable>
          <tbody>
            {transactions.map((transation) => {
              return (
                <tr key={transation.id}>
                  <td width="50%">{transation.description}</td>
                  <td>{transation.category}</td>
                  <td>
                    {' '}
                    <PriceHighlight variant={transation.type}>
                      {transation.type === 'outcome' && '- '}
                      {priceFormatter.format(transation.price)}
                    </PriceHighlight>
                  </td>
                  <td>
                    {dateFormatter.format(new Date(transation.createdAt))}
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
