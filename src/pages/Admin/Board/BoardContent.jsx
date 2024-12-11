import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Grid } from "@mui/material";
import { getOrganizationId } from "./utils/getOrganizationId"; // Import the utility function

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

const BoardContent = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const organizationId = getOrganizationId();

  useEffect(() => {
    const fetchStudents = async () => {
      if (!organizationId) {
        console.error("Organization ID not found in cookies");
        return;
      }

      try {
        const response = await axios.get(
          `/organizations/dashboard/${organizationId}`
        );
        setStudents(response.data.data.student);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, [organizationId]);

  const toggleDetails = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Student List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <React.Fragment key={student._id}>
                <TableRow>
                  <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => toggleDetails(index)}>
                      {openIndex === index ? "Hide" : "View"}
                    </Button>
                  </TableCell>
                </TableRow>
                {openIndex === index && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="body1"><strong>Address:</strong> {student.address}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BoardContent;
