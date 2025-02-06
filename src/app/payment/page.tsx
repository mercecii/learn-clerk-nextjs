"use client";
import React, { FormEvent } from "react";

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

  const makePayment = async () => {
    const response = await fetch(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY":
            "d7a8e4458caa6fcd781166bbdc85fec76740c18cb9baa9a4c48cf2387d554180###1",
        },
        body: JSON.stringify({
          request:
            "ewogICJtZXJjaGFudElkIjogIlBHVEVTVFBBWVVBVCIsCiAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICJNVDc4NTA1OTAwNjgxODgxMDQiLAogICJtZXJjaGFudFVzZXJJZCI6ICJNVUlEMTIzIiwKICAiYW1vdW50IjogMTAwMDAsCiAgInJlZGlyZWN0VXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL3JlZGlyZWN0LXVybCIsCiAgInJlZGlyZWN0TW9kZSI6ICJSRURJUkVDVCIsCiAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL2NhbGxiYWNrLXVybCIsCiAgIm1vYmlsZU51bWJlciI6ICI5OTk5OTk5OTk5IiwKICAicGF5bWVudEluc3RydW1lbnQiOiB7CiAgICAidHlwZSI6ICJQQVlfUEFHRSIKICB9Cn0=",
        }),
      }
    );
    const result = await response.json();
    console.log("result = ", result);
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
