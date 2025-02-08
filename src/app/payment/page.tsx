"use client";
import React, { FormEvent } from "react";
import sha256 from "crypto-js/sha256";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

export interface Root {
  success: boolean;
  code: string;
  message: string;
  data: Data;
}

export interface Data {
  merchantId: string;
  merchantTransactionId: string;
  instrumentResponse: InstrumentResponse;
}

export interface InstrumentResponse {
  type: string;
  redirectInfo: RedirectInfo;
}

export interface RedirectInfo {
  url: string;
  method: string;
}

type FormData = {
  name?: string;
  mobile?: string;
  amount?: string;
  muid?: string;
};
const PaymentForm = () => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    mobile: "",
    amount: "",
    muid: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log("formData = ", formData);
    makePayment();
  };

  const MERCHANT_ID = "PGTESTPAYUAT86";
  const MERCHANT_USER_ID = "MUID123";
  const SALT_KEY = "96434309-7796-489d-8924-ab56988a6076";
  const SALT_INDEX = 1;

  const makePayment = async () => {
    const merchantTransactionId = "Tr-" + uuidv4().toString().slice(0, 32);

    const payloadMock = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: MERCHANT_USER_ID,
      amount: 10000,
      redirectUrl: `http://localhost:3000/api/status/${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `http://localhost:3000/api/status/${merchantTransactionId}`,
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const strigifiedPayload = JSON.stringify(payloadMock);
    const payloadBase64 = Buffer.from(strigifiedPayload).toString("base64");
    console.log("payloadBase64 = ", payloadBase64);

    const payloadSha256 = sha256(payloadBase64 + "/pg/v1/pay" + SALT_KEY);
    const checksum = payloadSha256 + "###" + SALT_INDEX;
    console.log("checksum = ", checksum);

    const response = await fetch(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
        body: JSON.stringify({
          request: payloadBase64,
        }),
      }
    );
    const result: Root = await response.json();
    const redirectUrl = result.data.instrumentResponse.redirectInfo.url;
    console.log("result = ", result);
    redirect(redirectUrl);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label
            className="text-blue-600/100 dark:text-sky-400/100"
            htmlFor="name"
          >
            Name
          </label>
          <input
            onChange={(e) => {
              console.log("e = ", e);
              setFormData((data) => ({ ...data, name: e.target.value }));
            }}
            type="text"
            id="name"
            name="name"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label
            className="text-blue-600/100 dark:text-sky-400/100"
            htmlFor="mobile"
          >
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            onChange={(e) => {
              console.log("e = ", e);
              setFormData((data) => ({ ...data, mobile: e.target.value }));
            }}
            name="mobile"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label
            className="text-blue-600/100 dark:text-sky-400/100"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="text"
            onChange={(e) => {
              console.log("e = ", e);
              setFormData((data) => ({ ...data, amount: e.target.value }));
            }}
            id="amount"
            name="amount"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label
            className="text-blue-600/100 dark:text-sky-400/100"
            htmlFor="muid"
          >
            MUID
          </label>
          <input
            type="text"
            onChange={(e) => {
              console.log("e = ", e);
              setFormData((data) => ({ ...data, muid: e.target.value }));
            }}
            id="muid"
            name="muid"
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Pay
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "black",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PaymentForm;
