'use client';

import "../../css/userlogin.css";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { API_AUTH_URL } from "@/app/utils/config";
import Link from "next/link";

const UserSignup = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const submitForm = async () => {
    try {
      const data = {
        email: email
      }
      const response=await axios.post(`${API_AUTH_URL}/signin`,data);
      if(response.data.success){
        const id=response?.data?.data?._id;
        router.push(`/user/userotp/${id}`)
      }
    } catch (error:any) {
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
          <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="USername" />
        </div>
        <div className="my-2">
          <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" />
        </div>
         <div className="my-2">
          <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Password" />
        </div>
        <div className="mt-5">
          <button className="button-primary w-100" onClick={submitForm}>Signup</button>
        </div>
        <div className="mt-5">
          Already have an account? <Link href={"/user/login"} className="text-decoration-none">Login</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserSignup;
