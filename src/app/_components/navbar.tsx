"use client"
import { useState } from 'react';
export function Navbar (){
    const [searching, setSearching] = useState(false);
    return(
        <header>
      <nav className="flex items-center justify-between p-4">
        
        <a className="font-mono font-bold text-2xl">CookUP</a>
        
        <ul className=" font-mono space-x-3 flex">
            {searching ? ( 
                <form className='relative flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-2 absolute size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        <input autoFocus type='text' placeholder='Ex:Risoto...' className="bg-red-500 rounded-4xl py-2.5 px-8 text-xs flex items-center justify-center gap-2"
                        />  
                        <button className='right-3 absolute'onClick={() => setSearching(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </button>
                </form>

                ):(
                <button 
                onClick={() => setSearching(true)}
                className="bg-gray-100 rounded-4xl py-2.5 px-8 text-xs hover:bg-red-500 duration-300 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <span>Pesquisar</span>
            </button>)}
            
            <a className="px-8 py-2.5 duration-300  rounded-md hover:bg-red-500" href="home"> Home</a>
            <a className="px-8 py-2.5 duration-300 rounded-md hover:bg-red-500" href="topreceitas">Top Receitas</a>
            <a className="px-8 py-2.5 duration-300 rounded-md hover:bg-red-500" href="login">Entrar</a>
            <a className="px-8 py-2.5 duration-300 rounded-md bg-red-400 hover:bg-red-500" href="register">Cadastro</a>
        </ul>

      </nav>
    </header>
    )
}