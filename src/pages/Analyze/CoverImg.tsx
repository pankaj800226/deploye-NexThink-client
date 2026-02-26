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
        <div className="cover-wrapper">
            <img
                src={covers?.coverPhoto || coverImg}
                alt="cover"
                className="cover-img"
            />

            <div className="cover-actions">
                <Button
                    className={`cover-btn edit ${uploading ? "uploading" : ""}`}
                    component="label"
                >
                    <Upload fontSize="small" />
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
