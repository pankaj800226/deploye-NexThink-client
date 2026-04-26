import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { api } from "../../api/api"
import toast from "react-hot-toast"
import ApiError from "../../components/ApiError"
import Loading from "../../components/Loading"
import CoverImg from "../Analyze/CoverImg"
import { motion } from "framer-motion"
import {
    ArrowBack,
    Edit,
    Delete,
    CalendarToday,
    AccessTime,
    Category,
    Flag,
    Assignment,
    Description,
    AttachMoney,
    Share,
    ContentCopy,
    WhatsApp,
    Email,
    LinkedIn,
    Twitter,
    Close,
    CheckCircle
} from "@mui/icons-material"
import {
    Button,
    Divider,
    Tooltip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
} from "@mui/material"

interface Todo {
    _id: string
    title: string
    description: string
    price: number
    category: string
    priority: string
    status: string
    createdAt?: string
    updatedAt?: string
}

const TodoDetails = () => {
    const [todoDetails, setTodoDetails] = useState<Todo | null>(null)
    const { id } = useParams()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('')
    const [shareDialogOpen, setShareDialogOpen] = useState(false)
    const [emailShare, setEmailShare] = useState('')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                setLoader(true)
                const res = await axios.get(`${api}/api/todo/getTaskId/${id}`)
                setTodoDetails(res.data)
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong')
                setError("Api fetching error")
            } finally {
                setLoader(false)
            }
        }
        fetchTodo()
    }, [id])

    const priorityConfig = {
        High: { color: "#EF4444", bg: "#FEF2F2", icon: "🔴", label: "High Priority" },
        Medium: { color: "#F59E0B", bg: "#FFFBEB", icon: "🟡", label: "Medium Priority" },
        Low: { color: "#10B981", bg: "#ECFDF5", icon: "🟢", label: "Low Priority" }
    }

    const statusConfig = {
        pending: { color: "#F59E0B", bg: "#FFFBEB", icon: "⏳", label: "Pending" },
        inprogress: { color: "#3B82F6", bg: "#EFF6FF", icon: "🔄", label: "In Progress" },
        completed: { color: "#10B981", bg: "#ECFDF5", icon: "✅", label: "Completed" }
    }

    const getPriorityInfo = (priority: string) => {
        return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.Medium
    }

    const getStatusInfo = (status: string) => {
        return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Not available"
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Get current page URL
    const getShareUrl = () => {
        return window.location.href
    }

    // Get share text
    const getShareText = () => {
        return `Check out this task: ${todoDetails?.title}\n\nStatus: ${getStatusInfo(todoDetails?.status || '').label}\nPriority: ${todoDetails?.priority}\n\nView details: ${getShareUrl()}`
    }

    // Copy link to clipboard
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(getShareUrl())
            setCopied(true)
            toast.success("Link copied to clipboard!")
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error("Failed to copy link")
        }
    }

    // Share via WhatsApp
    const shareViaWhatsApp = () => {
        const text = encodeURIComponent(getShareText())
        window.open(`https://wa.me/?text=${text}`, '_blank')
        setShareDialogOpen(false)
        toast.success("Opening WhatsApp...")
    }

    // Share via Email
    const shareViaEmail = () => {
        if (!emailShare) {
            toast.error("Please enter an email address")
            return
        }
        const subject = encodeURIComponent(`Task: ${todoDetails?.title}`)
        const body = encodeURIComponent(getShareText())
        window.open(`mailto:${emailShare}?subject=${subject}&body=${body}`, '_blank')
        setShareDialogOpen(false)
        setEmailShare('')
        toast.success("Opening email client...")
    }

    // Share via LinkedIn
    const shareViaLinkedIn = () => {
        const url = encodeURIComponent(getShareUrl())
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
        setShareDialogOpen(false)
        toast.success("Opening LinkedIn...")
    }

    // Share via Twitter
    const shareViaTwitter = () => {
        const text = encodeURIComponent(`Check out this task: ${todoDetails?.title}`)
        const url = encodeURIComponent(getShareUrl())
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
        setShareDialogOpen(false)
        toast.success("Opening Twitter...")
    }

    // Native Web Share API (for mobile devices)
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: todoDetails?.title,
                    text: `Task: ${todoDetails?.title} - Priority: ${todoDetails?.priority} - Status: ${getStatusInfo(todoDetails?.status || '').label}`,
                    url: getShareUrl(),
                })
                toast.success("Shared successfully!")
            } catch (err) {
                console.log("Share cancelled or failed")
            }
        } else {
            setShareDialogOpen(true)
        }
    }

    // Delete task
    const handleDelete = async () => {
        if (!todoDetails) return
        try {
            await axios.delete(`${api}/api/todo/deleteTask/${todoDetails._id}`)
            toast.success("Task deleted successfully!")
            // Navigate back to manage todo page after short delay
            setTimeout(() => {
                window.location.href = '/managetodo'
            }, 1500)
        } catch (error) {
            toast.error("Failed to delete task")
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, duration: 0.5 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    }

    if (error) return <ApiError error={error} />
    if (loader) return <Loading />

    return (
        <div className="todo-details-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

                .todo-details-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
                    font-family: 'Inter', sans-serif;
                }

                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #F1F3F5;
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb {
                    background: #D1D5DB;
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #9CA3AF;
                }

                .todo-card {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 24px 40px;
                }

                .nav-bar {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 20px 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .todo-header {
                    background: white;
                    border-radius: 24px;
                    padding: 32px;
                    margin-bottom: 24px;
                    border: 1px solid #E5E7EB;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                }

                .todo-header h1 {
                    font-size: 32px;
                    font-weight: 700;
                    color: #1F2937;
                    margin: 0 0 16px 0;
                    line-height: 1.3;
                }

                .header-meta {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    flex-wrap: wrap;
                    margin-top: 16px;
                    padding-top: 16px;
                    border-top: 1px solid #F3F4F6;
                }

                .todo-info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 20px;
                    margin-bottom: 24px;
                }

                .info-card {
                    background: white;
                    border-radius: 20px;
                    padding: 20px;
                    border: 1px solid #E5E7EB;
                    transition: all 0.3s ease;
                }

                .info-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                    border-color: #C7D2FE;
                }

                .info-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: #6B7280;
                    margin-bottom: 12px;
                }

                .info-value {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1F2937;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .info-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 600;
                }

                .description-card {
                    background: white;
                    border-radius: 20px;
                    padding: 32px;
                    border: 1px solid #E5E7EB;
                    margin-bottom: 24px;
                }

                .description-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    padding-bottom: 16px;
                    border-bottom: 2px solid #F3F4F6;
                }

                .description-header h3 {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1F2937;
                    margin: 0;
                }

                .description-content {
                    font-size: 15px;
                    line-height: 1.7;
                    color: #4B5563;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    font-family: inherit;
                }

                .share-buttons {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin: 20px 0;
                }

                .share-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 1px solid #E5E7EB;
                    background: white;
                }

                .share-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                @media (max-width: 768px) {
                    .todo-card {
                        padding: 0 16px 32px;
                    }

                    .todo-header {
                        padding: 24px;
                    }

                    .todo-header h1 {
                        font-size: 24px;
                    }

                    .info-value {
                        font-size: 20px;
                    }

                    .description-card {
                        padding: 24px;
                    }

                    .nav-bar {
                        flex-direction: column;
                        align-items: stretch;
                    }
                }

                @media (max-width: 480px) {
                    .todo-info-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <main>
                <CoverImg />

                {/* Navigation Bar */}
                <div className="nav-bar">
                    <Link to="/managetodo">
                        <Button
                            startIcon={<ArrowBack />}
                            sx={{
                                borderRadius: '10px',
                                textTransform: 'none',
                                color: '#4B5563',
                                '&:hover': {
                                    backgroundColor: '#F3F4F6'
                                }
                            }}
                        >
                            Back to Tasks
                        </Button>
                    </Link>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Tooltip title="Share Task">
                            <Button
                                startIcon={<Share />}
                                onClick={handleNativeShare}
                                sx={{
                                    borderRadius: '10px',
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                                    color: 'white',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(79,70,229,0.3)'
                                    }
                                }}
                            >
                                Share
                            </Button>
                        </Tooltip>

                        <Tooltip title="Copy Link">
                            <IconButton
                                onClick={handleCopyLink}
                                sx={{
                                    color: copied ? '#10B981' : '#6B7280',
                                    backgroundColor: '#F9FAFB',
                                    '&:hover': { backgroundColor: '#F3F4F6' }
                                }}
                            >
                                {copied ? <CheckCircle sx={{ fontSize: 20 }} /> : <ContentCopy sx={{ fontSize: 20 }} />}
                            </IconButton>
                        </Tooltip>

                        {todoDetails && (
                            <>
                                <Link to={`/todoEdit/${todoDetails._id}`}>
                                    <Button
                                        startIcon={<Edit />}
                                        variant="outlined"
                                        sx={{
                                            borderRadius: '10px',
                                            textTransform: 'none',
                                            borderColor: '#E5E7EB',
                                            color: '#4B5563',
                                            '&:hover': {
                                                borderColor: '#4F46E5',
                                                backgroundColor: '#EEF2FF',
                                                color: '#4F46E5'
                                            }
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    startIcon={<Delete />}
                                    onClick={handleDelete}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        borderColor: '#FEE2E2',
                                        color: '#EF4444',
                                        '&:hover': {
                                            borderColor: '#EF4444',
                                            backgroundColor: '#FEF2F2'
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {todoDetails && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="todo-card"
                    >
                        {/* Header Section */}
                        <motion.div variants={itemVariants} className="todo-header">
                            <h1>{todoDetails.title}</h1>
                            <div className="header-meta">
                                <div className="flex items-center gap-2">
                                    <CalendarToday sx={{ fontSize: 14, color: '#9CA3AF' }} />
                                    <span className="text-xs text-gray-500">
                                        Created: {formatDate(todoDetails.createdAt)}
                                    </span>
                                </div>
                                {todoDetails.updatedAt && todoDetails.updatedAt !== todoDetails.createdAt && (
                                    <div className="flex items-center gap-2">
                                        <AccessTime sx={{ fontSize: 14, color: '#9CA3AF' }} />
                                        <span className="text-xs text-gray-500">
                                            Updated: {formatDate(todoDetails.updatedAt)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Info Grid */}
                        <div className="todo-info-grid">
                            <motion.div variants={itemVariants} className="info-card">
                                <div className="info-label">
                                    <AttachMoney sx={{ fontSize: 16 }} />
                                    Price
                                </div>
                                <div className="info-value">
                                    ₹ {todoDetails.price}
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="info-card">
                                <div className="info-label">
                                    <Category sx={{ fontSize: 16 }} />
                                    Category
                                </div>
                                <div className="info-value">
                                    <span className="info-badge" style={{
                                        backgroundColor: todoDetails.category === 'Work' ? '#EEF2FF' :
                                            todoDetails.category === 'Personal' ? '#FEF3C7' : '#E0F2FE',
                                        color: todoDetails.category === 'Work' ? '#4F46E5' :
                                            todoDetails.category === 'Personal' ? '#D97706' : '#0284C7'
                                    }}>
                                        {todoDetails.category === 'Work' ? '💼' :
                                            todoDetails.category === 'Personal' ? '🏠' : '📚'} {todoDetails.category}
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="info-card">
                                <div className="info-label">
                                    <Flag sx={{ fontSize: 16 }} />
                                    Priority
                                </div>
                                <div className="info-value">
                                    <span className="info-badge" style={{
                                        backgroundColor: getPriorityInfo(todoDetails.priority).bg,
                                        color: getPriorityInfo(todoDetails.priority).color
                                    }}>
                                        {getPriorityInfo(todoDetails.priority).icon} {todoDetails.priority}
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="info-card">
                                <div className="info-label">
                                    <Assignment sx={{ fontSize: 16 }} />
                                    Status
                                </div>
                                <div className="info-value">
                                    <span className="info-badge" style={{
                                        backgroundColor: getStatusInfo(todoDetails.status).bg,
                                        color: getStatusInfo(todoDetails.status).color
                                    }}>
                                        {getStatusInfo(todoDetails.status).icon} {getStatusInfo(todoDetails.status).label}
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Description Section */}
                        <motion.div variants={itemVariants} className="description-card">
                            <div className="description-header">
                                <Description sx={{ fontSize: 22, color: '#4F46E5' }} />
                                <h3>Description</h3>
                            </div>
                            <div className="description-content">
                                {todoDetails.description ? (
                                    todoDetails.description
                                ) : (
                                    <span className="text-gray-400 italic">No description provided</span>
                                )}
                            </div>
                        </motion.div>

                        {/* Share Dialog */}
                        <Dialog
                            open={shareDialogOpen}
                            onClose={() => setShareDialogOpen(false)}
                            maxWidth="sm"
                            fullWidth
                            PaperProps={{
                                sx: {
                                    borderRadius: '20px',
                                    padding: '8px'
                                }
                            }}
                        >
                            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700 }}>Share Task</span>
                                <IconButton onClick={() => setShareDialogOpen(false)} size="small">
                                    <Close />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <div className="share-buttons">
                                    <div className="share-btn" onClick={shareViaWhatsApp}>
                                        <WhatsApp sx={{ fontSize: 32, color: '#25D366' }} />
                                        <span style={{ fontSize: 12 }}>WhatsApp</span>
                                    </div>
                                    <div className="share-btn" onClick={shareViaTwitter}>
                                        <Twitter sx={{ fontSize: 32, color: '#1DA1F2' }} />
                                        <span style={{ fontSize: 12 }}>Twitter</span>
                                    </div>
                                    <div className="share-btn" onClick={shareViaLinkedIn}>
                                        <LinkedIn sx={{ fontSize: 32, color: '#0077B5' }} />
                                        <span style={{ fontSize: 12 }}>LinkedIn</span>
                                    </div>
                                </div>

                                <Divider sx={{ my: 2 }}>OR</Divider>

                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    placeholder="friend@example.com"
                                    value={emailShare}
                                    onChange={(e) => setEmailShare(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<Email />}
                                    onClick={shareViaEmail}
                                    sx={{
                                        background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                                        borderRadius: '10px',
                                        textTransform: 'none'
                                    }}
                                >
                                    Share via Email
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </motion.div>
                )}
            </main>
        </div>
    )
}

export default TodoDetails