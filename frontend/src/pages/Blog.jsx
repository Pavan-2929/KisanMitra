import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { symbol } from 'zod'

const Blog = () => {
    const [stock, setstock] = useState()

    const getSymbolName = async (stock) => {
        try {

            const { data: { result } } = await axios.get(`https://finnhub.io/api/v1/search`, {
                params: {
                    q: stock,
                    token: 'cvf5741r01qjugsg5m00cvf5741r01qjugsg5m0g'
                }
            });

            return result.slice(0, 5);
        } catch (error) {
            console.log(error)
        }
    }

    const getMarketPrice = async (symbol) => {
        try {
            const symbol = await axios.get('https://finnhub.io/api/v1/quote', {
                params: { symbol, token: 'cvf5741r01qjugsg5m00cvf5741r01qjugsg5m0g' }
            })

            return { success: true, symbol };
        } catch (error) {
            return { success: false }
        }
    }

    const analysis = async (stockName) => {
        try {

            const getSymbolsDetails = await getSymbolName(stockName);
            const symbols = getSymbolsDetails.map(symbol => symbol.symbol);
            console.log(symbols)
            const res = [];
            symbols.map(async (symbol) => {
                const data = await getMarketPrice(symbol);
                console.log(data);
                if (data.success) {
                    res.push(data.symbol);
                }
            })

            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    analysis("tesla")







    return (
        <div>
            <input type="text" value={stock} />
            <button></button>
        </div>
    )
}

export default Blog
