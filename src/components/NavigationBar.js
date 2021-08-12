import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
    const [randomStocks, setRandomStocks] = useState([])
    const [symbol, setSymbol] = useState([])

    useEffect(() => {
        setRandomStocks(['AAPL', 'AMZN', 'MSFT', 'FB', 'GOOGL'])
    }, [])

    return (
        <React.Fragment>
            <nav className="navigation-bar">
                <div className="navigation-bar-left">
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <h2 className="navigation-logo">StockOp</h2>
                    </Link>
                    <Link to='/news' style={{ textDecoration: 'none' }}>
                        <h3 className="navigation-news">News</h3>
                    </Link>
                    <Link to={{ pathname: '/stocks', state: { symbol: randomStocks[Math.floor(Math.random() * randomStocks.length)] }}} style={{ textDecoration: 'none' }}>
                        <h3 className="navigation-stocks">Stocks</h3>
                    </Link>
                </div>
                <div className="navigation-bar-middle">
                    <input type="text" onChange={e => {
                        setSymbol(e.target.value)
                    }} placeholder='Enter A Symbol(ex. AMZN)'/>
                    <Link to={{ pathname: '/stocks', state: { symbol: symbol }}}>
                        <button type='button'>Search</button>
                    </Link>
                </div>
                <div className="navigation-bar-right">
                    <div className="user-name-email-container">
                        <h4 className="user-name">Lorem Ipsum</h4>
                        <h4 className="user-email">loremipsum@stockop.io</h4>
                    </div>
                    <div className="user-avatar-container">
                        <i className="far fa-user fa-2x"></i>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default NavigationBar