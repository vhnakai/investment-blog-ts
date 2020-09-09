import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import { Card,  CardColumns } from 'react-bootstrap';
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
    api.get('/articles/').then(res => {
      setArticles(res.data);
    });
  }, []);

  const deleteArticle = (id: string) => {
    api
      .delete('/articles/' + id)
      .then((res: AxiosResponse<any>) => console.log(res.data));
    setArticles(articles.filter((el: Article) => el.slug !== id));
  };

  return (
      <CardColumns>
          {articles.map(article => (
            <Card  key={article._id} className="text-center">
              <Card.Header>
                <Link to={'/edit/' + article.slug}>edit</Link> |{' '}
                <Link to="/" onClick={() => deleteArticle(article.slug)}>
                  delete
                </Link>
              </Card.Header>
              <Card.Body>
                <Link to={'/' + article.slug}>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>
                    <p>{article.description}</p>
                    {/* <div className="small">
                    <ReactMarkdown
                      className="small"
                      source={article.markdownArticle}
                    />
                  </div> */}
                  </Card.Text>
                </Link>
              </Card.Body>
              <Card.Footer>{article.date}</Card.Footer>
            </Card>
          ))}
      </CardColumns>

  );
};

export default Home;
