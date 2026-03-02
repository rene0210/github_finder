import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./repos.module.css";
import type { UserProps } from "../types/user";
import User from "../../components/types/user.tsx";

type RepoProps = {
  id: number;
  name: string;
  html_url: string;
};

const Repos = () => {
  const { login } = useParams();
  
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [user, setUser] = useState<UserProps | null>(null);

  const loadUser = async (username: string) => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    const userData: UserProps = {
      avatar_url: data.avatar_url,
      name: data.name,
      location: data.location,
      login: data.login,
      bio: data.bio || "",
      followers: data.followers,
      following: data.following,
    };

    setUser(userData);
  };


useEffect(() => {
  if (login) {
    const fetchData = async () => {
      await loadUser(login);

      fetch(`https://api.github.com/users/${login}/repos`)
        .then((res) => res.json())
        .then((data) => setRepos(data));
    };

    fetchData();
  }
}, [login]);
  return (
    <div className={classes.container}>
      <div className={classes.userSection}>
        {user && <User {...user} />}
      </div>

      <div className={classes.reposSection}>
        <h2>Repositórios de {login}</h2>
        
        <div className={classes.repos_grid}>
          {repos.map((repo: RepoProps) => (
            <div key={repo.id} className={classes.repo}>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
            </div>
          ))}
        </div>

        <button className={classes.backButton} onClick={() => window.history.back()}>
          Voltar
        </button>
      </div>
    </div>
  );
};



export default Repos;