"use client"
import React, { useState, type ChangeEvent, type FormEvent } from 'react';
interface CriarReviewProps {
  receitaId: string;
  userId: string;
}
export function CriarReview({receitaId,userId}:CriarReviewProps) {
  const [titulo, setTitulo] = useState('');
  const [body, setBody] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [nota, setNota] = useState(5);
  const [hover, setHover] = useState(0);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMensagem('');

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', body);
    formData.append('rate', nota.toString());
    formData.append('userid',userId);
    formData.append('receitaid',receitaId);

    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMensagem('Review salva com sucesso!');
        setTitulo('');
        setBody('');
        setNota(5);
        setImagem(null);
      } else {
        setMensagem('Erro ao salvar a review.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Título do review
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Ex: Carne mais macia de todas"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Comentarios
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            placeholder="Ex: Muito fácil de fazer"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
        </div>

        <div>
        <label className="block font-bold mb-2 text-gray-700">
          Nota: <span className="text-orange-600 font-bold ml-2">
            {hover || nota} {hover === 1 || nota === 1 ? "Panela" : "Panelas"}
          </span>
        </label>
        
        <div className="flex gap-1 items-center">
          {[1, 2, 3, 4, 5].map((index) => {
            const isFilled = index <= (hover || nota);

            return (
              <button
                key={index}
                type="button"
                className="focus:outline-none transform hover:scale-110 transition-transform"
                onClick={() => setNota(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(0)}
              >
                <svg 
                height="40px" 
                width="40px" 
                version="1.1" id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512.001 512.001"
                fill="currentColor"
                className={`w-10 h-10 transition-colors duration-200 ${
                    isFilled ? "text-orange-500" : "text-gray-300"}`}>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                <path d="M475.5,213.334H276.389c-11.78,0-21.333,9.55-21.333,21.333c0,11.78,9.553,21.333,21.333,21.333 H475.5c11.783,0,21.333-9.553,21.333-21.333C496.834,222.884,487.284,213.334,475.5,213.334z"></path> 
                <path d="M306.723,213.334H36.5c-11.783,0-21.333,9.55-21.333,21.333v99.556 c0,50.974,41.469,92.444,92.444,92.444h128c50.972,0,92.444-41.471,92.444-92.444v-99.556 C328.056,222.884,318.503,213.334,306.723,213.334z"></path> 
                <path d="M264.056,469.334H79.167c-11.783,0-21.333,9.55-21.333,21.333c0,11.78,9.55,21.333,21.333,21.333 h184.889c11.78,0,21.333-9.553,21.333-21.333C285.389,478.884,275.836,469.334,264.056,469.334z"></path> 
                <path d="M121.834,170.667c-11.783,0-21.333-9.553-21.333-21.333c0-11.992-4.625-17.122-15.086-27.583 c-11.642-11.641-27.585-27.583-27.581-57.754c-0.006-30.167,15.942-46.11,27.584-57.751c8.333-8.33,21.841-8.33,30.17,0.003 c8.33,8.331,8.33,21.84-0.003,30.17c-10.46,10.459-15.086,15.589-15.083,27.578c-0.003,11.994,4.622,17.124,15.081,27.583 c11.642,11.639,27.585,27.581,27.585,57.752C143.167,161.114,133.614,170.667,121.834,170.667z"></path> <g> 
                <path d="M235.611,170.667c-11.783,0-21.333-9.553-21.333-21.333c0-11.992-4.625-17.122-15.087-27.583 c-11.641-11.641-27.585-27.583-27.58-57.754c-0.006-30.168,15.942-46.11,27.584-57.751c8.333-8.33,21.841-8.33,30.17,0.003 c8.33,8.331,8.33,21.84-0.003,30.17c-10.46,10.459-15.086,15.589-15.083,27.578c-0.003,11.994,4.622,17.124,15.081,27.583 c11.642,11.639,27.585,27.581,27.585,57.752C256.945,161.114,247.392,170.667,235.611,170.667z"></path> 
                <path d="M306.723,213.334H171.611v213.333h64c50.972,0,92.444-41.471,92.444-92.444v-99.556 C328.056,222.884,318.503,213.334,306.723,213.334z"></path> </g> 
                <path d="M264.056,512.001c11.78,0,21.333-9.553,21.333-21.333c0-11.783-9.553-21.333-21.333-21.333h-92.444 v42.667H264.056z"></path> </g>
                </svg>
              </button>
            );
          })}
        </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Foto do Prato
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-bold tracking-wide transition duration-200
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
            }`}
        >
          {loading ? 'Enviando...' : 'Postar review'}
        </button>
      </form>

      {mensagem && (
        <div className={`mt-4 p-3 rounded-md text-center text-sm font-medium ${
          mensagem.includes('sucesso') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default CriarReview;