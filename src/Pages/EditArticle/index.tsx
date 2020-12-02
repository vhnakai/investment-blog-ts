import React, { useState, useEffect,  useRef } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../services/api';
import { Col, Image } from 'react-bootstrap';

import {
  EditArticleForm,
  EditArticleButton,
  EditArticleContainer,
  EditArticleJumbotron,
  ItemGrid,
} from './styles';

interface Article {
  title: string;
  description: string;
  markdownArticle: string;
  tags: string;
  author: string;
  date: Date;
  category: string;
  isDataImported: boolean;
  visibility: 'ALL' | 'EDITORS' | 'USERS';
  state: 'EDITING' | 'PUBLISHED';
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

const EditArticle: React.FC = () => {
  let params: any = useParams();
  const DEFAULT_IMG = '';

  const [date, setDate] = useState<Date>(new Date());
  const [images, setImages] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState('');

  //const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedVisibilityOption, setSelectedVisibilityOption] = useState('EDITORS');
  const [selectedStateOption, setSelectedStateOption] = useState('EDITING');
  const [article, setArticle] = useState<Article>({
    title: '',
    description: '',
    markdownArticle: '',
    tags: '',
    author: '',
    date: new Date(),
    category: '',
    isDataImported: false,
    visibility: 'EDITORS',
    state: 'EDITING',
  });

  useEffect(() => {
    api.get('images').then(res => {
      setImages(
        res.data.images.map((image: { url: any }) =>
          typeof image.url === 'string' ? image.url : DEFAULT_IMG,
        )
      );
    });
  }, []);


  useEffect(() => {
    if (!article.isDataImported) {
      api
        .get('/articles/' + params.id) //getting the id from url
        .then((response: AxiosResponse) => {
          setArticle({
            title: response.data.article.title,
            description: response.data.article.description,
            markdownArticle: response.data.article.markdownArticle,
            tags: response.data.article.tags.join([', ']),
            author: response.data.article.author,
            date: new Date(response.data.article.date.toString()),
            category: response.data.article.category,
            isDataImported: true,
            visibility: response.data.article.visibility,
            state: response.data.article.state,
          });
          setDate(new Date(response.data.date.toString()));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  const copyToClipboard = () => {
    textAreaRef.current?.select();
    document.execCommand('copy');
  }

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
      category: article.category,
      visibility: selectedVisibilityOption,
      state: selectedStateOption,
    };

    console.log(newArticle);

    api
      .post('/articles/' + params.id, newArticle)
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
        <h3>Editar o Artigo</h3>
      </EditArticleJumbotron>
      <EditArticleContainer>
        <EditArticleForm onSubmit={onSubmit}>
          <EditArticleForm.Group>
            <EditArticleForm.Label>Titulo: </EditArticleForm.Label>
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
            <EditArticleForm.Label>Corpo: </EditArticleForm.Label>
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
            <EditArticleForm.Label>Descrição: </EditArticleForm.Label>
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
            <EditArticleForm.Label>Tags </EditArticleForm.Label>
            <EditArticleForm.Control
              type="text"
              value={article.tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, tags: e.target.value })
              }
            />
          </EditArticleForm.Group>
          <EditArticleForm.Group>
            <EditArticleForm.Label>Autor: </EditArticleForm.Label>
            <EditArticleForm.Control
              type="text"
              value={article.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, author: e.target.value })
              }
            />
          </EditArticleForm.Group>
          <EditArticleForm.Group>
            <EditArticleForm.Label>Categorias </EditArticleForm.Label>
            <EditArticleForm.Control
              type="text"
              value={article.category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, category: e.target.value })
              }
            />
          </EditArticleForm.Group>
          <EditArticleForm.Group>
            <EditArticleForm.Label>Imagens disponiveis</EditArticleForm.Label>
            <ItemGrid>
              {images.map((image, i) => (
                <li key={i}>
                  <Image src={image} rounded onClick={() => setSelectedImage(image)}/>
                </li>
              ))}
            </ItemGrid>
            <EditArticleForm.Control
              type="text"
              value={selectedImage}
              ref={textAreaRef}
              disabled
            />
            <EditArticleButton onClick={copyToClipboard} variant="primary">
              copiar
            </EditArticleButton>
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
          <EditArticleForm.Row>
            <EditArticleForm.Group as={Col}>
              <EditArticleForm.Label>Visibilidade: </EditArticleForm.Label>
              <EditArticleForm.Control
                as="select"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedVisibilityOption(e.target.value)
                }
              >
                {visibilityOptions.map((r, i) => (
                  <option key={i} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </EditArticleForm.Control>
            </EditArticleForm.Group>
            <EditArticleForm.Group as={Col}>
              <EditArticleForm.Label>Estado: </EditArticleForm.Label>
              <EditArticleForm.Control
                as="select"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedStateOption(e.target.value)
                }
              >
                {stateOptions.map((r, i) => (
                  <option key={i} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </EditArticleForm.Control>
            </EditArticleForm.Group>
          </EditArticleForm.Row>
          <EditArticleForm.Group>
            <EditArticleButton type="submit" variant="primary">
              Editar Artigo
            </EditArticleButton>
          </EditArticleForm.Group>
        </EditArticleForm>
      </EditArticleContainer>
    </>
  );
};

export default EditArticle;
