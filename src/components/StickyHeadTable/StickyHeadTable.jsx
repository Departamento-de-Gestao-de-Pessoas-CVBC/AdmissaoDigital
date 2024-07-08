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

const textColor = "#ffffff";
const bgColor = "#0051c2";
const headerFontSize = "1.5rem";
const bodyFontSize = "1.5rem";
const buttonFontSize = "1.25rem";
const paginationFontSize = "1.25rem"; // Novo tamanho de fonte para paginação

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Nome", minWidth: 100 },
  {
    id: "cpf",
    label: "CPF",
    minWidth: 100,
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "responsibility",
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

const createData = (id, name, cpf, responsibility) => {
  return { id, name, cpf, responsibility, options: "download" };
};

const rows = [
  createData(
    1,
    "Luiz Henrique Lima de Oliveira",
    "114.378.259-31",
    "Estagiário - Nível Superior"
  ),
  createData(
    2,
    "Fulano de Tal da Silva",
    "003.895.742-93",
    "Assessor Parlamentar"
  ),
  createData(
    3,
    "Filipino Rocha Cabral",
    "449.625.872-63",
    "Assessor Parlamentar"
  ),
  createData(
    4,
    "Marcos Kleber Pereira Machado",
    "666.852.712-59",
    "Diretor de Patrimônio"
  ),
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

export const StickyHeadTable = ({ searchTerm }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    setFilteredRows(
      rows.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

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
