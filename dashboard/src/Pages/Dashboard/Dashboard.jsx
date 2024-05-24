import style from "./Dashboard.module.scss";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip"; // Import Chip component
// sweetalert
import Swal from "sweetalert2";
// api
import api from "../../Utils/Api";

const columns = [
  { id: "name", label: "Name", minWidth: 170, align: "center" },
  {
    id: "phone_number",
    label: "Phone",
    minWidth: 100,
    align: "center",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
    align: "center",
  },
  {
    id: "services",
    label: "Services",
    minWidth: 170,
    align: "center",
  },
  {
    id: "model",
    label: "Model",
    minWidth: 170,
    align: "center",
  },
  {
    id: "total",
    label: "Total",
    minWidth: 170,
    align: "center",
  },
  {
    id: "notes",
    label: "Note",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

export default function Dashboard() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`api/orders`);
        // console.log(res.data);

        setRows(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`api/orders/${id}`);
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={style.container}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "action" ? (
                              <IconButton
                                onClick={() => deleteAlert(row.id)}
                                aria-label="delete"
                                size="large"
                              >
                                <DeleteIcon fontSize="inherit" color="error" />
                              </IconButton>
                            ) : column.id === "phone_number" ? (
                              <a href={`tel:${value}`}>{value}</a>
                            ) : column.id === "services" ? (
                              value
                                .split(",")
                                .map((service, index) => (
                                  <Chip
                                    key={index}
                                    label={service.trim()}
                                    sx={{ margin: "5px" }}
                                  />
                                ))
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
