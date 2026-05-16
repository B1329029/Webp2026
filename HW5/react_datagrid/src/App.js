import React, { useState, useEffect } from 'react';
import { DataGrid, useGridApiContext, useGridSelector, gridPageCountSelector, gridPageSelector } from '@mui/x-data-grid';
import './App.css';

const API_URL =
  'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <div className="custom-pagination">
      <button
        onClick={() => apiRef.current.setPage(page - 1)}
        disabled={page === 0}
      >
        上一頁
      </button>
      <span>第 {page + 1} 頁 / 共 {pageCount} 頁</span>
      <button
        onClick={() => apiRef.current.setPage(page + 1)}
        disabled={page >= pageCount - 1}
      >
        下一頁
      </button>
    </div>
  );
}

// 定義 DataGrid 欄位
const columns = [
  {
    field: 'title',
    headerName: '名稱',
    flex: 2,
    minWidth: 300,
    sortable: false,
    renderCell: (params) => (
      <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.5', padding: '8px 0' }}>
        {params.value}
      </div>
    ),
  },
  {
    field: 'location',
    headerName: '地點',
    flex: 1,
    minWidth: 180,
    sortable: false,
    renderCell: (params) => (
      <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.5', padding: '8px 0' }}>
        {params.value}
      </div>
    ),
  },
  {
    field: 'price',
    headerName: '票價',
    flex: 1,
    minWidth: 180,
    sortable: false,
    renderCell: (params) => (
      <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.5', padding: '8px 0' }}>
        {params.value}
      </div>
    ),
  },
];

function App() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setLoading(true);

    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        const formatted = json.map((item, index) => ({
          id: index + 1,
          title: item.title || '無資料',
          location:
            item.showInfo && item.showInfo[0]
              ? item.showInfo[0].location || '無資料'
              : '無資料',
          price:
            item.showInfo && item.showInfo[0]
              ? item.showInfo[0].price || ''
              : '',
        }));
        setRows(formatted);
        setFilteredRows(formatted);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredRows(rows);
    } else {
      const keyword = searchText.toLowerCase();
      setFilteredRows(
        rows.filter((row) =>
          row.title.toLowerCase().includes(keyword)
        )
      );
    }
  }, [searchText, rows]);

  return (
    <div className="container">
      {/* 標題 + 搜尋列 */}
      <div className="title-row">
        <h1>景點觀光展覽資訊</h1>
        <input
          type="text"
          className="search-input"
          placeholder=""
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* DataGrid 表格 */}
      <div className="grid-wrapper">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
          hideFooterSelectedRowCount
          slots={{
            pagination: CustomPagination,
            noRowsOverlay: () => (
              <div className="no-data">查無資料</div>
            ),
          }}
          sx={{
            // 整體無外框
            border: 'none',
            fontFamily: 'inherit',
            fontSize: '14px',
            // 欄位標題（綠色表頭）
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#04AA6D',
              borderRadius: 0,
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#04AA6D',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            // 儲存格
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #ddd',
              color: '#000',
              fontSize: '14px',
              alignItems: 'flex-start',
            },
            // 偶數列背景
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#f2f2f2',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#ddd !important',
            },
            // 分頁列
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid #ddd',
              backgroundColor: '#fff',
            },
            '& .MuiTablePagination-root': {
              color: '#333',
            },
            '& .MuiTablePagination-displayedRows': {
              color: '#333',
            },
            '& .MuiIconButton-root': {
              color: '#333',
            },
            '& .MuiIconButton-root.Mui-disabled': {
              color: '#bbb',
            },
            // 排序 icon 顏色
            '& .MuiDataGrid-sortIcon': {
              color: '#fff',
            },
            '& .MuiDataGrid-menuIconButton': {
              color: '#fff',
            },
            // 拿掉選取列顏色
            '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: 'inherit',
            },
            '& .MuiDataGrid-row.Mui-selected:hover': {
              backgroundColor: '#ddd !important',
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
