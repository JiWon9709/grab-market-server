const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const product = require("./models/product");
const port = 8080;

app.use(express.json());
app.use(cors()); // 모든 브라우저에서 사용가능

app.get("/products", (req, res) => {
  // const query = req.query;
  // console.log("query: ", query);
  models.Product.findAll({
    // limit: 1,
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "createdAt", "seller", "imageUrl"],
  })
    .then((result) => {
      console.log("products : ", result);
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러 발생");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller } = body;
  if (!name || !description || !price || !seller) {
    res.send("모든 필드를 입력해주세요");
  }
  models.Product.create({
    name,
    description,
    price,
    seller,
  })
    .then((result) => {
      console.log("상품 생성 결과:", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 업로드에 문제가 발생했습니다.");
    });
  // res.send({
  //   body: body, // 키와 value 가 같으면 body만 써도됨
  // });
});

// 동적으로 경로 지정
app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  // res.send(`id는 ${id}입니다`);
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("product : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품조회에 에러가 발생했습니다.");
    });
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다.");
  models.sequelize
    .sync()
    .then(() => {
      console.log("db 연결 성공");
    })
    .catch((err) => {
      console.error(err);
      console.log("db 연결 에러");
      process.exit();
    });
});
