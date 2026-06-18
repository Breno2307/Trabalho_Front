import { useContext } from 'react';
import { ProdutosContext } from '../contexts/ProdutosContextBase';

export const useProdutos = () => {
  const contexto = useContext(ProdutosContext);

  if (!contexto) {
    throw new Error('useProdutos deve ser usado dentro de ProdutosProvider.');
  }

  return contexto; 
};
