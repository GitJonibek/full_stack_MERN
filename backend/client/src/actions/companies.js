import axios from 'axios';
import {
  GET_COMPANY_LIST,
  COMPANY_ERROR,
  CLEAR_PROFILE
} from './types'

export const getCompanyList = () => async dispatch => {
  try {
    dispatch({ type: CLEAR_PROFILE });
    await axios.get('/api/companies/get-companies')
    .then(res => {
      dispatch({ type: GET_COMPANY_LIST, payload: res.data });
    })
    .catch(e => {
      dispatch({ type: COMPANY_ERROR });
    })
  } catch (e) {
    dispatch({ type: COMPANY_ERROR });
  }
}
