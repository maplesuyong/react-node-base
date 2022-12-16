import { LOGIN_USER } from "../_actions/types"

const user_reducer = (state = { email: 'suyong0507@gmail.com', password: '111111'}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload}
    default:
      return state
  }
}

export default user_reducer