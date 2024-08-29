import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, MenuIcon, XIcon, MoonIcon, SunIcon, ArrowUpIcon, ExternalLinkIcon } from 'lucide-react'

const TypedEffect = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return <span>{`${words[index].substring(0, subIndex)}${subIndex === words[index].length ? '|' : ''}`}</span>;
};

const SkillBar = ({ skill, level }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium">{skill}</span>
      <span className="text-sm font-medium">{level}%</span>
    </div>
    <div className="w-full bg-secondary rounded-full h-2.5">
      <motion.div 
        className="bg-primary h-2.5 rounded-full" 
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);

const ProjectCard = ({ project, openModal }) => (
  <Card className="cursor-pointer transition-all hover:shadow-lg" onClick={() => openModal(project)}>
    <CardHeader>
      <CardTitle>{project.title}</CardTitle>
      <CardDescription>{project.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="secondary">{tech}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const TimelineItem = ({ year, title, description }) => (
  <div className="mb-8 flex justify-between items-center w-full right-timeline">
    <div className="order-1 w-5/12"></div>
    <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
      <h1 className="mx-auto font-semibold text-lg text-primary-foreground">{year}</h1>
    </div>
    <div className="order-1 bg-secondary rounded-lg shadow-xl w-5/12 px-6 py-4">
      <h3 className="mb-3 font-bold text-primary text-xl">{title}</h3>
      <p className="text-sm leading-snug tracking-wide text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function NishantPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projects = [
    { 
      title: 'E-commerce Platform', 
      description: 'A full-stack e-commerce solution with advanced features', 
      technologies: ['React', 'Node.js', 'MongoDB', 'Redux'],
      fullDescription: 'Developed a comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, and secure payment integration. Implemented real-time inventory updates and order tracking to enhance user experience.',
      link: 'https://example.com/ecommerce'
    },
    { 
      title: 'Task Management App', 
      description: 'A productivity app for efficient task organization', 
      technologies: ['React Native', 'Firebase', 'Redux'],
      fullDescription: 'Created a cross-platform mobile application for task management, featuring real-time synchronization, push notifications, and offline support. Implemented drag-and-drop functionality for easy task prioritization and calendar integration for deadline management.',
      link: 'https://example.com/taskapp'
    },
    { 
      title: 'Portfolio Website', 
      description: 'A performant and SEO-optimized personal portfolio', 
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      fullDescription: 'Designed and developed a high-performance portfolio website using Next.js for server-side rendering. Implemented advanced SEO techniques, image optimization, and lazy loading for optimal user experience. Integrated a custom CMS for easy content management.',
      link: 'https://example.com/portfolio'
    },
    { 
      title: 'Analytics Dashboard', 
      description: 'A data visualization tool for business intelligence', 
      technologies: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL'],
      fullDescription: 'Built a comprehensive analytics dashboard for visualizing complex business data. Implemented real-time data updates, interactive charts and graphs, and customizable report generation. Integrated machine learning algorithms for predictive analytics and trend forecasting.',
      link: 'https://example.com/dashboard'
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-2xl">Nishant</span>
          </a>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" href="#about">About</Button>
            <Button variant="ghost" href="#skills">Skills</Button>
            <Button variant="ghost" href="#projects">Projects</Button>
            <Button variant="ghost" href="#experience">Experience</Button>
            <Button variant="ghost" href="#contact">Contact</Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background shadow-lg p-6 md:hidden"
          >
            <nav className="flex flex-col space-y-4">
              <Button variant="ghost" href="#about" onClick={toggleMenu}>About</Button>
              <Button variant="ghost" href="#skills" onClick={toggleMenu}>Skills</Button>
              <Button variant="ghost" href="#projects" onClick={toggleMenu}>Projects</Button>
              <Button variant="ghost" href="#experience" onClick={toggleMenu}>Experience</Button>
              <Button variant="ghost" href="#contact" onClick={toggleMenu}>Contact</Button>
              <Button variant="ghost" onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
                toggleMenu();
              }}>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4">
        <section id="about" className="py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-4">
              Hi, I'm Nishant
            </h1>
            <h2 className="text-3xl font-bold text-primary mb-6">
              I'm a <TypedEffect words={['Full-Stack Developer', 'UI/UX Enthusiast', 'Problem Solver']} />
            </h2>
            <p className="max-w-[700px] text-xl text-muted-foreground mb-8">
              With over 5 years of experience in web development, I specialize in creating scalable, efficient, and user-friendly applications. My passion lies in solving complex problems and turning ideas into reality through code.
            </p>
            <div className="flex space-x-4">
              <Button size="lg">Download CV</Button>
              <Button size="lg" variant="outline">Contact Me</Button>
            </div>
          </motion.div>
        </section>
        
        <section id="skills" className="py-24">
          <h2 className="text-3xl font-bold mb-12">Skills & Expertise</h2>
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="technical">Technical Skills</TabsTrigger>
              <TabsTrigger value="soft">Soft Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="technical">
              <div className="grid md:grid-cols-2 gap-8">
                <SkillBar skill="JavaScript/TypeScript" level={95} />
                <SkillBar skill="React/Next.js" level={90} />
                <SkillBar skill="Node.js/Express" level={85} />
                <SkillBar skill="SQL/NoSQL Databases" level={80} />
                <SkillBar skill="GraphQL" level={75} />
                <SkillBar skill="DevOps/CI/CD" level={70} />
              </div>
            </TabsContent>
            <TabsContent value="soft">
              <div className="grid md:grid-cols-2 gap-8">
                <SkillBar skill="Problem Solving" level={95} />
                <SkillBar skill="Team Collaboration" level={90} />
                <SkillBar skill="Communication" level={85} />
                <SkillBar skill="Adaptability" level={90} />
                <SkillBar skill="Project Management" level={80} />
                <SkillBar skill="Mentoring" level={75} />
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        <section id="projects" className="py-24">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} openModal={openModal} />
            ))}
          </div>
        </section>

        <section id="experience" className="py-24">
          <h2 className="text-3xl font-bold mb-12">Professional Experience</h2>
          <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden p-10 h-full">
              <div className="border-2-2 absolute border-opacity-20 border-primary h-full border" style={{left: '50%'}}></div>
              <TimelineItem 
                year="2021"
                title="Senior Full-Stack Developer at TechCorp"
                description="Led a team of developers in creating a large-scale SaaS platform. Implemented microservices architecture and improved system performance by 40%."
              />
              <TimelineItem 
                year="2019"
                title="Full-Stack Developer at WebSolutions Inc."
                description="Developed and maintained multiple client projects using React and Node.js. Introduced automated testing, reducing bug reports by 30%."
              />
              <TimelineItem 
                year="2017"
                title="Junior Developer at StartUp Labs"
                description="Contributed to the development of a real-time analytics dashboard. Gained expertise in front-end technologies and agile methodologies."
              />
            </div>
          </div>
        </section>
        
        <section id="contact" className="py-24">
          <h2 className="text-3xl font-bold mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-xl text-muted-foreground">
                I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <GithubIcon className="h-8 w