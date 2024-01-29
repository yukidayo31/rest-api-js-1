const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "ini data", "Ok, homepage success!", res);
});

/*          MAHASISWA          */
app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";

  db.query(sql, (error, result) => {
    if (error) throw error;
    response(200, result, "Get all mahasiswa list, success!", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;

  db.query(sql, (error, result) => {
    if (error) throw error;
    response(200, result, `Get mahasiswa data with nim ${nim}, success!`, res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`;

  db.query(sql, (error, result) => {
    if (error) response(500, "invalid", "server error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
        details: req.body,
      };
      response(200, data, `Add data mahasiswa with nim ${nim}, success!`, res);
    } else {
      console.log("data tidak masuk");
    }
  });
  //   res.send("ok!");
});

app.put("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`;

  db.query(sql, (error, result) => {
    if (error) response(500, "update error", "server error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
        details: req.body,
      };
      response(200, data, `Update data with nim ${nim}, success!`, res);
      console.log("data berhasil diupdate");
    } else {
      response(404, "invalid", "user not found", res);
      console.log("data gagal diupdate");
    }
  });
  //   res.send("All mahasiswa data has been updated!");
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim} `;

  db.query(sql, (error, result) => {
    if (error) response(500, "delete error", "server error", res);

    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        details: req.body,
      };
      response(
        200,
        data,
        `data mahasiswa with nim ${nim} has been deleted!`,
        res
      );
      console.log(`Data mahasiswa nim ${nim} berhasil dihapus`);
    } else {
      response(404, "user not found", "data doesn't exist", res);
      console.log(`Data mahasiswa nim ${nim} gagal dihapus!`);
    }
  });
});

/*          DOSEN          */
app.get("/dosen", (req, res) => {
  const sql = "SELECT * FROM dosen";

  db.query(sql, (error, result) => {
    if (error) {
      response(500, "invalid", "server error", res);
      console.log("Failed to GET all dosen data list");
    }
    response(200, result, "GET all dosen data list", res);
    console.log("Successfully GET all dosen data list");
  });
});

app.get("/dosen/:nip", (req, res) => {
  const nip = req.params.nip;
  const sql = `SELECT * FROM dosen WHERE nip = ${nip}`;

  db.query(sql, (error, result) => {
    if (error) {
      response(500, "invalid", "server error", res);
      console.log(`Failed to GET data dosen with nip ${nip}`);
    }
    response(200, result, `GET dosen data with nip ${nip}, success!`, res);
    console.log(`Successfully GET data dosen with nip ${nip}!`);
  });
});

app.post("/dosen", (req, res) => {
  const { nip, namaLengkap, mataKuliah, alamat } = req.body;
  const sql = `INSERT INTO dosen (nip, nama_lengkap, mata_kuliah, alamat) VALUES (${nip}, '${namaLengkap}', '${mataKuliah}', '${alamat}')`;

  db.query(sql, (error, result) => {
    if (error) {
      response(500, "invalid", "server error", res);
      console.log(`Failed to add data dosen with nip ${nip}`);
    }

    if (result?.affectedRows) {
      response(200, req.body, `ADD dosen data with nip ${nip}, success!`, res);
      console.log(`Successfully ADD data dosen with nip ${nip}!`);
    } else {
      response(404, "duplicate user!", "data already exist", res);
      console.log(`Failed to ADD data dosen with nip ${nip}!`);
    }
  });
});

app.put("/dosen", (req, res) => {
  const { nip, namaLengkap, mataKuliah, alamat } = req.body;
  const sql = `UPDATE dosen SET nama_lengkap = '${namaLengkap}', mata_kuliah = '${mataKuliah}', alamat = '${alamat}' WHERE nip = ${nip}`;

  db.query(sql, (error, result) => {
    if (error) {
      response(500, "invalid", "server error", res);
      console.log(`Failed to UPDATE data dosen with nip ${nip}`);
    }
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
        details: req.body,
      };
      response(
        200,
        data,
        `Successfully UPDATE data dosen with nip ${nip}!`,
        res
      );
    } else {
      response(404, "duplicate user!", "data already exist", res);
    }
  });
});

app.delete("/dosen", (req, res) => {
  const { nip } = req.body;
  const sql = `DELETE FROM dosen WHERE nip = ${nip}`;

  db.query(sql, (error, result) => {
    if (error) {
      response(500, "delete error", "server error", res);
      console.log(`Failed to DELETE dosen data with nip ${nip}`);
    }
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        details: req.body,
      };
      response(
        200,
        data,
        `Successfully DELETE data dosen with nip ${nip}!`,
        res
      );
      console.log(`Data dosen dengan nip ${nip} berhasil dihapus!`);
    } else {
      response(404, "user not found", "data doesn't exist", res);
      console.log(`Data dosen dengan nip ${nip} gagal dihapus!`);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
