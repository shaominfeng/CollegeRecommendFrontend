import request from "../utils/request";

export function findAll() {
  return request({
    url: `universities/year/2021/subject/history`,
    method: "get",
    // baseURL: "http://127.0.0.1:3000/",
  });
}

export function recommend(subject: string, score: number, offset: number) {
  return request({
    url: `/universities/subject/${subject}/score/${score}/offset/${offset}/recommend/300`,
    method: "get",
    // baseURL: "http://127.0.0.1:3000/",
  });
}
