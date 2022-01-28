import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import {Row, Col, Typography} from 'antd'

const {Title} = Typography

const LineChart = ({coinHistory, currentPrice, coinName}) => {

    const coinPrice = []
    const coinTimestamp = []

    for(let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory.data.history[i].price)
        // coinTimestamp.push(new Date(coinHistory.data.history[0].timestamp).toLocaleDateString())
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD' ,
                data: coinPrice,
                fill: false,
                backgroundColor: '#0077bd', 
                borderColor: '#0077bd', 
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title"> {coinName} Price Chart </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change"> {coinHistory?.data?.change}% </Title>
                    <Title level={5} className="current-price"> current {coinName} price: $ {currentPrice} </Title>
                </Col>
            </Row>
            <Line  data={data} options={options}/>
        </>
    )
}

export default LineChart
