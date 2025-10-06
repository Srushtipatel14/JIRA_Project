import { Offcanvas } from "react-bootstrap";
import Image from 'next/image';
import { API_AUTH_URL } from "@/app/utils/config";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";

interface RightBarprops {
    canvasshow: boolean,
    setCanvasShow: (value: boolean) => void
}
const RightBar: React.FC<RightBarprops> = ({ canvasshow, setCanvasShow }) => {
    const { selectUser, setSelectUser } = useUser();
    const router = useRouter();
    const signout = async () => {
        try {
            await axios.get(`${API_AUTH_URL}/logout`, {
                withCredentials: true
            })
            Cookies.remove("logged_user");
            router.push(("/user/login"))
            setSelectUser(null);
            setCanvasShow(false)
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <Offcanvas show={canvasshow} onHide={() => setCanvasShow(false)} placement="end">
            <div className="d-flex justify-content-between align-items-center px-3 py-2">
                <div>
                    <p className="fs-3 fw-bold m-0">Hey!</p>
                </div>
                {selectUser !== null && (
                    <div className="d-flex align-items-center gap-2">
                        <Image src="/user.jpg" alt="user" height={50} width={50} style={{ borderRadius: "50%" }}/>
                        <button className="sign_outBtn py-1" onClick={signout}>Sign out</button>
                    </div>
                )}
            </div>
        </Offcanvas>
    )
}

export default RightBar;