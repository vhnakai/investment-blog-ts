import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../services/api';
import { EditArticleForm, EditArticleButton, EditArticleContainer, EditArticleJumbotron } from './styles';

interface Article {
  title: string;
  description: string;
  markdownArticle: string;
  tags: string;
  author: string;
  date: Date;
  isDataImported: boolean;
}

const EditArticle: React.FC = () => {
  let params: any = useParams();

  const [date, setDate] = useState<Date>(new Date());
  const [article, setArticle] = useState<Article>({
    title: '',
    description: '',
    markdownArticle: '',
    tags: '',
    author: '',
    date: new Date(),
    isDataImported: false,
  });

  useEffect(() => {
    if (!article.isDataImported) {
      api
        .get('/articles/' + params.id) //getting the id from url
        .then((response: AxiosResponse) => {
          setArticle({
            title: response.data.title,
            description: response.data.description,
            markdownArticle: response.data.markdownArticle,
            tags: response.data.tags.join([', ']),
            author: response.data.author,
            date: new Date(response.data.date.toString()),
            isDataImported: true,
          });
          setDate(new Date(response.data.date.toString()));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const regex = /[\u00C0-\u00FF]*?\b[\w\u00C0-\u00FF\s\-.']+\b/gim;

    const newArticle = {
      title: article.title,
      description: article.description,
      markdownArticle: article.markdownArticle,
      tags: article.tags.match(regex),
      author: article.author,
      date: article.date,
    };

    console.log(newArticle);

    api
      .post('/articles/update/' + params.id, newArticle)
      .then((res: AxiosResponse) => {
        console.log(res.data);

        window.location.href = '/';
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <EditArticleJumbotron fluid>
        <h3>Edit a Article</h3>
      </EditArticleJumbotron>
      <EditArticleContainer >
        <EditArticleForm onSubmit={onSubmit}>
          <EditArticleForm.Group>
            <EditArticleForm.Label>Article Title: </EditArticleForm.Label>
            <EditArticleForm.Control
              type="text"
              required
              value={article.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, title: e.target.value })
              }
            />
          </EditArticleForm.Group>
          <EditArticleForm.Group>
            <EditArticleForm.Label>Article Body: </EditArticleForm.Label>
            <EditArticleForm.Control
              as="textarea"
              rows={15}
              required
              value={article.markdownArticle}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setArticle({ ...article, markdownArticle: e.target.value })
              }
            />
          </EditArticleForm.Group>
          <EditArticleForm.Group>
            <EditArticleForm.Label>Description: </EditArticleForm.Label>
            <EditArticleForm.Control
              as="textarea"
              rows={3}
              required
              value={article.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setArticle({ ...article, description: e.target.value })
              }
            />
          </EditArticleForm.Group>
          <EditArticleForm.Group>
            <EditArticleForm.Label>tags: </EditArticleForm.Label>
            <EditArticleForm.Control
              type="text"
              value={article.tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, tags: e.target.value })
              }
            />
          </EditArticleForm.Group>
          <EditArticleForm.Group>
            <EditArticleForm.Label>Author: </EditArticleForm.Label>
            <EditArticleForm.Control
              type="text"
              value={article.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, author: e.target.value })
              }
            />
          </EditArticleForm.Group>
          <EditArticleForm.Group>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={date}
              onChange={(value: Date) => {
                setArticle({ ...article, date: value });
                setDate(value);
              }}
            />
          </EditArticleForm.Group>
          <EditArticleForm.Group>
            <EditArticleButton
              type="submit"
              variant="primary"
            >Edit Article</EditArticleButton>
          </EditArticleForm.Group>
        </EditArticleForm>
      </EditArticleContainer>
    </>
  );
};

export default EditArticle;
