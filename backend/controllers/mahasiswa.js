import connection from "../db_connection.js";
import fs from "fs"
import path from "path";

//get all data
export const tables = (req,res) => {
   const query = `SELECT * FROM data_diri 
                  LEFT JOIN prodi ON data_diri.prodi_id = prodi.prodi_id 
                  LEFT JOIN kelas ON data_diri.kelas_id = kelas.kelas_id`;

   connection.query(query, (err, results) => {
      if (err) {
        console.error('Error in query: ' + err.stack);
        return res.status(500).send('Error in fetching data');
      }
      res.json(results)
   });
}

// get prodi
export const prodi = (req,res) => {
   const query = `SELECT * FROM prodi`

   connection.query(query, (err, results) => {
      if (err) {
         console.error('Error in query: ' + err.stack);
         return res.status(500).send('Error in fetching data');
      }
      res.json(results)
   })
}

// get kelas
export const kelas = (req,res) => {
   const query = `SELECT * FROM kelas`

   connection.query(query, (err, results) => {
      if (err) {
         console.error('Error in query: ' + err.stack);
         return res.status(500).send('Error in fetching data');
       }
       res.json(results)
   })
}

// get data by id
export const tableByID = (req,res) => {
   const id = req.params.id
   const query = `SELECT * FROM data_diri WHERE id = ?`

   connection.query(query, [id], (err, results) => {
      if (err) {
         console.error('Error fetching data:', err);
         res.status(500).json({ message: 'Error fetching data' });
       } else if (results.length === 0) {
         res.status(404).json({ message: 'Data not found' });
       } else {
         res.json(results[0]); // Mengembalikan data yang ditemukan
       }
   })
}

// post
export const insert = (req,res) => {
   const {nama, nim, prodi_id, kelas_id, email, alamat, agama} = req.body
   const gambar = req.file ? req.file.filename : "";

   if (!nama || !nim || !prodi_id || !kelas_id || !email || !alamat || !agama) {
      return res.status(400).send(`Please fill all required fields : 
                                 ${nama}, ${nim}, ${prodi_id}, ${kelas_id}, ${email}, ${alamat}, ${agama}, ${gambar}`);
   }

   const query = `INSERT INTO data_diri (nama, nim, prodi_id, kelas_id, email, alamat, agama, gambar) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

   connection.query(query, [nama, nim, prodi_id, kelas_id, email, alamat, agama, gambar], (err, results) => {
      if (err) {
         console.error('Error in query: ' + err.stack);
         return res.status(500).send('Error in inserting data');
      }
      res.status(201).send('Data inserted successfully ');
   })
}

// update
export const update = (req, res) => {
  const deleteOldImage = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
  };

  const id = req.params.id;
  const { nama, nim, prodi_id, kelas_id, email, alamat, agama } = req.body;
  let gambar = req.file ? req.file.filename : null;

  // Query untuk mendapatkan data lama sebelum diupdate
  connection.query('SELECT gambar FROM data_diri WHERE id = ?', [id], (err, results) => {
      if (err) {
          return res.status(500).json({ message: 'Error retrieving data', error: err });
      }

      const oldImage = results[0]?.gambar;

      // Jika ada file baru, hapus gambar lama dari folder dan perbarui nama gambar
      if (gambar) {
          if (oldImage) {
              deleteOldImage(`backend/uploads/${oldImage}`); // Hapus gambar lama dari folder
          }
      } else {
          gambar = oldImage; // Jika tidak ada gambar baru, gunakan gambar lama
      }

      // Query untuk mengupdate data
      const query = `
          UPDATE data_diri 
          SET nama = ?, nim = ?, prodi_id = ?, kelas_id = ?, email = ?, alamat = ?, agama = ?, gambar = ? 
          WHERE id = ?`;

      connection.query(query, [nama, nim, prodi_id, kelas_id, email, alamat, agama, gambar, id], (err, result) => {
          if (err) {
              return res.status(500).json({ message: 'Failed to update data', error: err });
          }
          res.status(200).json({ message: 'Data updated successfully' });
      });
  });
};

// delete
export const deleted = (req,res) => {
   const id = req.params.id;
   
   if (!id) {
      return res.status(400).send('ID is required');
   }
   
   const query = `DELETE FROM data_diri WHERE id = ?`

   connection.query(query, [id], (err, results) => {
      if (err) {
         console.error('Error in query:', err.stack);
         return res.status(500).send('Error deleting data');
      }
      if (results.affectedRows === 0) {
         return res.status(404).send('No data found with the given ID');
      }
     res.status(200).send('Data deleted successfully');
   })
}

const removeImage = (filePath) => {
   console.log("filePath ", filePath);
   console.log("directory name: ", __dirname);

   if (!filePath) return;

   filePath = path.join(__dirname, "../", filePath);
   fs.unlink(filePath, (err) => console.log(err)); // delete image
};