import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCartoons} from "../../features/cartoons/cartoons";
import Card from "../../components/Card/Card";
import SelectCountry from "./SelectCountry/SelectCountry";
import SelectGenre from "./SelectGenre/SelectGenre";
import SelectYear from "./SelectYear/SelectYear";
import {changePage} from "../../features/cartoons/cartoons";
import {AiFillLeftSquare, AiFillRightSquare} from "react-icons/ai"


const Cartoons = () => {

    const dispatch = useDispatch()
    const {data, filter} = useSelector((store) => store.cartoons)


    useEffect(() => {
        dispatch(getCartoons(filter))
    }, [filter.year, filter.genre, filter.country, filter.page])

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

export default Cartoons;