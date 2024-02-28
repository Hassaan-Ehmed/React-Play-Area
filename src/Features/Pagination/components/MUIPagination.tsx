import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { userData } from "./user_data";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import { Box } from "@mui/material";
import Navbar from "./MUIAppBar";

export default function MUIPagination() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [input, setInput] = React.useState("");
  
  let user_data = userData;
  let data:any = user_data.map((user,index)=>{
    return {
      ...user,
      sn_no:index+1
    }
  })
  
  const [filteredData, setFilteredData] = React.useState<any>([]);

  const columns = Object.keys(data[0]);

  // Define a mapping object for renaming columns
  const columnMapping: { [key: string]: string } = {
    sn_no: "S. No",
    name: "Name",
    dateOfBirth: "Date of Birth",
    platform: "Platform",
    loyaltyPoints: "Total Points",
    totalOrders: "Total Orders",
    totalOrderAmount: "Total Order Amount",
    createdAt: "Date Created",
  };

  // get custom values to shown as a column name
  const filteredColumns = Object.values(columnMapping);

  // get original values to help to access column's data
  const filteredColumnNames = Object.keys(columnMapping).map(
    (column) => column
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  React.useEffect(() => {
    filterData();
  }, [input, page, rowsPerPage]);


  const filterData = () => {
    const filtered = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).filter((row:any) =>  {
      for (let key in row) {
        if ( row[key]  && row[key].toString().toLowerCase().includes(input.toLowerCase())) {
          console.log("X:::::::::::\n",row[key]);
          return true;
        }
      }
      return false;
    });
    setFilteredData(filtered);
  };
  

  const renderCell = (value: any,column:any) => {
   

    if (typeof value === "object" && value !== null) {

      if ("$date" in value) {
        // If the value is a date object, return its string representation
        return moment(value["$date"]).format("MMMM, Do YYYY hh:mm A");
      } else {

      
        if ("date" in value) {
          let [date, month, year] = Object.values(value);

          //   Moment Take only this format (YYYY MMM DDDD);
          let dateGrouped: string = year + "-" + month + "-" + date;
          let formattedDate = moment(dateGrouped).format("D MMM YYYY");
          //    console.log(`Original ${date} ${month} ${year}`);
          console.log(`Moment ${formattedDate}`);

          return formattedDate;



          
        } else {

      
          return Object.values(value).join("/ ");
        }

      }
    } else if (column === 'totalOrderAmount' || column === 'loyaltyPoints' || column === 'totalOrders'){

      return new Intl.NumberFormat('en-US').format(value)
    }
    
    else {

      // Render other values
      if(value === undefined){
        return 'N/A'
      }else{
        return value;

      }
    }
 
     

  };

  return (
   <React.Fragment>

    <Navbar setInput={setInput} input={input} />
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {filteredColumns.map((column, i) => (
                <TableCell key={i}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row:any ,rowIndex:number) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {filteredColumnNames.map((column: any, colIndex) => (
                    <TableCell key={colIndex}>
                      {renderCell(row[column],column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          color="primary"
          onChange={handleChangePage}
        />

        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
          count={Math.ceil(data.length / rowsPerPage)}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          
        />
      </Box>
    </Paper>
   
    </React.Fragment> 
    
  );
}
