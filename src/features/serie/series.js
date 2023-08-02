import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../utils/instance";


export const getSeries = createAsyncThunk(
    "series/getSeries",
    async (filter, thunkAPI) => {
        try{
            const queryParams = `${filter.year ? `year=${filter.year}&` : ''}${filter.country? `countries.name=${filter.country}&` : ''}${filter.genre? `genres.name=${filter.genre}` : ''}`
            const res = await instance(`/movie?type=tv-series&${queryParams}`)
            return res.data
        }catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const seriesSlice = createSlice({
    name: "series",
    initialState: {
        data: [],
        status: '',
        error: '',
        filter: {
            limit: 10,
            page: 1,
            country: '',
            year: '',
            genre: '',
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSeries.pending, (state) => {
                state.status = 'loading'
                state.error = ''
            })
            .addCase(getSeries.fulfilled, (state, {payload}) => {
                state.status = 'done'
                state.data = payload.docs
            })
            .addCase(getSeries.rejected, (state, {payload}) => {
                state.status = 'error'
                state.error = payload
            })
    }

})

export const {changeCountry, changeGenre, changeYear} = seriesSlice.actions

export default  seriesSlice.reducer