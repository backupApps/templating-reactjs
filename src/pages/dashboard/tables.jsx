import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import UpdateForm from "./update";

export function Tables() {
  const [authors, setAuthors] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [prodiOptions, setProdiOptions] = useState([]); // State untuk Program Study
  const [kelasOptions, setKelasOptions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/dashboard/tables`)
    .then((response) => {
      setAuthors(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

    // Fetch data untuk program studi dan kelas
    axios.get('http://localhost:4000/dashboard/prodi')
      .then((response) => {
        setProdiOptions(response.data); // Set data program studi
      })
      .catch((error) => {
        console.error('Error fetching program study data:', error);
      });

    axios.get('http://localhost:4000/dashboard/kelas')
      .then((response) => {
        setKelasOptions(response.data); // Set data kelas
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      });
  }, [])
  
  const handleClickOpen = (id) => {
    axios.get(`http://localhost:4000/dashboard/tableById/${id}`)
      .then((response) => {
        setSelectedData(response.data); // Mengisi data yang dipilih untuk diedit
        setOpen(true); // Membuka form
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (id, formData) => {
    const data = new FormData();

    // Tambahkan semua field teks dan file ke FormData
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios.put(`http://localhost:4000/dashboard/update/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      alert('Data berhasil di update', response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Failed update data', error);
    });

    console.log('Data yang dikirim:', formData);
    handleClose();
  };
  
  const handleDeleted = (id) => {
    const confirm = window.confirm('Are you sure want to delete this account?')
    if (confirm) {
    axios.delete(`http://localhost:4000/dashboard/deleted/${id}`)
    .then((response) => {
        alert('Hapus berhasil', response.data)
        window.location.reload()
      })
      .catch((error) => {
        console.log('Failed deleted action', error)
      })
    }
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Authors Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["no", "name", "nim", "prodi", "class", "address", "religion", "action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-center"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authors.map(
                ({ no, id, nama, nim, prodi_name, kelas_name, email, alamat, agama, gambar }, key) => {
                  const className = `py-3 px-5 text-center ${
                    key === authors.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <Typography className="">
                          {no}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex gap-4">
                          <Avatar src={`http://localhost:4000/uploads/${gambar}`} alt="img" size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {nama}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {nim}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {prodi_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {kelas_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {alamat}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {agama}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >                          
                          <Button color="blue" size="sm" onClick={() => handleClickOpen(id)}>Edit</Button> {" "}
                          <Button color="red" size="sm" onClick={() => handleDeleted(id)}>Delete</Button>
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          {selectedData && (
            <UpdateForm
              open={open}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              initialData={selectedData}
              prodiOptions={prodiOptions}
              kelasOptions={kelasOptions}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
