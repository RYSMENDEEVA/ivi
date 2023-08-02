import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getOneMovie} from "../../features/oneMovie/oneMovie";


const OneMovie = () => {

    const dispatch = useDispatch()
    const {movie} = useSelector((store) => store.oneMovie)
    const {id} = useParams()

    useEffect(() => {
        dispatch(getOneMovie(id))
    }, [])


    const url = movie.videos && movie.videos.trailers.find((item) => item.site === 'youtube' && item.url.includes('embed'))?.url || null

    return (
        <section className="one-movie">
           <div className="container">
               <div className="one-movie__row">
                   <div className="one-movie__trailer">
                       <iframe width="100%" height="400" src={url}
                               title="YouTube video player" frameBorder="0"
                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                               allowFullScreen>
                       </iframe>
                   </div>
                   <div className="one-movie__info">
                       <h2 className="one-movie__info-title">
                           {movie.name}
                       </h2>
                       <p className="one-movie__info-year">
                           {movie.year}
                       </p>
                       <div className="one-movie__info-genres">
                           {
                               movie.genres?.map((item) => (
                                   <p className="one-movie__info-genre" key={item.id}>
                                       {item.name}
                                   </p>

                                   ))
                           }
                       </div>
                       <div className="one-movie__info-persons">
                           {
                               movie.persons?.filter((item,idx) => idx < 5)
                                   .map((item) => (
                                       <div className="one-movie__info-person">
                                           <div className="one-movie__info-image">
                                               <img src={item.photo} alt=""/>
                                           </div>
                                           {item.name}
                                       </div>
                                   ))
                           }
                       </div>
                       <div className="one-movie__info-desc">
                           {
                               movie.description
                           }
                       </div>
                       <div className="one-movie__info-ratings">
                           <div>
                               <p className="one-movie__info-rating">
                                   {movie.rating?.imdb}
                               </p>
                               Рейтинг IMDB
                           </div>
                           <div>
                               <p className="one-movie__info-rating">
                                   {movie.rating?.kp}
                               </p>
                               Рейтинг Кинопоиск
                           </div>

                       </div>
                   </div>
               </div>
           </div>
        </section>
    );
};

export default OneMovie;