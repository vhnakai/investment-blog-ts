import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import {
  HomeContainer,
  HomeCard,
  HomeJumbotron,
  HomeRow,
  HomeCol,
  AdContainer,
} from './styles';

import CustomPagination from '../../Components/CustomPagination';
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
  category: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    api.get('api/articles/').then(res => setArticles(res.data.articles));
  }, []);

  useEffect(() => {
    api
      .get(`api/articles?${searchText ? 'search=' + searchText : ''}`)
      .then((response: AxiosResponse) => {
        setArticles(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [searchText]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchText(e.target.value);
  };

  const handlePaginate = (value: number) => {
    setPage(value);
  };

  const indexOfLastPost = page * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <HomeJumbotron fluid>
        <h1>Encontre investimentos em que você acredita!</h1>
      </HomeJumbotron>
      <SearchForm onChange={handleSearchInput} value={searchText} />
      <AdContainer />
      <HomeContainer>
        <HomeRow>
          {currentPosts.length > 0 ? (
            currentPosts.map(article => (
              <HomeCol key={article._id} sm={6}>
                <Link to={'/view/' + article.slug}>
                  <HomeCard
                    className="text-center h-100"
                    types={article.category}
                  >
                    <HomeCard.Body>
                      <HomeCard.Title>{article.title}</HomeCard.Title>
                      <HomeCard.Text>
                        {article.description}
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
              <h1>Não encontramos nenhum artigo.</h1>
            </HomeCol>
          )}
        </HomeRow>
        <CustomPagination
          totalPosts={articles.length}
          paginate={handlePaginate}
        />
      </HomeContainer>
      <Footer />
    </>
  );
};

export default Home;
