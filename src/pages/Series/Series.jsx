import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSeries} from "../../features/serie/series";
import Card from "../../components/Card/Card";
import SelectYear from "./SelectYear/SelectYear";
import SelectCountry from "./SelectCountry/SelectCountry";
import SelectGenre from "./SelectGenre/SelectGenre";

const Series = () => {

    const dispatch = useDispatch()
    const {data,filter} = useSelector((store) => store.series)

    useEffect(() => {
        dispatch(getSeries(filter))
    },[filter.year, filter.genre, filter.country])

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
            </div>
        </section>
    );
};

export default Series;