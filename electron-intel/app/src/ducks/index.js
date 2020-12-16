import { combineReducers } from "redux";
import data, { dataSaga } from "./data";
import settings from "./settings";
import { all, fork } from "redux-saga/effects";

const rootReducer = () =>
  combineReducers({
    data: data.reducer,
    settings: settings.reducer,
  });

export default rootReducer;

export function* rootSaga() {
  yield all([fork(dataSaga)]);
}
