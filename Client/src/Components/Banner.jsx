import React, {useState, useEffect} from "react"
import { ReactComponent as Art } from "../Images/art.svg"
import banner from "../CSS/Banner.css"
import {Link, NavLink} from "react-router-dom"




export default function Home() {
    
    ///////////// State for fetched quotes /////////////
    const [quotes, setQuotes] = useState([]);
    const [randomQuote, setRandomQuote] = useState(null);
    

    ///////////// Fetched quotes from API /////////////
    useEffect(() => {
        fetch("https://type.fit/api/quotes")
            .then(res => res.json())
            .then((data) => {
                setQuotes(data);
                setRandomQuote(data[Math.floor(Math.random() * data.length)]);
            })    
            .catch((error) => console.error(error));
        }, 
    [])

    
    return (
        <div className="homepage-banner-container">
            <div className="quote-container">
                <h3>Motivation for you</h3>
                {randomQuote && (
                    <div className="quote">
                        <p>{randomQuote.text}</p>
                        <p>- {randomQuote.author}</p>
                    </div>
                )}
            </div>


            <div className="art-container">
                <Art className="homepage-banner-art"/>
            </div>
        </div>
    )
}