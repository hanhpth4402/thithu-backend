import express, { query, response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mock_test',
});

connection.connect((error) => {
  if (error) {
    console.log (error);
  }
  else {
    console.log ('ket noi thanh cong');
  }
})

console.log ('hanh');

const app = express()
const port = 8082;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors())

app.get('/', (req, res) => {
  res.send('Helloollll!')
})

app.get('/usersss', (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, result) => {
    if (err) {
      console.log (err);
    }
    res.status(200).json({
      message: 'success',  
      data: result
    });
    console.log(req.params);

  })
})

app.post('/users/getuser', (req, res) => {
  const userId = req.query.userId;
  const postId = req.query.postId;
  console.log(req.body);

  
  console.log(req.query);
  res.send(`User ID: ${userId}, Post ID: ${postId}`);
});


// app.get(`/table=${}`)
const cb0 = function (req, res, next) {
  console.log('truoc khi send den web')
  next()
}

const cb1 = function (req, res, next) {
  console.log('truoc khi send den web')
  next()
}

const abc = JSON.stringify({
  message: 'Hanh',
  data: 'hah'
})

app.get(`/example/:abc`, [cb0, cb1], (req, res, next) => {
  res.redirect('https://www.google.com/')
  const d = req.params.d;
  console.log(d);
  next()
}, (req, res) => {
});

app.get('/mon_thi', (req, res) => {
  const mon_thi = req.query.mon_thi;
  let query = `SELECT * FROM mon_hoc WHERE ID_MON_HOC = '${mon_thi}'`;
  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send(respond);
  })
})

app.get('/mon_thi_hoc_phan', (req, res) => {
  const mon_thi_hoc_phan = req.query.mon_thi_hoc_phan;
  let query = `SELECT * FROM hoc_phan WHERE ID_MON_HOC = '${mon_thi_hoc_phan}'`;
  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send(respond);
  })
})

app.get('/de_thi_mon', (req, res) => {
  const de_thi_mon = req.query.de_thi_mon;
  const so_hien_thi = req.query.so_hien_thi;
  const trang_hien_thi = req.query.trang_hien_thi;

  let query = `SELECT * FROM de_thi WHERE ID_MON_HOC = '${de_thi_mon}' AND TYPE=1 ORDER BY ID_DE_THI LIMIT ${so_hien_thi} OFFSET ${trang_hien_thi};`;
  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send(respond);
  })
})


app.get ('/ten_mon', (req, res) => {
  const ten_mon = req.query.ten_mon;
  const type = req.query.type;
  let query = `SELECT COUNT(*) AS sodethi FROM de_thi WHERE ID_MON_HOC='${ten_mon}' AND TYPE='${type}'`
  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send(respond);
  });

})


app.get('/ten_de', (req, res) => {
  const mon_hoc = req.query.mon_hoc;
  const type = req.query.type;
  const ten_de = req.query.ten_de;
  let query = `SELECT COUNT(*) as SOLUONGDELIKETHAT FROM de_thi WHERE ID_MON_HOC='${mon_hoc}' AND TYPE=${type} AND TEN LIKE '%${ten_de}%'`
  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send(respond);
  })
} );

app.get('/de_thi_mon', (req, res) => {
  const de_thi_mon = req.query.de_thi_mon;
  const so_hien_thi = req.query.so_hien_thi;
  const trang_hien_thi = req.query.trang_hien_thi;
  const ten_de = req.query.ten_de;

  let query = `SELECT * FROM de_thi WHERE ID_MON_HOC = '${de_thi_mon}' AND TYPE=1 AND TEN LIKE '%${ten_de}%' ORDER BY ID_DE_THI LIMIT ${so_hien_thi} OFFSET ${trang_hien_thi};`;
  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send(respond);
  })
});

app.get('/hoc_phan', (req, res) => {
  const hoc_phan = req.query.hoc_phan;

  let query = `SELECT * FROM hoc_phan WHERE ID_HOC_PHAN = '${hoc_phan}'`;

  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    }

    res.status(200).send(respond);
  })
});

