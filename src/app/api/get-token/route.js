import { NextResponse } from "next/server";
import axios from "axios";

// This route handler performs a POST operation to the 'https://dev-acqqi6nb00ynyme4.us.auth0.com/oauth/token'
// endpoint to ask for a Management API v2 token.
export async function POST() {
  const options = {
    method: "POST",
    url: "https://dev-acqqi6nb00ynyme4.us.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "9D916kiBDyY2ZTi9Wo3VRvGO6hvttKql",
      client_secret:
        "0oRelwLcECBnbqcIIgeasJC48gi2Zht-wGcdMJCNnCyDBQDvVI72sinP4k5k4Df-",
      audience: "https://dev-acqqi6nb00ynyme4.us.auth0.com/api/v2/",
    }),
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
