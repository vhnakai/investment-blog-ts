import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import {
  DashboardContainer,
  DashboardButton,
  DashboardCardColumns,
  DashboardCard,
} from './styles';

interface Article {
  _id: string;
  slug: string;
  title: string;
  description: string;
  markdownArticle: string;
  // createdAt: string;
  date: string;
}

const Dashboard: React.FC = () => {
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
    <>
      <DashboardContainer>
        <DashboardButton
          variant="danger"
          onClick={() =>
            api
              .delete('auth/')
              .then(res => {
                console.log(res.data);
                window.location.reload();
              })
              .catch(err => console.log(err))
          }
        >
          teste logout
        </DashboardButton>
        <DashboardCardColumns>
          {articles.map(article => (
            <DashboardCard key={article._id} className="text-center">
              <DashboardCard.Header>
                {new Date(article.date).toLocaleString()}
              </DashboardCard.Header>
              <DashboardCard.Body>
                <Link
                  to={'/' + article.slug}
                  style={{ textDecoration: 'none' }}
                >
                  <DashboardCard.Title>
                    <h1>{article.title}</h1>
                  </DashboardCard.Title>
                  <DashboardCard.Text>
                    {article.description}
                    {/*
                      <div className="small">
                        <ReactMarkdown
                          className="small"
                          source={article.markdownArticle}
                        />
                      </div>
                      */}
                  </DashboardCard.Text>
                </Link>
              </DashboardCard.Body>
              <DashboardCard.Footer>
                <Link to={'/edit/' + article.slug}>
                  <DashboardButton variant="primary">edit</DashboardButton>
                </Link>
                <Link to="/">
                  <DashboardButton
                    variant="danger"
                    onClick={() => deleteArticle(article.slug)}
                  >
                    delete
                  </DashboardButton>
                </Link>
              </DashboardCard.Footer>
            </DashboardCard>
          ))}
        </DashboardCardColumns>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
