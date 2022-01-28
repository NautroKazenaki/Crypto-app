import React from 'react'
import {Select, Typography, Row, Col, Avatar, Card} from 'antd'
import moment from 'moment'

import {useGetCryptoNewsQuery} from '../services/CryptoNewsApi'

const {Text, Title} = Typography
const {Option} = Select
// for news w/o image
const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"

/* 
    1. get props for mobile users
    2. using hook to fetch cryptoNews
    3. simple logic to display
    4. row
    5. every news's value mapping to get
    5.1 col
        5.1.1 hoverable Card
            5.1.1.1 link to a news URL
                5.1.1.1.1 div-container
                    5.1.1.1.1.1 title w/ news name and image
            5.1.1.1.2 <p> w/ news descrip equal to 100 chars max
            5.1.1.1.3 div-container
                5.1.1.1.3.1 div w/ logo of news publicist + name
            5.1.1.1.4  how long ago it was published
    wew, xd
*/
const News = ({simplified}) => {
    const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory: 'Cryptocurrency', count: simplified ? 6 : 12})

    if (!cryptoNews?.value) return 'Loading...'
    return (
        <Row gutter={[24,24]}>
            {cryptoNews.value.map( (news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}> {news.name} </Title>
                                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                            </div>
                            <p>
                                {news.description > 100 ? `${news.description.substring(0, 100)} ...`
                                : news.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                                    <Text className="provider-name"> {news.provider[0]?.name}</Text>
                                </div>
                                <Text> {moment(news.datePublished).startOf('ss').fromNow()} </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
