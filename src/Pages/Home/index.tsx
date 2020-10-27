import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from "axios";
import api from '../../services/api';
import {
  HomeContainer,
  HomeCard,
  HomeJumbotron,
  HomeRow,
  HomeCol,
  AdContainer,
} from './styles';
import SearchForm from '../../Components/SearchForm';

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

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    api.get('/articles/').then(res => setArticles(res.data.articles));
  }, []);

  useEffect(() => {
    api.get(`/articles?search=${searchText}`).then((response: AxiosResponse) => {
      setArticles(response.data.articles);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[searchText]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchText(e.target.value);
  }

  return (
    <>
      <HomeJumbotron fluid>
        <h1>Encontre investimentos em que você acredita!</h1>
      </HomeJumbotron>
      <SearchForm onChange={handleSearchInput} value={searchText}/>
      <AdContainer />
      <HomeContainer>
        <HomeRow>
          {articles.length > 0 ? (
            articles.map(article => (
              <HomeCol key={article._id} sm={6}>
                <Link to={'/view/' + article.slug}>
                  <HomeCard className="text-center h-100">
                    <HomeCard.Body>
                      <HomeCard.Title>{article.title}</HomeCard.Title>
                      <HomeCard.Text>
                        <p>{article.description}</p>
                      </HomeCard.Text>
                    </HomeCard.Body>
                    <HomeCard.Footer>
                      {new Date(article.date).toLocaleString()}
                    </HomeCard.Footer>
                  </HomeCard>
                </Link>
              </HomeCol>
            ))
          ) : (
            <HomeCol>
              {' '}
              <h1>Não encontramos nenhum artigo.</h1>{' '}
            </HomeCol>
          )}
        </HomeRow>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default Home;
