import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../../features/movies/movies";
import Card from "../../components/Card/Card";
import SelectYear from "./SelectYear/SelectYear";
import SelectCountry from "./SelectCountry/SelectCountry";
import SelectGenre from "./SelectGenre/SelectGenre";
import {AiFillLeftSquare, AiFillRightSquare} from "react-icons/ai"
import {changePage} from "../../features/movies/movies";

const Movies = () => {

    const dispatch = useDispatch()
    const {data,filter} = useSelector((store) => store.movies)

    useEffect(() => {
        dispatch(getMovies(filter))
    }, [filter.year, filter.country,filter.genre, filter.page])


    console.log(data)

    return (
        <section className="movies">
           <div className="container">
               <div className="movies__filter">
                   <SelectYear/>
                   <SelectCountry/>
                   <SelectGenre/>
               </div>
               <div className="movies__row">
                   {
                       data.map((item) => (
                           <Card item={item}/>
                       ))
                   }
               </div>
               <div className="movies__pages">
                   <AiFillLeftSquare onClick={() => dispatch(changePage(filter.page - 1))} className="movies__pages-left" />
                   <p className="movies__page">{filter.page}</p>
                   <AiFillRightSquare onClick={() => dispatch(changePage(filter.page + 1))}/>
               </div>
           </div>
        </section>
    );
};

export default Movies;