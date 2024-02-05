import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

export function Header (){
    return( 
    <HeaderContainer>
        <HeaderContent>
            <h1>LOGO</h1>

            <NewTransactionButton>Nova Transação</NewTransactionButton>
        </HeaderContent>
    </HeaderContainer>
    )
}