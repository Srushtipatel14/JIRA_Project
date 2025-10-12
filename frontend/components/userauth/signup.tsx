'use client';

import "@/styles/userlogin.css";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { API_AUTH_URL } from "@/utils/config";
import Link from "next/link";
import Cookies from "js-cookie";
import { useUser } from "../../context/userContext";

interface formdata {
  userName?: string;
  email?: string;
  password?: string;
}

const UserSignup = () => {
  const router = useRouter();
  const [formdata, setFormdata] = useState<formdata>({});
  const { setSelectUser } = useUser();

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const submitForm = async () => {
    try {
      const response = await axios.post(`${API_AUTH_URL}/signup`, formdata, {
        withCredentials: true
      });
      if (response.data.success) {
        Cookies.set("logged_user", JSON.stringify(response.data.data), {
          expires: 1,
          secure: true,
          sameSite: "strict"
        });
        setSelectUser(response.data.data);
        router.push(`/`);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className="container-fluid flex-grow-1 d-flex justify-content-center align-items-center bg_image">
      <div className="card p-4 text-center form_styling" style={{ width: "350px" }}>
        <div>
          <Image src="/jira_logo.png" alt="web_logo" width={75} height={75} className="mb-3" />
        </div>
        <div className="mb-3">
          <p className="login_font fs-4">Signup</p>
        </div>
        <div className="my-2">
          <input onChange={handlechange} value={formdata.userName || ''} name="userName" type="text" className="form-control" placeholder="Username" />
        </div>
        <div className="my-2">
          <input onChange={handlechange} value={formdata.email || ''} name="email" type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="my-2">
          <input onChange={handlechange} value={formdata.password || ''} name="password" type="text" className="form-control" placeholder="Password" />
        </div>
        <div className="mt-5">
          <button className="button-primary w-100" onClick={submitForm}>Signup</button>
        </div>
        <div className="mt-5">
          Already have an account? <Link href={"/login"} className="text-decoration-none">Login</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserSignup;
