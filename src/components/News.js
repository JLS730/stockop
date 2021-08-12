import React from 'react'

const News = ({ newsData }) => {
    return (
        <section className="news-section main-sections">
            <div className="page-header-container">
                <h2 className="header">Latest News</h2>
            </div>
            <section className="article-section">
                <div className="article-container">
                    {newsData.map( (news, x) => {
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

export default News