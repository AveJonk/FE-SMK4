import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [Judul, setJudul] = useState("");
  const [Penerbit, setPenerbit] = useState("");
  const [Deskripsi, setDeskripsi] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getBookById();
  },  [])
  const navigate = useNavigate();

  const editBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7895/book", {
        Judul,
        Penerbit,
        Deskripsi,
      });
      navigate("/");
    } catch (error) {
      console.log("error :" + error);
    }
  };

  const getBookById = async (e) => {
    try {
      const response = await axios.get(`http://localhost:7895/book/${id}`);
      setJudul (response.data.Judul);
      setPenerbit (response.data.Penerbit);
      setDeskripsi (response.data.Deskripsi);
      console.log(response);  
    } catch (error) {
      console.log("error" + error)
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h1>Form tambah buku</h1>
        <hr />
        <form onSubmit={editBook}>
          <div className="field">
            <label className="label">Judul</label>
            <input
              type="text"
              className="input"
              value={Judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Judul Buku"
            />
          </div>
          <div className="field">
            <label className="label">Penerbit</label>
            <input
              type="text"
              className="input"
              value={Penerbit}
              onChange={(e) => setPenerbit(e.target.value)}
              placeholder="Penerbit Buku"
            />
          </div>
          <div className="field">
            <label className="label">Deskripsi</label>
            <textarea
              className="textarea"
              placeholder="Deskripsi Buku"
              onChange={(e) => setDeskripsi(e.target.value)}
              value={Deskripsi}
            >
              {Deskripsi}
            </textarea>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  ); 
};

export default EditBook;
