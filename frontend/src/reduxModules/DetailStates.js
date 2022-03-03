// action type name 정의
const SET_STATE = '{file_name}/setState';

const listStates = {
  // 사용할 state 정의
  state: '',
};

export default function reducer(state = listStates, action) {
  switch (action.type) {
    case SET_STATE:
      return !state.state;

    default:
      return state;
  }
}
