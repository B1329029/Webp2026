import './App.css'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import AlarmIcon from '@mui/icons-material/Alarm'

function App() {
  return (
    <div className="container">

      {/* 上方標題 */}
      <div className="header">
        <h1>Material Kit 效果 可愛的按鈕</h1>

      
      </div>

      {/* 中間文字 */}
      <div className="title">
        hello CGU!!
      </div>

      {/* 下方 icon */}
      <div className="icon-group">
        <ShoppingCartIcon className="icon" />
        <DeleteIcon className="icon" />
        <AlarmIcon className="icon" />
      </div>

    </div>
  )
}

export default App