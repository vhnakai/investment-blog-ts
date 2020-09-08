import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
// import ReactMarkdown from "react-markdown";

interface Article {
  _id: string;
  slug: string;
  title: string;
  description: string;
  markdownArticle: string;
  // createdAt: string;
  date: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/articles/').then(res => {
      setArticles(res.data);
    });
  }, []);

  const deleteArticle = (id: string) => {
    axios
      .delete('http://localhost:5000/articles/' + id)
      .then((res: AxiosResponse<any>) => console.log(res.data));
    setArticles(articles.filter((el: Article) => el.slug !== id));
  };

  return (
    <div>
      <h1>Home</h1>
      <div className="card-deck">
        {articles.map(article => (
          <div className="card" key={article._id}>
            <div className="card-header">
              <Link to={'/edit/' + article.slug}>edit</Link> |{' '}
              <Link to="/" onClick={() => deleteArticle(article.slug)}>
                delete
              </Link>
            </div>
            <div className="card-body">
              <Link to={'/' + article.slug}>
                <h4 className="card-title">{article.title}</h4>
                <p className="card-text">{article.description}</p>
                {/* <div className="small">
                  <ReactMarkdown
                    className="small"
                    source={article.markdownArticle}
                  />
                </div> */}
              </Link>
            </div>
            <div className="card-footer">{article.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
