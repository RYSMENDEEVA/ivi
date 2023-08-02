import React from 'react';
import {Link} from 'react-router-dom'
import {BsBookmark} from "react-icons/bs";
import {ImMagicWand} from "react-icons/im";
import {AiOutlineDisconnect, AiOutlineStar} from "react-icons/ai";

const Card = ({item, opp}) => {
    return (
        <div key={item.id} className="movies-list__card movies__card" style={{width: opp ? "100%" : "calc(20% - 24px)"}}>
            <Link to={`/movies/${item.id}`}>
                <div className="movies-list__card-block">
                    <img src={item.poster.url} alt=""/>
                    <div className="movies-list__card-info">
                        <h3 className="movies-list__card-rate">
                            {item.rating.imdb}
                        </h3>
                        <p className="movies-list__card-desc">
                            {item.year} {item.genre}
                        </p>
                        <p className="movies-list__card-time">
                            {Math.floor(item.movieLength
                                / 60)} ч {item.movieLength / 60} мин
                        </p>
                        <div className="movies-list__card-icons">
                                        <span className="movies-list__card-icon">
                                            <BsBookmark/>
                                            <span className="movies-list__card-move">
                                                Смотреть позже
                                            </span>
                                        </span>
                            <span className="movies-list__card-icon">
                                            <ImMagicWand/>
                                               <span className="movies-list__card-move">
                                               Похожее
                                            </span>
                                        </span>
                            <span className="movies-list__card-icon">
                                            <AiOutlineStar/>
                                               <span className="movies-list__card-move">
                                                 Oценить
                                            </span>
                                        </span>
                            <div className="movies-list__card-icon">
                                <AiOutlineDisconnect/>
                                <p className="movies-list__card-move">
                                    Не нравится
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>

            <h3 className="movies-list__card-title">
                {item.name}
            </h3>
        </div>
    );
};

export default Card;