import * as Dialog from "@radix-ui/react-dialog";
import { Overlay, Content } from "./styles";

export function NewTransactionModal() {
    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <Dialog.Close />    
            </Content>
        </Dialog.Portal>
    )
}