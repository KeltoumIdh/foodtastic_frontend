import { useNavigate } from "react-router-dom";

export default function ReturnBackBtn() {

    const navigate = useNavigate();
    
    return (
        <a onClick={() => navigate(-1)} className="mr-2 cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 max-md:w-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
            </svg>
        </a>
    )
}