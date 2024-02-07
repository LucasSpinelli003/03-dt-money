import * as Dialog from "@radix-ui/react-dialog";
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export function NewTransactionModal() {

    const newTransactionFormSchema = z.object({
        description: z.string(),
        price: z.number(),
        category: z.string(),
        type: z.enum(['income', 'outcome']),
    })


    type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

    const { control, 
        register, 
        handleSubmit, 
        reset, 
        formState:{isSubmitting}  
    } = useForm<newTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

   async function handleCreateNewTransaction(data: newTransactionFormInputs){
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log(data)
        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>    
                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                    type="text" 
                    placeholder="descrição" 
                    required 
                    {...register('description')}
                    />
                    <input 
                    type="number" 
                    placeholder="Preço" 
                    required 
                    {...register('price', {valueAsNumber: true})}
                    />
                    <input 
                    type="text" 
                    placeholder="Categoria" 
                    required 
                    {...register('category')}
                    />
                <Controller 
                control={control}
                name="type"
                render={({ field }) =>{
                    return (
                        <TransactionType onValueChange={field.onChange} value={field.value}>
                            <TransactionTypeButton variant="income" value="income">
                                <ArrowCircleUp size={24}/>
                                Entrada
                            </TransactionTypeButton>
                            <TransactionTypeButton variant="outcome" value="outcome">
                                <ArrowCircleDown size={24}/>
                                Saída
                            </TransactionTypeButton>
                        </TransactionType>
                    )
                }}
                />
                    

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    )
}