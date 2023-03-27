import { connect } from "./dbConnection";

beforeAll(async () => {

  console.log("connect");

  await connect();

});
