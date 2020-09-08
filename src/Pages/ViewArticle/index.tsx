import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

interface Article {
  title: string;
  description: string;
  markdownArticle: string;
  tags: string;
  author: string;
  date: Date;
}

function ViewArticle() {
  let params: any = useParams();
  const [article, setArticle] = useState<Article>({
    title: "",
    description: "",
    markdownArticle: "",
    tags: "",
    author: "",
    date: new Date(),
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles/" + params.id)
      .then((response: AxiosResponse) => {
        setArticle({
          title: response.data.title,
          description: response.data.description,
          markdownArticle: response.data.markdownArticle,
          tags: response.data.tags[0],
          author: response.data.author,
          date: new Date(response.data.date.toString()),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <div>
      <h1>{article.title}</h1>
      <br />
      <br />
      <ReactMarkdown source={article.markdownArticle} />
    </div>
  );
}

export default ViewArticle;
