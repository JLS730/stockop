import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Plotly from 'plotly.js-basic-dist'
import createPlotlyComponent from 'react-plotly.js/factory'
import axios from 'axios'

const Stocks = () => {
    const Plot = createPlotlyComponent(Plotly)
    const location = useLocation()
    const { symbol } = location.state

    const [date, setDate] = useState([])  
    const [open, setOpen] = useState([])
    const [allData, setAllData] = useState([])

    useEffect(() => {
        if(location.state === undefined) {
            return
        }

        stocksFetchDaily()
    }, [symbol])

    function stocksFetchDaily() {
        const apiKey = 'JJUBC7XRCPMF6KME'
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`

        axios.get(url).then((data) => {
        let dateArray = []
        let openArray = []    
        
        for(let property in data.data["Time Series (Daily)"]) {
            dateArray.push(property)
        }
        
        for(let i = 0; i < dateArray.length; i++) {
            openArray.push(+data.data["Time Series (Daily)"][dateArray[i]]["1. open"])
        }

        setAllData(data.data)
        setDate(dateArray)
        setOpen(openArray)
    }).catch((error) => {
            console.log(error)
        })
    }
    
    function stocksFetchWeekly() {
        const apiKey = 'JJUBC7XRCPMF6KME'
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`

        axios.get(url).then((data) => {
        let dateArray = []
        let openArray = []    
        
        for(let property in data.data["Weekly Time Series"]) {
            dateArray.push(property)
        }
        
        for(let i = 0; i < dateArray.length; i++) {
            openArray.push(+data.data["Weekly Time Series"][dateArray[i]]["1. open"])
        }

        setDate(dateArray)
        setOpen(openArray)
    }).catch((error) => {
            console.log(error)
        })
    }
    
    function stocksFetchMonthly() {
        const apiKey = `${process.env.REACT_APP_STOCK_API_KEY}`
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`

        axios.get(url).then((data) => {
        let dateArray = []
        let openArray = []    
        
        for(let property in data.data["Monthly Time Series"]) {
            dateArray.push(property)
        }
        
        for(let i = 0; i < dateArray.length; i++) {
            openArray.push(+data.data["Monthly Time Series"][dateArray[i]]["1. open"])
        }

        setDate(dateArray)
        setOpen(openArray)
    }).catch((error) => {
            console.log(error)
        })
    }

    function handleRangeChange(e) {
        if(e.target.value === 'daily') {
            stocksFetchDaily()
        } else if(e.target.value === 'weekly') {
            stocksFetchWeekly()
        } else {
            stocksFetchMonthly()
        }
    }

    return (
        <main className="stock-section main-sections">
            <div className="page-header-container">
                <h2 className="header">Stocks</h2>
            </div>
            <div className="stock-info-section">
                <div className="stock-info-chart-container">
                    <div className="map-container">
                        <select name="date-range" onChange={e => {
                            handleRangeChange(e)
                        }} className="map-date-range">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                        <Plot
                            data={[
                            {
                                x: date,
                                y: open,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'blue', backgroundColor: 'red'},
                            },
                            ]}
                            layout={ {width: 800, height: 400, title: `${symbol.toUpperCase()} Stocks (Open)`} }
                        />
                    </div>
                </div>
                <div className="stock-info-container">
                    <div className="stock-info">
                        <h2 className="header">{symbol.toUpperCase()}</h2>
                        {allData['Time Series (Daily)'] !== undefined && 
                            <div className="info-container">
                                <h2>Date: {allData["Meta Data"]["3. Last Refreshed"]}</h2>
                                <h2>Open: ${+allData["Time Series (Daily)"]["2021-08-11"]["1. open"]}</h2>
                                <h2>High: ${+allData["Time Series (Daily)"]["2021-08-11"]["2. high"]}</h2>
                                <h2>Low: ${+allData["Time Series (Daily)"]["2021-08-11"]["3. low"]}</h2>
                                <h2>Close: ${+allData["Time Series (Daily)"]["2021-08-11"]["4. close"]}</h2>
                                <h2>Volume: {+allData["Time Series (Daily)"]["2021-08-11"]["5. volume"]}</h2>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Stocks