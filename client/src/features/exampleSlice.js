import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchData = createAsyncThunk( 'users/fetchByIdStatus', async( {url, cateType}, thunkAPI ) => {
  const result = await axios.get(
    url,
    {
      // headers: getAuthorizationHeader()
    }
  )
  // ).then( res => console.log(`res: ${JSON.stringify(res)}`) )

  return { cateType: cateType, data: result.data };
});

export const tourismSlice = createSlice({
  name: 'tourism',
  initialState: {
    dataStates: {
      scenicSpot: {
        data: [],
        filtered: [],
        isFetch: false,
        themeSelector: -1,
        page: 1,
      },
      delicacy: {
        data: [],
        filtered: [],
        isFetch: false,
        themeSelector: -1,
        page: 1,
      },
      activity: {
        data: [],
        filtered: [],
        isFetch: false,
        themeSelector: -1,
        page: 1,
      },
    },
    status: 'idle',
    error: null
  },
  reducers: {
    setThemeSelector: ( state, action ) => ({
      ...state,
      dataStates: {
        ...state.dataStates,
        [action.payload.cateType]: {
          ...state.dataStates[action.payload.cateType],
          themeSelector: action.payload.index
        }
      }
    }),
    // setPage: ( state, action ) => produce( state, draft => { // use immer package
    //   draft.dataStates[action.payload.cateType].page = action.payload.pageNum;
    // }),
    // setFilterData: ( state, action ) => produce( state, draft => {
    //   draft.dataStates[action.payload.cateType].filtered = action.payload.filteredData;
    // }),
    fetchDataStart: ( state, action ) => ({
      ...state,
    }),
    fetchDataSuccess: ( state, action ) => ({
      ...state,
      data: action.payload.data,
      error: null,
    }),
    fetchDataFailure: ( state, action ) => ({
      ...state,
      error: action.payload.error
    })
  },
  extraReducers( builder ) {
    builder
      .addCase( fetchData.pending, ( state, action ) => {
        state.status = 'loading';
      })
      .addCase( fetchData.fulfilled, ( state, action ) => {
        // console.log(`action.type: ${action.payload.cateType}`)
        state.status = 'succeeded';
        state.dataStates[action.payload.cateType].data = action.payload.data;
        state.dataStates[action.payload.cateType].isFetch = true;
      })
      .addCase( fetchData.rejected, ( state, action ) => {
        state.status = 'failed';
        state.data = []; // ? should place default data
        state.error = action.error.message;
      })
  }
})

export const tourismInfo = state => state.tourism;
export const {
  setThemeSelector,
  // setPage,
  // setFilterData,
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure
} = tourismSlice.actions;
export default tourismSlice.reducer;