import { ApiAiClient } from "api-ai-javascript";

const client = new ApiAiClient({
  accessToken: process.env.REACT_APP_APIAI_CLIENT_ID
});

let githubApiUrl = `https://api.github.com`;

export async function dialogFlowReq(text) {
  const response = await client.textRequest(text);
  console.log(response);
  const handledResponse = handleResponse(response);
  if (handledResponse.type === "error") {
    return handledResponse;
  } else {
    console.log(handledResponse);
    const githubResp = await fetch(handledResponse.url);
    console.log(githubResp);
    const data = await githubResp.json();
    console.log(data);
    return data;
  }
}

function handleResponse(response) {
  const parameters = response.result.parameters;
  let url = githubApiUrl;
  if (parameters.GithubQueryItem) {
    url = `${url}/${parameters.GithubQueryItem}`;
  } else {
    return {
      type: "error",
      msg: "No query item found in search text"
    };
  }
  if (parameters.GithubLanguage) {
    url = `${url}?q=${parameters.GithubLanguage}`;
  } else {
    return {
      type: "error",
      msg: "No language found in search text"
    };
  }
  url = `${url}&${parameters.GithubOrder}&${parameters.GithubSort}`;
  // const params = Object.keys(parameters)
  //   .map(key => {
  //     return [parameters[key]].map(encodeURIComponent).join("=");
  //   })
  //   .join("&");
  // console.log(params);
  // return baseUrl + "?" + params;
  return {
    type: "success",
    url: url
  };
}
