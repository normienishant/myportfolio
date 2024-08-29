'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, MenuIcon, XIcon, MoonIcon, SunIcon, ArrowUpIcon, ExternalLinkIcon } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emailjs from '@emailjs/browser'

const TypedEffect = ({ words }: { words: string[] }) => {
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
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 50, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return <span>{`${words[index].substring(0, subIndex)}${subIndex === words[index].length ? '|' : ''}`}</span>;
};

const SkillBar = ({ skill, level }: { skill: string; level: number }) => (
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

interface Project {
  title: string;
  description: string;
  technologies: string[];
  fullDescription: string;
  link: string;
}

const ProjectCard = ({ project, openModal }: { project: Project; openModal: (project: Project) => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className="cursor-pointer transition-all hover:shadow-lg"
        onClick={() => openModal(project)}
      >
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
    </motion.div>
  );
};

const TimelineItem = ({ year, title, description }: { year: string; title: string; description: string }) => (
  <div className="mb-8 flex justify-between items-center w-full right-timeline">
    <div className="order-1 w-5/12"></div>
    <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-10 h-10 rounded-full">
      <h1 className="mx-auto font-semibold text-sm text-primary-foreground">{year}</h1>
    </div>
    <div className="order-1 bg-secondary rounded-lg shadow-xl w-5/12 px-6 py-4">
      <h3 className="mb-3 font-bold text-primary text-xl">{title}</h3>
      <p className="text-sm leading-snug tracking-wide text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function NishantPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openModal = (project: Project) => setSelectedProject(project);
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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects: Project[] = [
    { 
      title: 'Grievance Tracking & Lodging', 
      description: 'A solution for lodging and tracking grievances.', 
      technologies: ['React', 'Node.js', 'TypeScript'],
      fullDescription: 'Developed a website where you can submit complaints and track their progress.',
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

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, textarea.clientHeight * 1.75)}px`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Form validation
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const result = await emailjs.send(
        'service_rvq2y1q',
        'template_1d59wjo',
        { 
          from_name: name,
          from_email: email,
          message: message,
          to_email: 'nishantkumar161005@gmail.com' 
        },
        'v1T94lUqFk53KQ0up'
      );

      if (result.text === 'OK') {
        toast.success('Your message was sent successfully!');
        (event.target as HTMLFormElement).reset();
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      if (error instanceof Error) {
        toast.error(`Failed to send message: ${error.message}`);
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-2xl">Nishant</span>
          </a>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => scrollToSection('about')}>About</Button>
            <Button variant="ghost" onClick={() => scrollToSection('skills')}>Skills</Button>
            <Button variant="ghost" onClick={() => scrollToSection('projects')}>Projects</Button>
            <Button variant="ghost" onClick={() => scrollToSection('experience')}>Experience</Button>
            <Button variant="ghost" onClick={() => scrollToSection('contact')}>Contact</Button>
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
              <Button variant="ghost" onClick={() => scrollToSection('about')}>About</Button>
              <Button variant="ghost" onClick={() => scrollToSection('skills')}>Skills</Button>
              <Button variant="ghost" onClick={() => scrollToSection('projects')}>Projects</Button>
              <Button variant="ghost" onClick={() => scrollToSection('experience')}>Experience</Button>
              <Button variant="ghost" onClick={() => scrollToSection('contact')}>Contact</Button>
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
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 md:w-1/2 md:pr-8"
            >
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-4">
                Hi, I'm Nishant
              </h1>
              <h2 className="text-3xl font-bold text-primary mb-6">
                I'm a <TypedEffect words={['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver']} />
              </h2>
              <p className="max-w-[700px] text-xl text-muted-foreground mb-8">
                As a student passionate about AI and Machine Learning, I'm dedicated to building scalable, efficient, and user-friendly websites. My focus lies in leveraging technology to solve real-world problems while continuously learning and growing in the field of web development and AI.
              </p>
              <div className="flex space-x-4">
                <a href="https://drive.google.com/file/d/144Vpc9KpRUy4WJkE0Q7aEYCzZjFmL2UU/view" target="_blank" rel="noopener noreferrer">
                  <Button size="lg">View Resume</Button>
                </a>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>Contact Me</Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 md:mt-0 md:w-1/2 flex justify-center md:justify-end"
            >
              <img src="/5.jpg" alt="Nishant" className="rounded-full w-96 h-96 object-cover" />
            </motion.div>
          </div>
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
                <SkillBar skill="Python" level={85} />
                <SkillBar skill="Machine Learning" level={80} />
                <SkillBar skill="Web development" level={90} />
                <SkillBar skill="SQL" level={95} />
                <SkillBar skill="Java" level={80} />
                <SkillBar skill="MERN Stack" level={75} />
              </div>
            </TabsContent>
            <TabsContent value="soft">
              <div className="grid md:grid-cols-2 gap-8">
                <SkillBar skill="Problem Solving" level={90} />
                <SkillBar skill="Team Collaboration" level={90} />
                <SkillBar skill="Communication" level={80} />
                <SkillBar skill="Adaptability" level={80} />
                <SkillBar skill="Project Management" level={75} />
                <SkillBar skill="Mentoring" level={80} />
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
                year="2023"
                title="Student at K.R Mangalam University"
                description="Currently pursuing Bachelors of Technology, Specialization in Artificial Intelligence & Machine Learning (2023-Current)."
              />
              <TimelineItem 
                year="2024"
                title="Participated in 2 hackathons."
                description="Developed a remote voting app, and a website to lodge and track grievances"
              />
              <TimelineItem 
                year="2024"
                title="Currently learning"
                description="Currently learning MERN Stack and programming in Java"
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
                <a href="https://github.com/normienishant" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <GithubIcon className="h-8 w-8" />
                </a>
                <a href="https://www.linkedin.com/in/designsbynishant/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <LinkedinIcon className="h-8 w-8" />
                </a>
                <a href="https://x.com/normienishant?t=VtbJfLdMD0nVXyrSVGZtEQ&s=08" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <TwitterIcon className="h-8 w-8" />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nishantkumar161005@gmail.com&su=Hello%20Nishant&body=I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <MailIcon className="h-8 w-8" />
                </a>
              </div>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input name="name" placeholder="Your Name" aria-label="Your Name" required />
              <Input name="email" type="email" placeholder="Your Email" aria-label="Your Email" required />
              <Textarea 
                name="message" 
                placeholder="Your Message" 
                aria-label="Your Message" 
                required 
                ref={textareaRef}
                onChange={handleTextareaChange}
                className="min-h-[100px] resize-none"
              />
              <Button type="submit" size="lg">Send Message</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Built by Nishant Kumar. View source code on <a href="https://github.com/normienishant" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>
          </p>
          <div className="flex items-center space-x-1">
            <a href="https://github.com/normienishant" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/designsbynishant/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <LinkedinIcon className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://x.com/normienishant?t=VtbJfLdMD0nVXyrSVGZtEQ&s=08" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </footer>

      {mounted && showScrollTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </motion.button>
      )}

      <Dialog open={selectedProject !== null} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className="mb-4">{selectedProject?.fullDescription}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject?.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </DialogDescription>
          <DialogFooter className="sm:justify-start">
            <Button onClick={() => selectedProject && window.open(selectedProject.link, '_blank')}>
              View
            </Button>
            <Button variant="outline" onClick={closeModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ToastContainer position="bottom-right" />
    </div>
  )
}