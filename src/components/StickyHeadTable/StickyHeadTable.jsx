import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { API_DIRECTORY } from "../../../config.js";

const textColor = "#ffffff";
const bgColor = "#0051c2";
const headerFontSize = "1.5rem";
const bodyFontSize = "1.5rem";
const buttonFontSize = "1.25rem";
const paginationFontSize = "1.25rem";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "nome", label: "Nome", minWidth: 100 },
  {
    id: "cpf",
    label: "CPF",
    minWidth: 100,
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "cargo",
    label: "Cargo",
    minWidth: 100,
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "options",
    label: "Opções",
    minWidth: 50,
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: bgColor,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: bgColor,
          color: textColor,
          fontSize: headerFontSize,
        },
        body: {
          fontSize: bodyFontSize,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: buttonFontSize,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontSize: paginationFontSize,
        },
        selectIcon: {
          fontSize: paginationFontSize,
        },
        select: {
          fontSize: paginationFontSize,
        },
        displayedRows: {
          fontSize: paginationFontSize,
        },
        actions: {
          fontSize: paginationFontSize,
        },
      },
    },
  },
});

const convertToCSV = (objArray) => {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  array.forEach((obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        str += `${key},${obj[key]}\r\n`;
      }
    }
  });

  return str;
};

const downloadCSV = (data, filename) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const StickyHeadTable = ({ searchTerm }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    fetch(`${API_DIRECTORY}getADM.php`)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        setFilteredRows(data);
      })
      .catch((error) => console.error("Erro ao buscar dados de admin:", error));
  }, []);

  useEffect(() => {
    setFilteredRows(
      rows.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, rows]);

  const handleDownload = (id, nome) => {
    fetch(`${API_DIRECTORY}getAdminById.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        downloadCSV(data, `${nome}.csv`);
      })
      .catch((error) => console.error("Erro ao buscar dados de admin:", error));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
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
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "options" ? (
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<DownloadIcon />}
                                sx={{ fontSize: buttonFontSize }}
                                onClick={() => handleDownload(row.id, row.nome)}
                              >
                                Download
                              </Button>
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
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  );
};
