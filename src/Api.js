import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost/herbalife/index.php/api/",
  baseURL: "http://justidea.my.id/herbalife/index.php/api/",
  responseType: "json",
  // headers: { 'user-key': '424330a0303d74cb437d17c4d8787984' },
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
  }
});