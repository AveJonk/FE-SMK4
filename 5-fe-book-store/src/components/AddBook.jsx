import React, { useState } from "react";
import axios from "axios";
import { useNavigate, } from "react-router-dom";

const AddBook = () => {
  const [Judul, setJudul] = useState("");
  const [Penerbit, setPenerbit] = useState("");
  const [Deskripsi, setDeskripsi] = useState("");
  const navigate = useNavigate();

  const saveBook = async (e) => {
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
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h1>Form tambah buku</h1>
        <hr />
        <form onSubmit={saveBook}>
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
            >
              {Deskripsi}
            </textarea>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};    

export default AddBook;
 