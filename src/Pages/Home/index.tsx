import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { HomeContainer, HomeCard, HomeJumbotron, HomeRow, HomeCol } from './styles';
import Footer from '../../Components/Footer';

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

  return (
    <>
      <HomeJumbotron fluid>
        <h1>Encontre investimentos em que você acredita!</h1>
      </HomeJumbotron>
      <HomeContainer>
        <HomeRow>
          {(articles.length > 0) ? articles.map(article => (

            <HomeCol key={article._id} sm={6}>
              <HomeCard className="text-center h-100">
                <HomeCard.Body>
                  <Link to={'/' + article.slug}>
                    <HomeCard.Title>{article.title}</HomeCard.Title>
                    <HomeCard.Text>
                      <p>{article.description}</p>
                      {/* <div className="small">
                    <ReactMarkdown
                      className="small"
                      source={article.markdownArticle}
                    />
                  </div> */}
                    </HomeCard.Text>
                  </Link>
                </HomeCard.Body>
                <HomeCard.Footer>
                  {new Date(article.date).toLocaleString()}
                </HomeCard.Footer>
              </HomeCard>
            </HomeCol>
          )) : <h1>Não foram encontrados nenhum Artigos.</h1>}

        </HomeRow>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default Home;
