import { createSlice } from "@reduxjs/toolkit";
import { put, call, takeEvery } from "redux-saga/effects";
import Axios from "axios";

// reducer with initial state
const initialState = {
  data: undefined,
  responses: [],
  fetchinsg: false,
  error: null,
};

const data = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    fetch(state) {
      state.loading = true;
      state.error = false;
    },
    fetchSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action) {
      state.error = action.payload;
      //state.data = undefined;
      state.loading = false;
    },
  },
});

export const getData = (state) => {
  return state.data.data;
};
export const getDeviceData = (state) => {
  return state.data?.data?.deviceKind?.[0];
};

export const getDetailById = (state, id) => {
  return state.data.questions[id];
};

export const getQuestionsArray = (state, filter) => {
  return Object.entries(state.data.questions).map((e) => {
    return { id: e[0], ...e[1] };
  });
};

export function* dataSaga() {
  yield takeEvery(data.actions.fetch, workerSaga);
}

function fetchSaga({ search }) {
  const dataUrl = window.dataOverrideUrl
    ? dataOverrideUrl
    : window.balenaEnv?.DATA_URL
    ? window.balenaEnv.DATA_URL
    : process.env.REACT_APP_DATA_URL;
  return Axios({
    method: "GET",
    url: `${dataUrl}`,
  });
}

function* workerSaga({ payload }) {
  try {
    const response = yield call(fetchSaga, { search: payload });
    yield put(data.actions.fetchSuccess(response.data));
  } catch (error) {
    yield put(data.actions.fetchFailure(error));
  }
}

export default data;
