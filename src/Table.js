// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useEffect, useState } from "react";
// import axios from 'axios';


//   const DataGrid = () => {

//     const [tableData, setTableData] = useState([])
  
//     useEffect(() => {
//       axios({
//         method: "get",
//         url: 'https://api.github.com/users/duosecurity/repos?per_page=100',
//       }).then((data) => setTableData(data))
//         .then((data) => data.json())
  
//     }, [])
//     console.log(tableData)

//     return (
//       <div>
//       <DataGrid
//         rows={tableData}
//         columns={columns}
//         pageSize={12}
//       />
//     </div>
//     );
//     }
//   export default DataGrid