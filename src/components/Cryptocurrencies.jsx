import React, {useState} from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'

import {useGetCryptosQuery} from '../services/CryptoApi'

const Cryptocurrencies = () => {
    //to get coins list
    const {data : cryptosList, isFetching} = useGetCryptosQuery()
    //to get access to all the coins
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
    /* 
        1. React component
        2. Row
        3. Columns styled for each screen size
        4. Link which route to selected crypto coin
        5. Card w/ info 'bout crypto coin
    */
    return (
        <>
            {/* gutters = spaces between the items */}
            <Row gutters = {[32,32]} className="crypto-card-container">
                {cryptos.map( (currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl}/>}
                                hoverable
                            >
                                <p> Price: {millify(currency.price)}</p>
                                <p> Market Cap: {millify(currency.marketCap)}</p>
                                <p> Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
