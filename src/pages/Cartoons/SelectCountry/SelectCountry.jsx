import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";
import {changeCountry} from "../../../features/cartoons/cartoons";

const countries = [
    'Франция','США','Германия','Россия',
    'Великобритания','Япония','Корея','Китай',
    'Канада','Бразилия','Швеция','Казахстан',
]

const SelectCountry = () => {

    const dispatch = useDispatch()
    const {filter} = useSelector((store) => store.cartoons)

    const [country, setCountry] = useState(filter.country || '')
    const handleChange = (event) => {
        setCountry(event.target.value);
    };

    useEffect(() => {
        dispatch(changeCountry(country))
    }, [country])

    return (
        <Box sx={{ minWidth: 100 }}>
            <FormControl sx={{width: 300}} fullWidth
                         className="movies__filter-box"
            >
                <InputLabel
                    id="demo-simple-select-label"
                    className="movies__filter-label"
                >
                    Страна
                </InputLabel>
                <Select
                    className="movies__filter-select"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={country}
                    label="Age"
                    onChange={handleChange}
                >

                    {
                        countries.map((item) => (
                            <MenuItem
                                className="movies__filter-item"
                                value={item}
                            >
                                {item}
                            </MenuItem>
                        ))
                    }
                    <MenuItem
                        className="movies__filter-item"
                        value=''
                    >
                        Очистить
                    </MenuItem>

                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectCountry;