import {queryProductProfile, updateProductProfile} from '@/services/api';

export default {
  namespace: 'productProfile',

  state: {
    productSkus: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * fetchProduct({payload}, {call, put}) {
      const response = yield call(queryProductProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },

    * update({payload, callback}, {call, put}) {
      const response = yield call(updateProductProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    show(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
