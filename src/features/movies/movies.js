import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {instance} from "../../utils/instance";

export const getMovies = createAsyncThunk(
   "movies/getMovies",
    async (filter,thunkAPI) => {
       try {
           const queryParams = `${filter.year ? `year=${filter.year}&` : ''}${filter.country? `countries.name=${filter.country}&` : ''}${filter.genre? `genres.name=${filter.genre}&` : ''}${filter.page ? `page=${filter.page}` : '' }`
           const res = await instance(`/movie?${queryParams}`)
           return res.data
       }catch (error) {
           return thunkAPI.rejectWithValue(error)
       }
    }
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        data: [],
        status: '',
        error: '',
        filter: {
            limit: 10,
            page: 1,
            country: '',
            year: '',
            genre: ''
        }
    },
    reducers: {
        changeYear: (state, {payload}) => {
            state.filter = {
                ...state.filter,
                year: payload
            }
        },
        changeCountry: (state, {payload}) => {
            state.filter = {
                ...state.filter,
                country: payload
            }
        },
        changeGenre: (state, {payload}) => {
            state.filter = {
                ...state.filter,
                genre: payload
            }
        },
        changePage: (state,{payload} ) => {
            state.filter = {
                ...state.filter,
                page: payload > 0 ? payload : 1
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.status = 'loading'
                state.error = ''
            })
            .addCase(getMovies.fulfilled, (state, {payload}) => {
                state.status = 'done'
                state.data = payload.docs
            })
            .addCase(getMovies.rejected, (state, {payload}) => {
                state.status = 'error'
                state.data = payload
            })
    }
})

export const {changeYear,changeCountry,changeGenre,changePage} = moviesSlice.actions;

export default moviesSlice.reducer