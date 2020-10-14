import React, { useState, useEffect } from 'react';
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

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedVisibilityOption, setSelectedVisibilityOption] = useState('');
  const [selectedStateOption, setSelectedStateOption] = useState('');
  const [article, setArticle] = useState<Article>({
    title: '',
    description: '',
    markdownArticle: '',
    tags: '',
    author: '',
    date: new Date(),
    isDataImported: false,
    visibility: 'EDITORS',
    state: 'EDITING',
  });

  useEffect(() => {
    api.get('images').then(res => {
      setImages(
        res.data.images.map((image: { url: any }) =>
          typeof image.url === 'string' ? image.url : DEFAULT_IMG,
        ),
      );
    });
  }, []);

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
            visibility: response.data.visibility,
            state: response.data.state,
          });
          setDate(new Date(response.data.date.toString()));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  /*function handleSelectItem(id : number){

    const alreadySelected = selectedItems.findIndex(item => item === id);

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => item !== id)
        setSelectedItems(filteredItems);
    } else {
        setSelectedItems([...selectedItems, id]);
    }
  }*/

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
        <h3>Edit a Article</h3>
      </EditArticleJumbotron>
      <EditArticleContainer>
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
            <EditArticleForm.Label>Imagens disponiveis</EditArticleForm.Label>

            <ItemGrid>
              {images.map((image, i) => (
                <li key={i}>
                  <Image src={image} rounded />
                </li>
              ))}
            </ItemGrid>
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
              Edit Article
            </EditArticleButton>
          </EditArticleForm.Group>
        </EditArticleForm>
      </EditArticleContainer>
    </>
  );
};

export default EditArticle;
