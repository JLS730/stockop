import React from 'react'
import { Link } from 'react-router-dom'

const HomepageNews = ({ homepageData }) => {
    return (
        <section className="homepage-news-section main-sections">
            <div className="page-header-container">
                <h2 className="header">Latest in Finance</h2>
                <Link to='/news' style={{ textDecoration: 'none' }}>
                    <h2 className="header-link">More</h2>
                </Link>
            </div>
            <section className="article-section">
                <div className="article-container">
                    {homepageData.map( (news, x) => {
                        return (
                            <article className={`article-${x} articles`} key={x}>
                                <img src={news.urlToImage} alt="News Article" className='article-image' />
                                <div className="article-info-container">
                                    <a href={news.url} target='_blank' rel='noreferrer'>{news.title}</a>
                                    <p>{news.description}</p>
                                </div>
                            </article> 
                        )
                    })}
                </div>
            </section>
        </section>
    )
}

export default HomepageNews