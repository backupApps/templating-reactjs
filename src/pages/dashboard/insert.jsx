import {
   Card,
   Input,
   Button,
   Typography,
   Select, 
   Option,
   Alert
 } from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
  
export function Insert() {
   const navigate = useNavigate()
   const [prodiOptions, setProdiOptions] = useState([]);
   const [kelasOptions, setKelasOptions] = useState([]);
   const [formData, setFormData] = useState({
      nama: '',
      nim: '',
      prodi_id: '',
      kelas_id: '',
      email: '',
      alamat: '',
      agama: '',
      gambar: null,
   });

   useEffect(() => {
      axios.get('http://localhost:4000/dashboard/prodi').then(response => {
         setProdiOptions(response.data);
      }).catch(error => console.error('Error fetching prodi:', error));

      axios.get('http://localhost:4000/dashboard/kelas').then(response => {
         setKelasOptions(response.data);
      }).catch(error => console.error('Error fetching kelas:', error));
   }, []);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleSelectChange = (name, value) => {
      setFormData({
        ...formData,
        [name]: value,
      });
      console.log(`Selected ${name}:`, value);
   };
 
   const handleFileChange = (e) => {
      setFormData({
         ...formData,
         gambar: e.target.files[0],
      });
   };

   const handleSubmit = (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    for (const key in formData) {
       formDataObject.append(key, formData[key]);
    }

    axios.post('http://localhost:4000/dashboard/insert', formDataObject, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   })
       .then(response => {
          console.log('Data inserted:', response.data);
          alert('Data inserted successfully');
          window.location.reload()
       })
       .catch(error => {
          console.error('Error inserting data:', error);
          alert('Error inserting data');
       });
   };
  
   return (
    <div className="">
      <Card color="transparent" shadow={false} >
       <Typography variant="h4" color="blue-gray">
         Insert New Data
       </Typography>
       <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit} >
         <div className="mb-1 flex flex-col gap-6">
           <Typography variant="h6" color="blue-gray" className="-mb-3" htmlFor="name">
             Name
           </Typography>
           <Input
             size="lg"
             placeholder="Full Name"
             className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
             labelProps={{
               className: "before:content-none after:content-none",
             }}
             id="nama"
             name="nama"
             value={formData.nama}
             onChange={handleInputChange}
           />
           <Typography variant="h6" color="blue-gray" className="-mb-3" htmlFor="email">
             Email
           </Typography>
           <Input
             size="lg"
             placeholder="mail@gmail.com"
             className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
             labelProps={{
               className: "before:content-none after:content-none",
             }}
             id="email"
             name="email"
             value={formData.email}
             onChange={handleInputChange}
           />
           <Typography variant="h6" color="blue-gray" className="-mb-3" htmlFor="nim">
             NIM
           </Typography>
           <Input
             size="lg"
             placeholder="123XXXXXXX"
             className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
             labelProps={{
               className: "before:content-none after:content-none",
             }}
             id="nim"
             name="nim"
             value={formData.nim}
             onChange={handleInputChange}
           />
           <Typography variant="h6" color="blue-gray" className="-mb-3" htmlFor="prodi">
             Program Study
           </Typography>
           <Select 
              label="Choose One"
              id="prodi"
              name="prodi_id" 
              value={String(formData.prodi_id)} 
              onChange={(value) => handleSelectChange('prodi_id', value)} 
            >
              {prodiOptions.map((prodi) => (
                <Option key={prodi.prodi_id} value={String(prodi.prodi_id)}>
                  {prodi.prodi_name}
                </Option>
              ))}
            </Select>
           <Typography variant="h6" color="blue-gray" className="-mb-3" htmlFor="kelas">
             Class
           </Typography>
           <Select 
              label="Choose One" 
              id="kelas"
              name="kelas_id" 
              value={String(formData.kelas_id)} 
              onChange={(value) => handleSelectChange('kelas_id', value)} 
            >
              {kelasOptions.map((kelas) => (
                  <Option key={kelas.kelas_id} value={String(kelas.kelas_id)} >
                    {kelas.kelas_name}
                  </Option>
              ))}
           </Select>
           <Typography variant="h6" color="blue-gray" className="-mb-3" htmlFor="alamat">
             Address
           </Typography>
           <Input
             size="lg"
             placeholder="Jl. Pahlawan"
             className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
             labelProps={{
               className: "before:content-none after:content-none",
             }}
             id="alamat"
             name="alamat"
             value={formData.alamat}
             onChange={handleInputChange}
           />
           <Typography variant="h6" color="blue-gray" className="-mb-3" htmlFor="agama">
             Religion
           </Typography>
           <Input
             size="lg"
             placeholder="Islam"
             className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
             labelProps={{
               className: "before:content-none after:content-none",
             }}
             id="agama"
             name="agama"
             value={formData.agama}
             onChange={handleInputChange}
           />
           <Typography variant="h6" color="blue-gray" className="-mb-3" htmlFor="gambar">
             Image
           </Typography>
           <input type="file" name="gambar" onChange={handleFileChange} />
         </div>
         <Button className="mt-6" fullWidth type="submit" >Submit</Button>
       </form>
     </Card>
   </div>
   );
 }
 