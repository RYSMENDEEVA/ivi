import React, {useEffect, useState} from 'react';
import {instance} from "../../utils/instance";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import Card from "../../components/Card/Card";

const Search = ({active}) => {
    const [name, setName] = useState("")
    const [data, setData] = useState("")
    const getSearch = () => {
      instance(`/movie?${name.length ? `name=${name}` : ""}`)
          .then(({data}) => setData(data.docs))
          .catch((err) => console.log(err))
    }
    console.log(data)
    useEffect(() => {
        getSearch(name)
    },[name])
    return (
        <div className="search" style={{display: active ? "block" : "none"}}>
            <div className="container">
                    <input type="text" className="search__input" onChange={(e) => setName(e.target.value)}/>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={5}
                        modules={[Navigation]}
                        navigation={true}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            data && name.length ? data.map(item => (
                                    <SwiperSlide>
                                        <Card item={item} opp={true}/>
                                    </SwiperSlide>
                                ))
                                : ""
                        }


                    </Swiper>

            </div>

        </div>
    );
};

export default Search;