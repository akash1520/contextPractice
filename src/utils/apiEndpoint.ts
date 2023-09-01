const mode = process.env.NEXT_PUBLIC_NODE_MODE;

let apiEndpoint: string = "";
switch (mode) {
  case "development":
    apiEndpoint = "http://localhost:3000/api";
    break;
  case "production":
    apiEndpoint = "https://mentea.vercel.app/api";
    break;
  default:
    apiEndpoint = "https://mentea.vercel.app/api";
}
export default apiEndpoint;
