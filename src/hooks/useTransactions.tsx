import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import api from '../services/api';

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

interface TransactionsProviderProps{
  children:ReactNode;
}

interface TransactionContextData{
  transactions: Transaction[];
  createTransaction: (transaction:TransactionInput) => Promise<void>;
}

//Herda todos os atributos exceto id e createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

const TransactiosContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionProvider({children}:TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
      api
        .get("transactions")
        .then((response) => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput:TransactionInput){

      const response = await api.post('/transactions',{
        ...transactionInput,
        createdAt: new Date()
      });
      const {transaction} = response.data

      //Copiando os dados antigos e adicionando o novo no vetor
      setTransactions([
        ...transactions,
        transaction
      ]);

    }

    return(
      <TransactiosContext.Provider value={{transactions,createTransaction}}>
        {children}
      </TransactiosContext.Provider>
    )
}

export function useTransactions(){
  const context  = useContext(TransactiosContext);

  return context;
}