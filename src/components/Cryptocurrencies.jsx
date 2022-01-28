import React, {useState, useEffect} from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import Loader from './Loader'

import {useGetCryptosQuery} from '../services/CryptoApi'

const Cryptocurrencies = ({simplified}) => {
    //to show how much to display depend on screen size
    const count =  simplified ? 10 : 100;
    //to get coins list
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    //to get access to all the coins
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    //to filter coins by searchTerm
    useEffect( () => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(filteredData)
    }, [cryptosList, searchTerm])

    if (isFetching) return <Loader />;
    /* 
        1. React component
        2. Row
        3. Columns styled for each screen size
        4. Link which route to selected crypto coin
        5. Card w/ info 'bout crypto coin
    */
   console.log(cryptos)
    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency" onChange={ (e) => setSearchTerm(e.target.value) }/>
                </div>
            )}
            
            {/* gutter = spaces between the items */}
            <Row gutter = {[32,32]} className="crypto-card-container">
                {cryptos?.map( (currency) => (
                    
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.uuid}`}>
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
