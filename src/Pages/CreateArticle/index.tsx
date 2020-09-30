import React, { useState } from 'react';
import api from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CreateArticleForm, CreateArticleButton, CreateArticleContainer, CreateArticleJumbotron } from './styles';

interface Article {
  title: string;
  description: string;
  markdownArticle: string;
  tags: string;
  author: string;
  date: Date;
}

const CreateArticle: React.FC = () => {
  const [article, setArticle] = useState<Article>({
    title: '',
    description: '',
    markdownArticle: '',
    tags: '',
    author: '',
    date: new Date(),
  });
  const [date, setDate] = useState<Date>(new Date());

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

    api
      .post('/articles/add', newArticle)
      .then(res => {
        console.log(res.data);

        window.location.href = '/';
      })
      .catch(function (error) {
        console.log(error);
      });

    // window.location = '/';
  };



  return (
    <>
      <CreateArticleJumbotron fluid>
        <h3>Create New Article</h3>
      </CreateArticleJumbotron>
      <CreateArticleContainer>
        <CreateArticleForm onSubmit={onSubmit}>
          <CreateArticleForm.Group>
            <CreateArticleForm.Label>Article Title: </CreateArticleForm.Label>
            <CreateArticleForm.Control
              type="text"
              required
              value={article.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, title: e.target.value })
              }
            />
          </CreateArticleForm.Group>
          <CreateArticleForm.Group>
            <CreateArticleForm.Label>Article Body: </CreateArticleForm.Label>
            <CreateArticleForm.Control
              as="textarea"
              rows={15}
              required
              className="form-control"
              value={article.markdownArticle}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setArticle({ ...article, markdownArticle: e.target.value })
              }
            />
          </CreateArticleForm.Group>
          <CreateArticleForm.Group>
            <CreateArticleForm.Label>Description: </CreateArticleForm.Label>
            <CreateArticleForm.Control
              as="textarea"
              rows={6}
              required
              value={article.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setArticle({ ...article, description: e.target.value })
              }
            />
          </CreateArticleForm.Group>
          <CreateArticleForm.Group>
            <CreateArticleForm.Label>tags: </CreateArticleForm.Label>
            <CreateArticleForm.Control
              type="text"
              value={article.tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, tags: e.target.value })
              }
            />
          </CreateArticleForm.Group>
          <CreateArticleForm.Group>
            <CreateArticleForm.Label>Author: </CreateArticleForm.Label>
            <CreateArticleForm.Control
              type="text"
              value={article.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, author: e.target.value })
              }
            />
          </CreateArticleForm.Group>
          <CreateArticleForm.Group>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={date}
              onChange={(value: Date) => {
                setArticle({ ...article, date: value });
                setDate(value);
              }}
            />
          </CreateArticleForm.Group>

          <CreateArticleForm.Group>
            <CreateArticleButton type="submit" variant="primary">
              Create Article
            </CreateArticleButton>
          </CreateArticleForm.Group>
        </CreateArticleForm>
      </CreateArticleContainer>
    </>
  );
};

export default CreateArticle;
