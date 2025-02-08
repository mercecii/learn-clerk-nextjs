import { NextRequest, NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";

export async function GET(request: NextRequest, res: NextResponse) {
  console.log(
    "################################formData################################ = ",
    request.nextUrl.pathname
  );
  const paths = request.nextUrl.pathname.split("/");
  const merchantTransactionId = paths[paths.length - 1];
  console.log("merchantTransactionId = ", merchantTransactionId);
  const MERCHANT_ID = process.env.NEXT_PUBLIC_MERCHANT_ID;
  const SALT_KEY = process.env.NEXT_PUBLIC_SALT_KEY;
  const SALT_INDEX = process.env.NEXT_PUBLIC_SALT_INDEX;

  // https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/{merchantId}/{merchantTransactionId}
  const payloadSha256 = sha256(
    `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY
  );
  const xverify = payloadSha256 + "###" + SALT_INDEX;
  console.log("checksum = ", xverify);

  if (!MERCHANT_ID) {
    throw new Error("MERCHANT_ID is not defined");
  }

  const response = await fetch(
    `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xverify,
        "X-MERCHANT-ID": MERCHANT_ID,
      },
    }
  );
  const data = await response.json();
  console.log("data = ", data);
  const url = request.nextUrl.clone();
  if (data.success && data.code === "PAYMENT_SUCCESS") {
    url.pathname = "/payment/success";
    return NextResponse.redirect(url);
  } else {
    url.pathname = "/payment/failure";
    return NextResponse.redirect(url);
  }
}
