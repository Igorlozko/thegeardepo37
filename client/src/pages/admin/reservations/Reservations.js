import { Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import { getReservations } from '../../../actions/reservation';
import isAdmin from '../utils/isAdmin';
import { grey } from '@mui/material/colors';
import isEditor from '../utils/isEditor';

const Reservations = ({ setSelectedLink, link }) => {
  const { state: { reservations, currentUser }, dispatch } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (reservations.length === 0) getReservations(dispatch);
  }, []);

  // Ensure each row has a unique id
  const rowsWithIds = reservations.map((reservation, index) => ({
    ...reservation,
    id: index + 1, // Generate unique ID for each row
  }));

  const columns = useMemo(() => [
    { field: 'resId', headerName: 'Reservation Id', width: 250 },
    { field: 'rName', headerName: 'Buyer Name', width: 150 },
    { field: 'phone', headerName: 'Buyer Phone', width: 150 },
    //{ field: 'rPhoto', headerName: 'Photo', width: 60 },
    { field: 'gearId', headerName: 'Gear Id', width: 250 },
    { field: 'startDate', headerName: 'Start Date', width: 200 },
    { field: 'endDate', headerName: 'End Date', width: 200 },
    { field: 'totalPrice', headerName: 'Total Price', width: 110 },
    { field: 'purpose', headerName: 'Purpose', width: 200 },
    { field: 'addinfo', headerName: 'Add Info', width: 200 },
  ], []);

  const filteredReservations = useMemo(() => {
    if (isAdmin(currentUser)) return reservations;
    if (isEditor(currentUser)) {
      // Filter reservations based on the gear created by the editor
      const editorGearId = currentUser.ugearId;
      console.log("Editor Gear ID:", editorGearId); // Log editor's gear ID
      return reservations.filter(reservation => reservation.ugearId === editorGearId || reservation.rName === currentUser.name);
    }
    // For basic users, filter reservations based on their name
    return reservations.filter(reservation => reservation.rName === currentUser.name);
  }, [currentUser, reservations]);
  

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          textAlign: 'center',
          mt: 3,
          mb: 3,
        }}
      >
        Manage Reservations
      </Typography>
      <DataGrid
        columns={columns}
        rows={filteredReservations}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Reservations;
