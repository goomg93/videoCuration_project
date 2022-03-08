const SET_PREVIEW = 'PlayerModal/setPreview';
const SET_INDEX = 'List/setIndex';
const SET_PAGINATION = 'List/setPagination';

const listStates = {
  index: 1,
  limit: 10,
  preview: true,
  pagination: false,
};

export default function reducer(state = listStates, action) {
  switch (action.type) {
    case SET_PREVIEW:
      return {
        ...state,
        player: !state.preview,
      };

    case SET_INDEX:
      return {
        ...state,
        index: state.index + 10,
      };

    case SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };

    default:
      return state;
  }
}
