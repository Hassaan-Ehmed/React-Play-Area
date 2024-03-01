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
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [input, setInput] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<any>([]);
  const [onSearch, setOnSearach] = React.useState(false);

  React.useEffect(() => {
    filterData();
  }, [page, rowsPerPage]);

  let user_data = userData;

  let data = user_data.map((user, index) => ({
    ...user,
    sn_no: index + 1,
    name:  (user.name &&  user.surname ? `${user?.name} ${user?.surname}` : user.name) || (user.name ? user.name :  '') || (user.surname ? user.surname :  '')
  }));

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
    setInput("");
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(page);
  };

  const clearInput = () => {
    setInput("");

    const filtered_data: any = data.slice(
      (page - 1) * rowsPerPage,
      Number(page) * rowsPerPage
    );

    setFilteredData(filtered_data);
  };

  const filterData = () => {
    const from_idx = Number(page);

    if (input.trim() === "") {
      const filtered_data: any = data.slice(
        (page - 1) * rowsPerPage,
        from_idx * rowsPerPage
      );
      setFilteredData(filtered_data);
      setOnSearach(false);
    } else {
      let filtered = data.slice(
        (page - 1) * rowsPerPage,
        from_idx * rowsPerPage
      );
      const searched_data = filtered?.filter(
        (i: any) =>
          i.name?.toString().toLowerCase().includes(input.toLowerCase()) ||
          // i.surname?.includes(input.toLowerCase()) ||
          i.platform?.includes(input.toLowerCase()) ||
          `${i.sn_no}`?.includes(input.toLowerCase()) ||
          `${i.loyaltyPoints}`?.includes(input.toLowerCase()) ||
          `${i.totalOrderAmount}`?.includes(input.toLowerCase()) ||
          `${i.totalOrders}`?.includes(input.toLowerCase()) ||
          moment(i?.createdAt["$date"])
            .format("MMMM, Do YYYY hh:mm A")
            .toLowerCase()
            ?.includes(input.toLowerCase()) ||
          moment(
            `${i?.dateOfBirth?.year}-${i?.dateOfBirth?.month}-${i?.dateOfBirth?.date}`
          )
            .format("D MMM YYYY")
            .toLowerCase()
            ?.includes(input.toLowerCase())
      );
      // .filter((row: any) => {
      //   for (let key in row) {
      //     if (
      //       row[key] &&
      //       row[key]
      //         .toString()
      //         .toLowerCase()
      //         .includes(input.toString().trim().toLowerCase())
      //     ) {
      //       return true; // If any value matches, return true
      //     }
      //   }
      //   return false; // If no value matches, return false
      // });
      setOnSearach(true);
      setFilteredData(searched_data);
    }
  };

  const renderCell = (value: any, column: any) => {
    if (typeof value === "object" && value !== null) {
      if ("$date" in value) {
        return moment(value["$date"]).format("MMMM, Do YYYY hh:mm A");
      } else {
        if ("date" in value) {
          let [date, month, year] = Object.values(value);
          let dateGrouped: string = year + "-" + month + "-" + date;
          let formattedDate = moment(dateGrouped).format("D MMM YYYY");

          return formattedDate;
        } else {
          return Object.values(value).join("/ ");
        }
      }
    } else if (
      column === "totalOrderAmount" ||
      column === "loyaltyPoints" ||
      column === "totalOrders"
    ) {
      return new Intl.NumberFormat("en-US").format(value);
      } else {
      // Render other values
      if (value === undefined) {
        return "N/A";
      } else {
        return value;
      }
    }
  };

  const handleFilertOut = (e: any) => {
    // console.log("input", input);
    filterData();
  };

  return (
    <React.Fragment>
      <Navbar
        setInput={setInput}
        input={input}
        handleFilertOut={handleFilertOut}
        clearInput={clearInput}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440, whiteSpace: "nowrap" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {filteredColumns.map((column, i) => (
                  <TableCell key={i}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row: any, rowIndex: number) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {filteredColumnNames.map((column: any, colIndex) => (
                    <TableCell key={colIndex}>
                      {renderCell(row[column], column)}
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
            onClick={handleFilertOut}
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
