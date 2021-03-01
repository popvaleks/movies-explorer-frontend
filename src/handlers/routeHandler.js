import React from 'react';
import {
  useHistory
} from 'react-router-dom';

const history = useHistory();
const linkClick = (path) => {
  history.push(path)
};

export default linkClick;

// export function linkClick (path) {
//   history.push(path)
// }
