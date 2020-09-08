import React, { useState } from 'react';
import api from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
      <h3>Create New Article</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Article Title: </label>
          <input
            type="text"
            required
            className="form-control"
            value={article.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setArticle({ ...article, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <textarea
            required
            className="form-control"
            value={article.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setArticle({ ...article, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Article Body: </label>
          <textarea
            required
            className="form-control"
            value={article.markdownArticle}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setArticle({ ...article, markdownArticle: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>tags: </label>
          <input
            type="text"
            className="form-control"
            value={article.tags}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setArticle({ ...article, tags: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Author: </label>
          <input
            type="text"
            className="form-control"
            value={article.author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setArticle({ ...article, author: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            onChange={(value: Date) => {
              setArticle({ ...article, date: value });
              setDate(value);
            }}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Article"
            className="btn btn-primary"
          />
        </div>
      </form>
    </>
  );
};

export default CreateArticle;
