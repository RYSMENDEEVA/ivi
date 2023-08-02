import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../utils/instance";

export const getCartoons = createAsyncThunk(
    "cartoons/getCartoons",
    async(filter,thunkAPI) => {
        try{
            const queryParams = `${filter.year ? `year=${filter.year}&` : ''}${filter.country? `countries.name=${filter.country}&` : ''}${filter.genre? `genres.name=${filter.genre}&` : ''}${filter.page ? `page=${filter.page}` : '' }`
            const res = await instance(`/movie?type=cartoon&${queryParams}`)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const cartoonsSlice = createSlice({
    name: "cartoons",
    initialState: {
        data: [],
        status: '',
        error: '',
        filter: {
            limit: 10,
            page: 1,
            country: '',
            year: '' ,
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
            .addCase(getCartoons.pending, (state) => {
                state.status = 'loading'
                state.error = ''
            })
            .addCase(getCartoons.fulfilled, (state,{payload}) => {
                state.status = 'done'
                state.data = payload.docs
            })
            .addCase(getCartoons.rejected, (state,{payload}) => {
                state.status = 'error'
                state.error = payload
            })
    }
})

export const {changeCountry, changeGenre,changeYear, changePage} = cartoonsSlice.actions

export default cartoonsSlice.reducer