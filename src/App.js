import React, { useEffect, useState } from "react";
import api from './services/api'; 

import "./styles.css";

function App() {

 const [repositories, setRepositories] = useState([])

 useEffect(() => {
   api.get('repositories').then(response => { 
    setRepositories(response.data);
  });

 }, []);

  async function handleAddRepository() {
  
    const response = await api.post('repositories', { 
      title: `Novo projeto cadastrado ${Date.now()}`, 
      url: "Lucas Costa - Rocktseat",
      techs: ['Node.js', 'React.js']
    })


    setRepositories([...repositories, response.data]); 
    
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list"> 
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
            {repositorie.title}  
            
            <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>     
          </li>
        ))}
        </ul> 
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
