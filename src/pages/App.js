import { useState } from 'react';
import gitLogo from '../assets/github.png';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles';
import { api } from '../services/api';
import Button from '../components/Button';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/Hernandes223/${currentRepo}`)
    
    console.log(data.id);
    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id)
      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return
      }
    }

    alert('Repositório não encontrado!');
  }

  const handleRemoveRepo = (id) => {
    setRepos([]);
    const result = repos.filter(repo => repo.id !== id);
    setRepos(result);
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72}/>
      <Input value={currentRepo} onChange={(e)  => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map((repo, index) =>  { return <ItemRepo key={index} handleRemoveRepo={handleRemoveRepo} repo={repo}/>})}
    </Container>
  );  
}


export default App;