import React, { useState, useEffect } from 'react';
import { 
   Dialog, 
   DialogActions, 
   DialogContent, 
   DialogContentText, 
   DialogTitle, 
   TextField, 
   Button, 
   Select,
   MenuItem,
   Input,
   FormControl, 
   InputLabel
} from '@mui/material';

const UpdateForm = ({ open, handleClose, handleSubmit, initialData, prodiOptions, kelasOptions }) => {
  const [formData, setFormData] = useState(initialData || {});

  // Menggunakan useEffect untuk mengupdate formData setiap kali initialData berubah
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value // Jika ada file, ambil file pertama
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Silakan edit data yang diperlukan.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="nama"
          label="NAME"
          type="text"
          fullWidth
          value={formData.nama || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="nim"
          label="NIM"
          type="text"
          fullWidth
          value={formData.nim || ''}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="prodi-label">PROGRAM STUDY</InputLabel>
          <Select
            labelId="prodi-label"
            name="prodi_id"
            value={formData.prodi_id || ''}
            onChange={handleChange}
          >
            {prodiOptions.map((prodi) => (
              <MenuItem key={prodi.prodi_id} value={prodi.prodi_id}>
                {prodi.prodi_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Class Select */}
        <FormControl fullWidth margin="dense">
          <InputLabel id="kelas-label">CLASS</InputLabel>
          <Select
            labelId="kelas-label"
            name="kelas_id"
            value={formData.kelas_id || ''}
            onChange={handleChange}
          >
            {kelasOptions.map((kelas) => (
              <MenuItem key={kelas.kelas_id} value={kelas.kelas_id}>
                {kelas.kelas_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="email"
          label="EMAIL"
          type="text"
          fullWidth
          value={formData.email || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="alamat"
          label="ADDRESS"
          type="text"
          fullWidth
          value={formData.alamat || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="agama"
          label="RELIGION"
          type="text"
          fullWidth
          value={formData.agama || ''}
          onChange={handleChange}
        />
        <Input
         margin="dense"
         name="gambar"
         label="IMAGE"
         type="file"
         onChange={handleChange} 
         />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(formData.id, formData)} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateForm;
