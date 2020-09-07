import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface Article {
        slug: string;
        title: string;
        description: string;
        markdownArticle: string;
        createdAt: string;
}



const Home: React.FC = () => {
        const [articles, setArticles] = useState<Article[]>([]);

        useEffect(()=>{
                axios.get('http://localhost:5000/articles/').then(res => {
                        setArticles(res.data);
                })
        },[]);
        return(
                <div>
                <h1>Home</h1>
                <div className="card-deck">
                {articles.map(article => (
                        <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">{article.title}</h4>
                                        <p className="card-text">{article.description}</p>
                                        <p className="card-text">{article.markdownArticle}</p>
                                </div>
                        <div className="card-footer">{article.createdAt}</div>
                </div>
                ))}
        </div>

        </div>

        )
};

export default Home;