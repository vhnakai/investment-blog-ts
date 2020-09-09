import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../services/api';
import { Form, Button } from 'react-bootstrap';

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
      <h3>Create New Article</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Article Title: </Form.Label>
          <Form.Control
            type="text"
            required
            value={article.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setArticle({ ...article, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description: </Form.Label>
          <Form.Control
            as="textarea"
            required
            value={article.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setArticle({ ...article, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Article Body: </Form.Label>
          <Form.Control
            as="textarea"
            required
            value={article.markdownArticle}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setArticle({ ...article, markdownArticle: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>tags: </Form.Label>
          <Form.Control
            type="text"
            value={article.tags}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setArticle({ ...article, tags: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author: </Form.Label>
          <Form.Control
            type="text"
            value={article.author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setArticle({ ...article, author: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            onChange={(value: Date) => {
              setArticle({ ...article, date: value });
              setDate(value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button
            type="submit"
            variant="primary"
          >Edit Article</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default EditArticle;
