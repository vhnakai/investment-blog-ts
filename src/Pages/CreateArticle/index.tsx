import React, { useState } from 'react';
import api from '../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import {Col} from 'react-bootstrap';
import { CreateArticleForm, CreateArticleButton, CreateArticleContainer, CreateArticleJumbotron } from './styles';

interface Article {
  title: string;
  author: string;
  visibility: 'ALL' | 'EDITORS' | 'USERS' ;
  state: 'EDITING' | 'PUBLISHED' ;
}

interface OptionType {
  value: string;
  label: string;
}

const visibilityOptions: OptionType[] = [
  { value: 'ALL', label: 'Todos' },
  { value: 'EDITORS', label: 'Editores' },
  { value: 'USERS', label: 'Assinantes' },
];

const stateOptions: OptionType[] = [
  { value: 'EDITING', label: 'Editando' },
  { value: 'PUBLISHED', label: 'Publicado' },
];

const CreateArticle: React.FC = () => {
  const [article, setArticle] = useState<Article>({
    title: '',
    author: '',
    visibility: 'EDITORS',
    state: 'EDITING',
  });
  const [selectedVisibilityOption, setSelectedVisibilityOption] = useState(
    'ALL',
  );
  const [selectedStateOption, setSelectedStateOption] = useState('EDITING');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const regex = /[\u00C0-\u00FF]*?\b[\w\u00C0-\u00FF\s\-.']+\b/gim;

    const newArticle = {
      title: article.title,
      author: article.author,
      visibility: selectedVisibilityOption,
      state: selectedStateOption,
    };

    api
      .post('/articles/', newArticle)
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
            <CreateArticleForm.Label>Author: </CreateArticleForm.Label>
            <CreateArticleForm.Control
              type="text"
              value={article.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, author: e.target.value })
              }
            />
          </CreateArticleForm.Group>
          <CreateArticleForm.Row>
            <CreateArticleForm.Group as={Col}>
              <CreateArticleForm.Label>Visibilidade: </CreateArticleForm.Label>
              <CreateArticleForm.Control
                as='select'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedVisibilityOption(e.target.value)}>
                {
                  visibilityOptions.map(
                    (r, i ) => (
                      <option
                        key={i}
                        value={r.value}
                      >
                        {r.label}
                      </option>
                    )
                  )
                }
              </CreateArticleForm.Control>
            </CreateArticleForm.Group>
            <CreateArticleForm.Group as={Col}>
              <CreateArticleForm.Label>Estado: </CreateArticleForm.Label>
              <CreateArticleForm.Control as='select' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStateOption(e.target.value)} >
                {
                  stateOptions.map(
                    (r, i ) => (
                      <option
                        key={i}
                        value={r.value}
                      >
                        {r.label}
                      </option>
                    )
                  )
                }
              </CreateArticleForm.Control>
            </CreateArticleForm.Group>
          </CreateArticleForm.Row>
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
