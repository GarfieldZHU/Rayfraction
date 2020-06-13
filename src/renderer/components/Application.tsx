import { hot } from 'react-hot-loader/root'
import * as React from 'react'

import { Main } from '../containers/rayfraction'

const Application = () => (
  <div className='app-core'>
    <Main />
  </div>
)

export default hot(Application)