app.get('/de_thi_theo_hoc_phan', (req, res) => {
  const de_thi_theo_hoc_phan = req.query.de_thi_theo_hoc_phan;

  let query = `SELECT * FROM de_thi WHERE ID_HOC_PHAN = '${de_thi_theo_hoc_phan}' AND TYPE=0`;

  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    }

    res.status(200).send(respond);
  })
});


/////Get cau hoi

app.get ('/cau_hoi', (req, res) => {
  const cau_hoi = req.query.cau_hoi;

  let query = `SELECT * FROM cau_hoi WHERE ID_CAU_HOI='${cau_hoi}'`;

  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(respond);
    }
  })
});


/////Lay de thi;

app.get('/thong_tin_de', (req, res) => {
  const thong_tin_de = req.query.thong_tin_de;
  let query = `SELECT * FROM de_thi WHERE ID_DE_THI = '${thong_tin_de}'`;
  connection.execute(query, (err, respond) => {
    res.status(200).send(respond)
  })
})

app.get('/de_thi', (req, res) => {
  const de_thi = req.query.de_thi;

  let query = "SELECT `cau_hoi`.`ID_CAU_HOI`, `cau_hoi`.`ID_HOC_PHAN`, `cau_hoi`.`ID_MON_HOC`, `cau_hoi`.`ID_MUC_DO`, `cau_hoi`.`NOI_DUNG`, `cau_hoi`.`NOI_DUNG_ANH`, `DAP_AN_A`, `DAP_AN_A_ANH`, `DAP_AN_B`, `DAP_AN_B_ANH`, `DAP_AN_C`, `DAP_AN_C_ANH`, `DAP_AN_D`, `DAP_AN_D_ANH`, `DAP_AN`, `NOI_DUNG_DAP_AN` FROM `cau_hoi`, `de_thi_cau_hoi` WHERE `cau_hoi`.`ID_CAU_HOI` = `de_thi_cau_hoi`.`ID_CAU_HOI` and `de_thi_cau_hoi`.`ID_DE_THI` ='" + de_thi +"'";

  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(respond);
    }
  })
});


app.post ('/login', (req, res) => {
  var {email, password} = req.body;

  let query = `SELECT * FROM users WHERE EMAIL = '${email}' AND PASSWORD = '${password}'`;

  connection.execute(query, (err, respond) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(respond);
    }
  })
  
});

app.post ('/submit', (req, res) => {
  var {id_user, id_de_thi, diem, ngay_thi, thoi_gian, chi_tiet} = req.body;
  let query1 = `SELECT * FROM users_de_thi as UD WHERE UD.ID_USERS = '${id_user}' AND UD.ID_DE_THI = '${id_de_thi}'`
  
  let query2 = `SELECT DIEM_CAO_NHAT, SO_NGUOI_THAM_GIA FROM de_thi as DT where DT.ID_DE_THI = '${id_de_thi}'`;
  let SO_NGUOI_THAM_GIA = 0;

  connection.execute(query2, (err, respond) => {
    if (respond[0].DIEM_CAO_NHAT < diem) {
      let queryUpdatDiemCaoNhat = `UPDATE de_thi SET DIEM_CAO_NHAT = '${diem}' WHERE ID_DE_THI = '${id_de_thi}'`;
      connection.execute(queryUpdatDiemCaoNhat);
    };
    SO_NGUOI_THAM_GIA = respond[0].SO_NGUOI_THAM_GIA;
  })

  connection.execute(query1, (err, respond) => {
    if (err) {
      res.send(err);
    } else {
      if (respond[0]) {
        let totalErr;  

        let query1 = `UPDATE users_de_thi SET DIEM='${diem}',NGAY_THI='${ngay_thi}',THOI_GIAN='${thoi_gian}' WHERE ID_USERS='${id_user}' AND ID_DE_THI='${id_de_thi}'`
        connection.execute(query1, (err, respond) => {
          if (err) {
            totalErr += err;
          }
        });

        for (let value of chi_tiet) {
          let subQuery = `UPDATE users_de_thi_chi_tiet SET DAP_AN_USERS ='${value.DAP_AN_USERS}' WHERE ID_USERS='${id_user}' AND ID_DE_THI='${id_de_thi}' AND ID_CAU_HOI='${value.ID_CAU_HOI}'`;
          connection.execute(subQuery, (err, respond) => {
            if (err) {
              totalErr += err;
            }
          });
        };

        if (totalErr) {
          res.send(totalErr)
        } else {
          res.status(200).send("thanh cong update");
        }


      } else {
        let totalErr;

        let querySoNguoiThamGia = `UPDATE de_thi SET SO_NGUOI_THAM_GIA = '${SO_NGUOI_THAM_GIA+1}' WHERE ID_DE_THI = '${id_de_thi}'`;
        connection.execute(querySoNguoiThamGia);

        let query2 = `INSERT INTO users_de_thi VALUES ('${id_user}','${id_de_thi}','${diem}','${ngay_thi}','${thoi_gian}')`;
        connection.execute(query2, (err, respond) => {
          if (err) {
            totalErr += err;
          }
        });


        let tmp = [];
        for (let value of chi_tiet) {
          tmp.push(`('${id_user}' , '${id_de_thi}' , '${value.ID_CAU_HOI}' , ${value.DAP_AN_USERS})`);
        };
        let str = tmp.join(", ");
        let query3 = `INSERT INTO users_de_thi_chi_tiet VALUES ${str}`;
        connection.execute(query3, (err, respond) => {
          if (err) {
            totalErr += err;
          } 
        });

        if (totalErr) {
          res.send(totalErr)
        } else {
          res.status(200).send("thanh cong");
        }
      }
    }
  })


});

