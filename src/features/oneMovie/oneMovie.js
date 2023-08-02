import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../utils/instance";

export const getOneMovie = createAsyncThunk(
    "oneMovie/getOneMovie",
    async(movieID,thunkAPI) => {
        try{
            const res = await instance(`/movie/${movieID}`)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const oneMovieSlice = createSlice({
    name: 'oneMovie',
    initialState: {
        movie: {},
        status: '',
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOneMovie.pending, (state) => {
                state.status = 'loading'
                state.error = ''
            })
            .addCase(getOneMovie.fulfilled, (state,{payload}) => {
                state.status = 'done'
                state.movie = payload
            })
            .addCase(getOneMovie.rejected, (state,{payload}) => {
                    state.status = 'error'
                    state.error = payload
                })
    }
})

export default oneMovieSlice.reducer