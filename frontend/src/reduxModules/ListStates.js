const SET_PREVIEW = 'PlayerModal/setPreview';
const SET_DATA_LIST = 'List/setDataList';
const SET_INDEX = 'List/setIndex';

const listStates = {
  index: 1,
  limit: 10,
  preview: true,
  listData: [],
};

export default function reducer(state = listStates, action) {
  switch (action.type) {
    case SET_PREVIEW:
      return {
        ...state,
        player: !state.preview,
      };

    case SET_DATA_LIST:
      return {
        ...state,
        listData: state.listData.concat(action.data?.videoPagination),
      };

    case SET_INDEX:
      return {
        ...state,
        index: state.index + 10,
      };

    default:
      return state;
  }
}
