'use client';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
    const router = useRouter();
    return (
        <button
            className="admin_city_add"
            style={{ cursor: "pointer" }}
            onClick={() => router.back()}
        >
            Back
        </button>
    )
};

export default BackButton;