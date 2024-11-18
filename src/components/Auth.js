import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import axios from "axios";
import "./Auth.css";

const Auth = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const handleChange = (e, flag) => {
        if (flag) {
            setUsername(e.target.value)
        } else {
            setPassword(e.target.value)
        }

    }
    const handleSubmit = async () => {
        const payload = { userName, password }
        const URL = "http://localhost:5000/signin"
        try {
            const response = await axios.post(URL, payload)
            const token = response.data.token
            messageApi.success("Login successful!");
            localStorage.setItem("token", token)
        } catch (error) {
            if (error && error.response && error.response.data && error.response.data.error) {
               
                messageApi.error(
                    error.response.data.error,
                );



            }
        }


    }
    return (
        <div className="body">
            {contextHolder}
            <input className="input" name="UserName" placeholder="Username" value={userName} onChange={(e) => handleChange(e, true)}  ></input>
            <input className="input" name="password" placeholder="Password" value={password} onChange={(e) => handleChange(e, false)} ></input>
            <Button className="button" type={'primary'} onClick={handleSubmit}>Submit</Button>
        </div>
    )

}
export default Auth;