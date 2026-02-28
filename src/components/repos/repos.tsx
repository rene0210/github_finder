import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./repos.module.css";

type RepoProps = {
  id: number;
  name: string;
  html_url: string;
};

const Repos = () => {
  const { login } = useParams();
  const [repos, setRepos] = useState<RepoProps[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}/repos`)
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, [login]);

  return (
    <div className={classes.container}>
      <h2>Repositórios de {login}</h2>
      {repos.map((repo: RepoProps) => (
        <div key={repo.id} className={classes.repo}>
          <a href={repo.html_url} target="_blank">
            {repo.name}
          </a>
        </div>
      ))}
      <div>
        <button
          className={classes.backButton}
          onClick={() => window.history.back()}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Repos;
