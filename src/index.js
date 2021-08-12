import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';

import NavigationBar from './components/NavigationBar';
import HomepageNews from './components/HomepageNews'
import News from './components/News';
import Stocks from './components/Stocks';

const Site = () => {
  const [homepageArticles, setHomepageArticles] = useState([])
  const [fullArticles, setFullArticles] = useState([])

  useEffect(() => {
    newsFetch()
  }, [])

  function newsFetch() {
    const apiKey = `${process.env.REACT_APP_NEWS_API_KEY}`
    const url = `https://newsapi.org/v2/everything?q=finance&apiKey=${apiKey}`

    const homepageArticlesArray = []

    axios.get(url).then((data) => {
        const dataArray = data.data.articles.slice()
        
        for(let i = 0; i < 4; i++) {
            homepageArticlesArray.push(dataArray[i])
        }

        setFullArticles(data.data.articles)
    }).catch((error) => {
        console.log(error)
    })

    setHomepageArticles(homepageArticlesArray)
  }

  return (
    <Router>
      <React.Fragment>
        <NavigationBar />
        <Switch>
          <Route path='/' exact render={(props) => <HomepageNews {...props} homepageData={homepageArticles} />}/>
          <Route path='/news' exact render={(props) => <News {...props} newsData={fullArticles} />}/>
          <Route path='/stocks' component={Stocks} />
        </Switch>
      </React.Fragment>
    </Router>
  )
}

ReactDOM.render(<Site />, document.getElementById('root'))