import { queryProductProfile} from '@/services/api';

export default {
  namespace: 'productProfile',

  state: {
    productSkus: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchProduct({ payload }, { call, put }) {
      const response = yield call(queryProductProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
