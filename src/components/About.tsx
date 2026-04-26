import { Instagram, Youtube, Linkedin, Github, Code2, Rocket, Heart, Zap, Layout } from 'lucide-react';

const About = () => {
    const socials = [
        { icon: <Instagram size={20} />, link: "https://www.instagram.com/pncoder/", color: "hover:text-pink-500" },
        { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/pankaj-kumar-838902253/", color: "hover:text-blue-600" },
        { icon: <Youtube size={20} />, link: "https://www.youtube.com/channel/UC82YNsT-1UqkQlo-_um4Jcg", color: "hover:text-red-500" },
        { icon: <Github size={20} />, link: "https://github.com/pankaj800226", color: "hover:text-slate-900" },
    ];

    return (
        <section className="bg-[#fcfdff] py-24 px-6 md:px-12 font-['Plus_Jakarta_Sans'] relative overflow-hidden">
            {/* Soft Ambient Background Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-purple-100 rounded-full blur-[100px] opacity-40" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Left Side: NextThink Mission */}
                <div className="space-y-10 relative z-10">
                    <div>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-6">
                            <Rocket size={14} className="animate-pulse" /> The NextThink Vision
                        </span>
                        <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-8">
                            Organize everything <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                                in one place.
                            </span>
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                            Write, plan, and track — all in one distraction-free workspace. 
                            Our mission is to help you reach peak potential by keeping your 
                            tasks, notes, and projects in perfect order.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="group p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                                <Zap size={20} />
                            </div>
                            <h4 className="font-bold text-slate-900 text-lg">Fast Innovation</h4>
                            <p className="text-sm text-slate-500">Built for speed and seamless performance.</p>
                        </div>
                        <div className="group p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                                <Layout size={20} />
                            </div>
                            <h4 className="font-bold text-slate-900 text-lg">Pure Focus</h4>
                            <p className="text-sm text-slate-500">A workspace that adapts to your thinking.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Founder Profile Card */}
                <div className="relative flex justify-center lg:justify-end">
                    <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(79,70,229,0.15)] w-full max-w-[420px]">
                        <div className="flex flex-col items-center text-center">
                            
                            {/* Animated Profile Frame */}
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2rem] blur-lg opacity-30 animate-pulse" />
                                <div className="relative w-36 h-36 rounded-[2rem] bg-gradient-to-tr from-indigo-600 to-purple-600 p-[3px] rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="w-full h-full rounded-[1.85rem] bg-white flex items-center justify-center overflow-hidden">
                                        <span className="text-5xl font-black bg-gradient-to-tr from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            PK
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">Pankaj Kumar</h3>
                            <p className="text-indigo-600 font-bold mb-6 flex items-center gap-2 bg-indigo-50 px-4 py-1 rounded-full text-sm">
                                <Code2 size={16} /> Founder & Full Stack Developer
                            </p>

                            <p className="text-slate-500 text-[15px] leading-relaxed mb-10">
                                Passionate about crafting high-performance web applications 
                                like <b>NextThink</b> and empowering creators through 
                                high-quality technical content.
                            </p>

                            {/* Social Icons with Tooltips Style */}
                            <div className="flex gap-4">
                                {socials.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 transition-all duration-300 ${social.color} hover:bg-white hover:shadow-xl hover:-translate-y-2`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
                </div>
            </div>

            {/* Bottom Footer Quote */}
            <div className="mt-32 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium shadow-xl shadow-slate-200">
                    Made with <Heart size={16} className="text-red-500 fill-red-500 animate-bounce" /> by Pankaj Kumar © 2026
                </div>
            </div>
        </section>
    );
};

export default About;