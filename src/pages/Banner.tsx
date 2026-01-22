import { Button } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <motion.div className="notion_section">
            {/* Background Blobs */}
            <div className="bg_blob blob1"></div>
            <div className="bg_blob blob2"></div>
            <div className="bg_blob blob3"></div>

            <div className="notion_container">
                {/* Left Content */}
                <div className="notion_left">
                    <h2>Organize everything in one place</h2>
                    <p>
                        Write, plan, track.
                        NextThink gives you a distraction-free workspace
                        to manage tasks, notes and projects and ect.
                    </p>

                    <ul>
                        <li>✨ Clean task management</li>
                        <li>✨ Work Shedular</li>
                        <li>✨ Timer Learning Focus</li>
                        <li>✨ Smart Project Management</li>
                        
                    </ul>

                    <Link to={'/dashboard'}>
                        <Button startIcon={<ArrowRightAlt />} className="start_btn">
                            💕 Get Started
                        </Button>
                    </Link>
                </div>

                {/* Right Mock Editor */}
                <div className="notion_right">
                    <div className="editor_card">
                        <div className="editor_header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>

                        <div className="editor_body">
                            <div className="line title">📄 Daily Planning</div>
                            <div className="line">- Review yesterday’s tasks</div>
                            <div className="line">- Plan top 3 priorities</div>
                            <div className="line">- Deep work session</div>
                            <div className="line">- Evening reflection</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Banner;