app.get ('/bai_lam', (req, res) => {
  var id_user = req.query.bai_lam;

  let query = `SELECT * FROM users_de_thi AS US, de_thi AS DT, mon_hoc AS MH WHERE US.ID_USERS = '${id_user}' AND US.ID_DE_THI = DT.ID_DE_THI AND DT.ID_MON_HOC = MH.ID_MON_HOC`;

  connection.execute(query, (err, respond) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(respond);
    }
  })
});

//////Lay chi tiet bai lam cua thi sinh;
app.post ('/chi_tiet', (req, res) => {
  var {id_user, id_de_thi} = req.body;

  let query1 = `SELECT * FROM users_de_thi AS US, de_thi AS DT WHERE US.ID_USERS = '${id_user}' AND US.ID_DE_THI = '${id_de_thi}' AND DT.ID_DE_THI = '${id_de_thi}'`;

  connection.execute(query1, (err, respond) => {
    if (err) {
      res.status(404).send(err);
    } else {
      if (respond[0]) {
        let tmp = respond[0];
        let ds_answer = [];
        let query2 = `SELECT * FROM users_de_thi_chi_tiet as CT, cau_hoi as CH LEFT JOIN hoc_phan as HP ON CH.ID_HOC_PHAN = HP.ID_HOC_PHAN WHERE CT.ID_USERS='USER_1' AND CT.ID_CAU_HOI = CH.ID_CAU_HOI AND CT.ID_DE_THI = '${id_de_thi}'`;
//mo cai nao do
        connection.execute(query2, (err, respond) => {
          ds_answer = respond;

          let result = {
            "ID_USERS": tmp.ID,
            "ID_DE_THI": tmp.ID_DE_THI,
            "DIEM": tmp.DIEM,
            "NGAY_THI": tmp.NGAY_THI,
            "THOI_GIAN": tmp.THOI_GIAN,
            "THOI_GIAN_LAM": tmp.THOI_GIAN_LAM,
            "TEN_DE": tmp.TEN_DE,
            "TYPE": tmp.TYPE,
            "CHI_TIET_CAU_TRA_LOI": ds_answer
          };
  
          res.status(200).send(result);
          // console.log(respond);
        });


      } else {
        res.status(404).send({
          body: req.body,
          user: + id_user,
          de_thi: id_de_thi,
          type: true,
          message: "Khong tong tai"
        })
      }
    }
  })
}) 





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)    
})

// const query = "SELECT * FROM users";
// connection.execute(query, (err, result) => {
//   if (err) {
//     console.log (err);
//   }
//   let [rows, field] = result;
//   console.log(result);
// })