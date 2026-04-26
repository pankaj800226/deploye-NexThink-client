import { Delete, Edit, Visibility, Search, Add, Clear, CheckCircle, Schedule, Flag, Category, FilterAlt } from "@mui/icons-material";
import { Button, MenuItem, TextField, Typography, Chip, IconButton, InputAdornment, Select, FormControl, InputLabel, Paper, Tooltip, Pagination, useMediaQuery, useTheme, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "../../hook/useDebounceSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../api/api";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import ApiError from "../../components/ApiError";

// Types
export interface TaskProps {
    _id: string;
    title: string;
    description: string;
    category: string;
    priority: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

const ManageTodo = () => {
    const [allTask, setAllTask] = useState<TaskProps[]>([]);
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [prioritySelect, setPrioritySelect] = useState('');
    const [statusSelect, setStatusSelect] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [sortBy, setSortBy] = useState('newest');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const debouncingSearch = useDebounce(search, 500);

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem('TOKEN');
            if (!token) return;
            try {
                setLoader(true);
                const res = await axios.get(`${api}/api/todo/getTask?page=${page}&limit=${isMobile ? 5 : 10}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAllTask(res.data.findTask);
                setTotalPage(res.data.totalPage);
            } catch (error) {
                setError("Api Fetching Error");
            } finally {
                setLoader(false);
            }
        };
        fetchTask();
    }, [page, isMobile]);

    const filteredTasks = allTask
        .filter((task) =>
            task.title.toLowerCase().includes(debouncingSearch.toLowerCase()) ||
            task.description?.toLowerCase().includes(debouncingSearch.toLowerCase())
        )
        .filter((task) => !categorySelect || task.category === categorySelect)
        .filter((task) => !prioritySelect || task.priority === prioritySelect)
        .filter((task) => !statusSelect || task.status === statusSelect)
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            if (sortBy === 'oldest') return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
            if (sortBy === 'az') return a.title.localeCompare(b.title);
            if (sortBy === 'za') return b.title.localeCompare(a.title);
            return 0;
        });

    const handleDeleteTask = async (id: string) => {
        try {
            await axios.delete(`${api}/api/todo/deleteTask/${id}`);
            setAllTask((prev) => prev.filter((t) => t._id !== id));
            toast.success("Task Deleted Successfully");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const clearFilters = () => {
        setCategorySelect('');
        setPrioritySelect('');
        setStatusSelect('');
        setSearch('');
        setSortBy('newest');
        setMobileFilterOpen(false);
    };

    const activeFiltersCount = [categorySelect, prioritySelect, statusSelect, search].filter(Boolean).length;

    if (loader) return <Loading />;
    if (error) return <ApiError error={error} />;

    return (
        <div className="manage-todo-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

                .manage-todo-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
                    font-family: 'Inter', sans-serif;
                }

                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
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

                /* Card Hover Effects */
                .task-card {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .task-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
                }

                /* Grid View */
                .task-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 16px;
                }

                .task-grid-card {
                    background: white;
                    border-radius: 16px;
                    padding: 16px;
                    border: 1px solid #E5E7EB;
                    transition: all 0.3s ease;
                }

                .task-grid-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
                    border-color: #C7D2FE;
                }

                /* Responsive */
                @media (max-width: 640px) {
                    .task-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }

                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .action-buttons {
                        flex-direction: column;
                        width: 100%;
                    }
                    
                    .action-buttons button {
                        width: 100%;
                    }
                }

                /* Line clamp for text */
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                Task Management
                            </h1>
                            <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">
                                Organize, track, and manage all your tasks in one place
                            </p>
                        </div>
                        <Link to="/createTodo">
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                fullWidth={isSmallMobile}
                                sx={{
                                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 2.5,
                                    py: 0.8,
                                    fontSize: { xs: '13px', sm: '14px' },
                                    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)'
                                    }
                                }}
                            >
                                Create New Task
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 stats-grid">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs sm:text-sm">Total Tasks</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900">{allTask.length}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-indigo-600" sx={{ fontSize: { xs: 16, sm: 20 } }} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs sm:text-sm">Completed</p>
                                <p className="text-xl sm:text-2xl font-bold text-green-600">{allTask.filter(t => t.status === 'completed').length}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-green-600" sx={{ fontSize: { xs: 16, sm: 20 } }} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs sm:text-sm">In Progress</p>
                                <p className="text-xl sm:text-2xl font-bold text-blue-600">{allTask.filter(t => t.status === 'inprogress').length}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                <Schedule className="text-blue-600" sx={{ fontSize: { xs: 16, sm: 20 } }} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs sm:text-sm">High Priority</p>
                                <p className="text-xl sm:text-2xl font-bold text-red-600">{allTask.filter(t => t.priority === 'High').length}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-xl flex items-center justify-center">
                                <Flag className="text-red-600" sx={{ fontSize: { xs: 16, sm: 20 } }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Bar - Desktop */}
                {!isMobile && (
                    <Paper elevation={0} className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                            <TextField
                                placeholder="Search tasks by title or description..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search className="text-gray-400" sx={{ fontSize: 18 }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: search && (
                                        <InputAdornment position="end">
                                            <IconButton size="small" onClick={() => setSearch('')}>
                                                <Clear sx={{ fontSize: 14 }} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: '10px',
                                        backgroundColor: '#F9FAFB',
                                        fontSize: '14px'
                                    }
                                }}
                                sx={{ flex: 2 }}
                            />

                            <div className="flex gap-2 flex-wrap">
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={categorySelect}
                                        onChange={(e) => setCategorySelect(e.target.value)}
                                        label="Category"
                                        sx={{ borderRadius: '8px', backgroundColor: '#F9FAFB' }}
                                    >
                                        <MenuItem value="">All Categories</MenuItem>
                                        <MenuItem value="Work">💼 Work</MenuItem>
                                        <MenuItem value="Personal">🏠 Personal</MenuItem>
                                        <MenuItem value="Study">📚 Study</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        value={prioritySelect}
                                        onChange={(e) => setPrioritySelect(e.target.value)}
                                        label="Priority"
                                        sx={{ borderRadius: '8px', backgroundColor: '#F9FAFB' }}
                                    >
                                        <MenuItem value="">All Priorities</MenuItem>
                                        <MenuItem value="High">🔴 High</MenuItem>
                                        <MenuItem value="Medium">🟡 Medium</MenuItem>
                                        <MenuItem value="Low">🟢 Low</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={statusSelect}
                                        onChange={(e) => setStatusSelect(e.target.value)}
                                        label="Status"
                                        sx={{ borderRadius: '8px', backgroundColor: '#F9FAFB' }}
                                    >
                                        <MenuItem value="">All Status</MenuItem>
                                        <MenuItem value="pending">⏳ Pending</MenuItem>
                                        <MenuItem value="inprogress">🔄 In Progress</MenuItem>
                                        <MenuItem value="completed">✅ Completed</MenuItem>
                                    </Select>
                                </FormControl>

                                {(activeFiltersCount > 0) && (
                                    <Button
                                        onClick={clearFilters}
                                        startIcon={<Clear />}
                                        size="small"
                                        sx={{ borderRadius: '8px', textTransform: 'none', color: '#6B7280' }}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </div>

                        {activeFiltersCount > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                                {search && (
                                    <Chip
                                        label={`Search: ${search}`}
                                        onDelete={() => setSearch('')}
                                        size="small"
                                        sx={{ borderRadius: '6px', height: '28px', fontSize: '11px' }}
                                    />
                                )}
                                {categorySelect && (
                                    <Chip
                                        label={`Category: ${categorySelect}`}
                                        onDelete={() => setCategorySelect('')}
                                        size="small"
                                        sx={{ borderRadius: '6px', height: '28px', fontSize: '11px' }}
                                    />
                                )}
                                {prioritySelect && (
                                    <Chip
                                        label={`Priority: ${prioritySelect}`}
                                        onDelete={() => setPrioritySelect('')}
                                        size="small"
                                        sx={{ borderRadius: '6px', height: '28px', fontSize: '11px' }}
                                    />
                                )}
                                {statusSelect && (
                                    <Chip
                                        label={`Status: ${statusSelect}`}
                                        onDelete={() => setStatusSelect('')}
                                        size="small"
                                        sx={{ borderRadius: '6px', height: '28px', fontSize: '11px' }}
                                    />
                                )}
                            </div>
                        )}
                    </Paper>
                )}

                {/* Mobile Search & Filter Bar */}
                {isMobile && (
                    <div className="mb-4 space-y-3">
                        <TextField
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search className="text-gray-400" sx={{ fontSize: 18 }} />
                                    </InputAdornment>
                                ),
                                endAdornment: search && (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => setSearch('')}>
                                            <Clear sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '10px',
                                    backgroundColor: '#F9FAFB',
                                }
                            }}
                        />

                        <div className="flex gap-2">
                            <Button
                                variant="outlined"
                                startIcon={<FilterAlt />}
                                onClick={() => setMobileFilterOpen(true)}
                                fullWidth
                                sx={{
                                    borderRadius: '10px',
                                    textTransform: 'none',
                                    borderColor: '#E5E7EB',
                                    color: '#4B5563',
                                    justifyContent: 'center'
                                }}
                            >
                                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                            </Button>

                            <FormControl size="small" sx={{ minWidth: 110 }}>
                                <Select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    sx={{ borderRadius: '8px', backgroundColor: '#F9FAFB' }}
                                >
                                    <MenuItem value="newest">Newest</MenuItem>
                                    <MenuItem value="oldest">Oldest</MenuItem>
                                    <MenuItem value="az">A to Z</MenuItem>
                                    <MenuItem value="za">Z to A</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                )}

                {/* Mobile Filter Drawer */}
                <Drawer
                    anchor="bottom"
                    open={mobileFilterOpen}
                    onClose={() => setMobileFilterOpen(false)}
                    PaperProps={{
                        sx: {
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                            padding: '20px'
                        }
                    }}
                >
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-4">Filter Tasks</h3>

                        <div className="space-y-3">
                            <FormControl fullWidth size="small">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categorySelect}
                                    onChange={(e) => setCategorySelect(e.target.value)}
                                    label="Category"
                                >
                                    <MenuItem value="">All Categories</MenuItem>
                                    <MenuItem value="Work">💼 Work</MenuItem>
                                    <MenuItem value="Personal">🏠 Personal</MenuItem>
                                    <MenuItem value="Study">📚 Study</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth size="small">
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    value={prioritySelect}
                                    onChange={(e) => setPrioritySelect(e.target.value)}
                                    label="Priority"
                                >
                                    <MenuItem value="">All Priorities</MenuItem>
                                    <MenuItem value="High">🔴 High</MenuItem>
                                    <MenuItem value="Medium">🟡 Medium</MenuItem>
                                    <MenuItem value="Low">🟢 Low</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={statusSelect}
                                    onChange={(e) => setStatusSelect(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="">All Status</MenuItem>
                                    <MenuItem value="pending">⏳ Pending</MenuItem>
                                    <MenuItem value="inprogress">🔄 In Progress</MenuItem>
                                    <MenuItem value="completed">✅ Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button
                                onClick={clearFilters}
                                fullWidth
                                variant="outlined"
                                sx={{ borderRadius: '10px', textTransform: 'none' }}
                            >
                                Clear All
                            </Button>
                            <Button
                                onClick={() => setMobileFilterOpen(false)}
                                fullWidth
                                variant="contained"
                                sx={{
                                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                                    borderRadius: '10px',
                                    textTransform: 'none'
                                }}
                            >
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </Drawer>

                {/* Results Info */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <p className="text-xs sm:text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{filteredTasks.length}</span> of{" "}
                        <span className="font-semibold text-gray-900">{allTask.length}</span> tasks
                    </p>
                    {!isMobile && (
                        <div className="flex items-center gap-2">
                            <Typography variant="body2" className="text-gray-500 text-sm">Sort by:</Typography>
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    sx={{ borderRadius: '8px', backgroundColor: '#F9FAFB' }}
                                >
                                    <MenuItem value="newest">Newest First</MenuItem>
                                    <MenuItem value="oldest">Oldest First</MenuItem>
                                    <MenuItem value="az">A to Z</MenuItem>
                                    <MenuItem value="za">Z to A</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    )}
                </div>

                {/* Task List */}
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl border border-gray-100">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search sx={{ fontSize: { xs: 28, sm: 32 }, color: '#9CA3AF' }} />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
                        <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filters</p>
                        <Button
                            onClick={clearFilters}
                            variant="outlined"
                            sx={{ borderRadius: '10px', textTransform: 'none' }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {filteredTasks.map((todo, index) => (
                                <motion.div
                                    key={todo._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: Math.min(index * 0.03, 0.5) }}
                                    className="task-card bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 hover:border-indigo-200"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 flex-wrap">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                                                        {todo.title}
                                                    </h3>
                                                </div>
                                                <div className="flex gap-1 flex-shrink-0">
                                                    <Tooltip title="Edit">
                                                        <Link to={`/todoEdit/${todo._id}`}>
                                                            <IconButton size="small" sx={{ padding: { xs: 0.5, sm: 1 } }}>
                                                                <Edit sx={{ fontSize: { xs: 16, sm: 18 } }} className="text-gray-400 hover:text-indigo-500" />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton size="small" onClick={() => handleDeleteTask(todo._id)} sx={{ padding: { xs: 0.5, sm: 1 } }}>
                                                            <Delete sx={{ fontSize: { xs: 16, sm: 18 } }} className="text-gray-400 hover:text-red-500" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="View Details">
                                                        <Link to={`/todoDetails/${todo._id}`}>
                                                            <IconButton size="small" sx={{ padding: { xs: 0.5, sm: 1 } }}>
                                                                <Visibility sx={{ fontSize: { xs: 16, sm: 18 } }} className="text-gray-400 hover:text-blue-500" />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                            </div>

                                            {todo.description && (
                                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1 mb-2">
                                                    {todo.description.slice(0, 50)}...
                                                </p>
                                            )}

                                            <div className="flex items-center gap-2 flex-wrap mt-2">
                                                <Chip
                                                    label={todo.status === 'completed' ? 'Completed' : todo.status === 'inprogress' ? 'In Progress' : 'Pending'}
                                                    size="small"
                                                    sx={{
                                                        borderRadius: '6px',
                                                        fontSize: '10px',
                                                        fontWeight: 600,
                                                        height: '24px',
                                                        backgroundColor: todo.status === 'completed' ? '#ECFDF5' :
                                                            todo.status === 'inprogress' ? '#EFF6FF' : '#FFFBEB',
                                                        color: todo.status === 'completed' ? '#10B981' :
                                                            todo.status === 'inprogress' ? '#3B82F6' : '#F59E0B'
                                                    }}
                                                />
                                                <div className="flex items-center gap-1">
                                                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${todo.priority === 'High' ? 'bg-red-500' :
                                                        todo.priority === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'
                                                        }`} />
                                                    <span className="text-xs text-gray-500">{todo.priority}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Category sx={{ fontSize: { xs: 10, sm: 12 }, color: '#9CA3AF' }} />
                                                    <span className="text-xs text-gray-500">{todo.category}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                            <Link to={`/todoDetails/${todo._id}`} className="w-full sm:w-auto">
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth={isSmallMobile}
                                                    sx={{
                                                        borderRadius: '8px',
                                                        textTransform: 'none',
                                                        borderColor: '#E5E7EB',
                                                        color: '#4B5563',
                                                        fontSize: { xs: '11px', sm: '13px' },
                                                        padding: { xs: '4px 12px', sm: '6px 16px' },
                                                        '&:hover': {
                                                            borderColor: '#4F46E5',
                                                            backgroundColor: '#EEF2FF'
                                                        }
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Pagination */}
                {totalPage > 1 && (
                    <div className="mt-8 sm:mt-10 flex justify-center">
                        <Pagination
                            count={totalPage}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                            shape="rounded"
                            size={isSmallMobile ? "small" : "medium"}
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    borderRadius: '8px',
                                    fontWeight: 500,
                                    fontSize: { xs: '12px', sm: '14px' },
                                    padding: { xs: '4px 8px', sm: '6px 12px' }
                                }
                            }}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManageTodo;