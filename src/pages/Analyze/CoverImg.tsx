import { Upload } from "@mui/icons-material";
import { Button } from "@mui/material";
import coverImg from "../../assets/cover.jpg";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";

interface Cover {
    _id: string
    coverPhoto: string
}

const CoverImg = () => {

    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false);
    const token = localStorage.getItem('TOKEN')
    const [covers, setCovers] = useState<Cover | null>(null)

    // fetch cover image 
    const fetchCover = async () => {
        try {
            const res = await axios.get(`${api}/api/coverImg/getImg`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setCovers(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCover()
    }, [])


    // handle image file
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        const maxSize = 1 * 1024 * 1024; // 1 MB in bytes

        if (selectedFile.size > maxSize) {
            toast("File size must be less than 1 MB");
            e.target.value = ""; // reset input
            return;
        }

        setFile(selectedFile);
    };


    // handle cover image
    useEffect(() => {
        if (!file) return
        const handleUpload = async () => {
            try {
                setUploading(true);

                const formData = new FormData()
                formData.append('file', file)

                await axios.post(`${api}/api/coverImg/cover/photo`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                toast.success("Cover img upload")
                setFile(null)
                fetchCover()
            } catch (error) {
                console.log(error);
                toast.error("error")

            } finally {
                setUploading(false)
            }

        }

        handleUpload()
    }, [file])




    return (
        <div className="relative w-full h-[200px] md:h-[280px] overflow-hidden group z-0">
            {/* Main Image */}
            <img
                src={covers?.coverPhoto || coverImg}
                alt="cover"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay - Iska z-index high rakha hai */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-10 flex items-end justify-end p-4 md:p-8">

                <Button
                    className="!bg-white/90 !backdrop-blur-md !text-slate-700 !normal-case !text-xs md:!text-sm !font-semibold !px-4 !py-1.5 !rounded-lg !shadow-lg !border !border-gray-200 !transition-all !duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                    component="label"
                    disabled={uploading}
                    sx={{
                        // Inline style to force visibility on hover if Tailwind classes struggle
                        '&:hover': { backgroundColor: 'white !important' }
                    }}
                >
                    <Upload className="mr-2 !text-[18px]" />
                    {uploading ? "Uploading..." : "Change cover"}
                    <input
                        onChange={handleFile}
                        hidden
                        type="file"
                        accept="image/*"
                    />
                </Button>
            </div>
        </div>
    );
};

export default CoverImg;
