const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const Pool = require("pg").Pool;


//  fs.createReadStream('./csv-files/questions.csv')
//   .pipe(csv())
//   .on('data', (data) => {
//    if(Object.keys(data).length < 8){
//      data.helpful = data.reported
//      data.reported = data.asker_email
//      data.asker_email = data.asker_name
//      data.asker_name = data.date_written
//      data.date_written = data.body
//      data.body = "null"
//      data.product_id = data.product_id
//      data.question_id = data.question_id
//    }

//    if(!isNaN(data.date_written)){
//     let ndate = new Date(Number(data.date_written))
//     data.date_written = ndate.toISOString()
//   }

//   if(data.date_written.length > 27){
//     var unix = Date.parse(data.date_written)
//     var ndate = new Date(Number(unix))
//     data.date_written = ndate.toISOString()
//   }

//    if(data.reported === "0") data.reported = "false"
//    if(data.reported === "1") data.reported = "true"

//    results.push(data)

//   })
//   .on('end', () => {
//     results.shift()
//     const pool = new Pool({
//       host: "localhost",
//       user: "me",
//       database: "questions_answers",
//       password: "password",
//       port: 5432
//     });
//     const query =
//       "INSERT INTO questions1 (question_id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
//           results.forEach(row => {
//             pool.query(query, [row.question_id, row.product_id, row.body, row.date_written, row.asker_name, row.asker_email, row.reported, row.helpful], (err, res) => {
//               if (err) {
//                 console.log(err.stack);
//               }
//             });
//           });
//   });

  // fs.createReadStream('./csv-files/answers_photos.csv')
  // .pipe(csv())
  // .on('data', (data) => {
  //   if(Object.keys(data).length < 3){
  //     data.photo_url = "null"
  //     data.answer_id = data.answer_id
  //     data.id = data.id
  //   }
  //     results.push(data)

  // })
  // .on('end', () => {
  //   results.shift()
  //   const pool = new Pool({
  //     host: "localhost",
  //     user: "me",
  //     database: "questions_answers",
  //     password: "password",
  //     port: 5432
  //   });
  //   const query =
  //     "INSERT INTO answers_photos (id, answer_id , photo_url) VALUES ($1, $2, $3)"
  //         results.forEach(row => {
  //           pool.query(query, [row.id, row.answer_id, row.photo_url], (err, res) => {
  //             if (err) {
  //               console.log(err.stack);
  //             }
  //           });
  //         });
  // });

  // fs.createReadStream('./csv-files/answers.csv')
  // .pipe(csv())
  // .on('data', (data) => {

  //       if(!isNaN(data.date_written)){
  //         let ndate = new Date(Number(data.date_written))
  //         data.date_written = ndate.toISOString()
  //       }

  //       if(data.date_written.length > 27){
  //         var unix = Date.parse(data.date_written)
  //         var ndate = new Date(Number(unix))
  //         data.date_written = ndate.toISOString()
  //       }

  //       if(data.reported === "0") data.reported = "false"
  //       if(data.reported === "1") data.reported = "true"
  //       if(data.answerer_email === "Seller"){
  //         data.answerer_name = "Seller"
  //         data.answerer_email = "null"
  //       }

  //       results.push(data);

  // })
  // .on('end', () => {
  //   results.shift()
  //   const pool = new Pool({
  //     host: "localhost",
  //     user: "me",
  //     database: "questions_answers",
  //     password: "password",
  //     port: 5432
  //   });
  //   const query =
  //   "INSERT INTO answers (answer_id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"

  //         results.forEach(row => {
  //           pool.query(query, [row.answer_id, row.question_id, row.body, row.date_written, row.answerer_name, row.answerer_email, row.reported, row.helpful], (err, res) => {
  //             if (err) {
  //               console.log(err.stack);
  //             }
  //           });
  //         });
  // });
