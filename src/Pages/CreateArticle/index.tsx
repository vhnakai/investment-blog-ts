import React, { useState } from 'react';
import api from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';

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

    console.log(newArticle);

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
      <Jumbotron>
        <h3>Create New Article</h3>
      </Jumbotron>
      <Container fluid>
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
              className="form-control"
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
            <Button type="submit" variant="primary">
              Create Article
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default CreateArticle;
