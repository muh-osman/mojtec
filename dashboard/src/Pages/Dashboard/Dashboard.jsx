import style from "./Dashboard.module.scss";
//
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip"; // Import Chip component
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress component
// sweetalert
import Swal from "sweetalert2";
// api
import api from "../../Utils/Api";

export default function Dashboard() {
  const [rows, setRows] = React.useState([]);
  const [loadingRows, setLoadingRows] = React.useState({});

  const fetchData = async () => {
    try {
      const res = await api.get(`api/orders`);
      // console.log(res.data);
      setRows(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // Helper function to format the date
  const formatDate = (laravelTimestamp) => {
    const dateObject = new Date(laravelTimestamp);
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(dateObject);
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
    // Show loader for the specific row
    setLoadingRows((prevLoadingRows) => ({ ...prevLoadingRows, [id]: true }));
    try {
      await api.delete(`api/orders/${id}`);
      // const updatedRows = rows.filter((row) => row.id !== id);
      // setRows(updatedRows);
      fetchData();
    } catch (err) {
      console.error(err);
      setLoadingRows((prevLoadingRows) => ({
        ...prevLoadingRows,
        [id]: false,
      }));
    }
  };

  return (
    <div className={style.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Services</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isLoading = loadingRows[row.id]; // Check loading status for the row
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{formatDate(row.created_at)}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <a href={`tel:${row.phone_number}`}>{row.phone_number}</a>
                  </TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    {row.services.split(",").map((service, index) => (
                      <Chip
                        key={index}
                        label={service.trim()}
                        sx={{ margin: "5px" }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Chip label={row.model} variant="outlined" />
                  </TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => deleteAlert(row.id)}
                      aria-label="delete"
                      size="large"
                    >
                      {isLoading ? (
                        // Show loader for specific row
                        <CircularProgress size={24} color="error" />
                      ) : (
                        <DeleteIcon fontSize="inherit" color="error" />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
