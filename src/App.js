import { useEffect, useState } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState(['---']);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };

  function adicinarNoLocalStorage() {
    localStorage.setItem("chaveItens", JSON.stringify(listaCompras));
  }

  function recuperarLista() {
    const listaRecuperadaJson = localStorage.getItem("chaveItens");
    const listagemArrayRecuperada = JSON.parse(listaRecuperadaJson);
    setListaCompras(listagemArrayRecuperada)    
  }

  function removeListaLocalStorage(){
    localStorage.removeItem('chaveItens')
  }

  
// o recurso do useEffect é para colocpcar a lista dinamicamente
  useEffect(()=>{
    recuperarLista()
  },[]);

  useEffect(()=>{
    if (listaCompras.length !== 0){
    adicinarNoLocalStorage()}
  },[listaCompras])
  

  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>

      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
      {/* <button onClick={adicinarNoLocalStorage}>
        Adicionar no Local Storage
      </button>
      <button onClick={recuperarLista}>Recuperar lista</button> */}
      <button onClick={removeListaLocalStorage}>Remove lista do Local Storage</button>
    </div>
  );
}
