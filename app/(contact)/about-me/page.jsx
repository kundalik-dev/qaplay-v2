import Link from "next/link";
import {
  Mail,
  Briefcase,
  Code,
  Video,
  Bird,
  Globe,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Me",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "http://qaplayground.com/about-me",
  },
};

const ProfilePage = () => {
  const socialLinks = [
    {
      href: "mailto:kundalik.dev@gmail.com",
      icon: <Mail />,
      label: "Email",
    },
    {
      href: "https://www.linkedin.com/in/kundalikjadhav1516",
      icon: <Briefcase />,
      label: "LinkedIn",
    },
    {
      href: "https://github.com/kundalik-dev",
      icon: <Code />,
      label: "GitHub",
    },
    {
      href: "https://www.youtube.com/@qaplayground",
      icon: <Video />,
      label: "YouTube",
    },
    {
      href: "https://twitter.com/qaplayground",
      icon: <Bird />,
      label: "Twitter",
    },
    {
      href: "https://www.qaplayground.com/",
      icon: <Globe />,
      label: "Website",
    },
  ];

  const myExp = [
    {
      role: "Automation Tester",
      company: "Lumera",
      duration: "Jan 2025 - Present",
      project:
        "eMember Public & Admin Portal — a platform enabling users to track their pensions and retirement benefits. Designed and developed an automation framework using C#, Selenium, and NUnit with database integration for data-driven testing.",
    },
    {
      role: "Test Analyst",
      company: "ITM",
      duration: "Aug 2022 - Jan 2025",
      project:
        "Penscope (Pension Administration) — Designed and developed an automation framework using C#, Selenium, and NUnit with JSON-based data-driven testing, reducing manual testing effort by 60%.",
    },
    {
      role: "Junior Analyst",
      company: "Mindtree",
      duration: "Jun 2019 - Aug 2022",
      project:
        "Banking Admin — Performed manual and automation testing for banking applications, with a focus on quality assurance and application reliability.",
    },
  ];

  const mySkills = [
    {
      automation: "Selenium, Playwright, NUnit, TestNG",
      lang: "C#, JavaScript, SQL",
      framework: "POM, Builder Pattern, Data-Driven, TestNG (JSON, NUnit)",
      API: "RestAssured, Postman",
      Database: "SQL Server, PostGresSQL",
      test_Management: "JIRA, Azure Test Plans",
      CI_CD: "Git, Jenkins",
      devSkills: "Next.js, Tailwind CSS, JavaScript, Shadcn, HTML, CSS",
    },
  ];

  const keyAchievement = [
    "Employee of the month and top performer.",
    "Successfully reduced manual testing effort by 60% through automation.",
    "Contributed to the development of a comprehensive automation framework.",
    "Implemented CI/CD pipelines for efficient software delivery.",
    "Recognized for delivering high-quality software solutions in the UK Pension domain.",
  ];

  const myGithub = [
    {
      name: "AI Website Generator",
      description:
        "Create stunning websites in minutes with our AI Website Generator. Powered by Next.js and Tailwind CSS, it offers customizable templates and seamless deployment.",
      url: "https://github.com/kundalik5545/ai-website-generator",
      liveUrl: "https://free-ai-website-generator.vercel.app/",
    },
    {
      name: "QA PlayGround",
      description:
        "A comprehensive automation testing platform with interactive labs, real-world scenarios, and built-in UI components for hands-on learning.",
      url: "https://github.com/kundalik5545/qatesting",
      liveUrl: "https://qaplayground.com/",
    },
    {
      name: "QA Playground Clipper",
      description:
        "Chrome extension that allows users to capture any web page, article, or YouTube video link and save it to QA Playground for future reference and learning.",
      url: "https://github.com/kundalik-dev/save-to-qa-playground",
      liveUrl:
        "https://chromewebstore.google.com/detail/jegdkegbomfbmhhimfjgacdblcoodfpd?utm_source=item-share-cb",
    },
    {
      name: "QA Capture",
      description:
        "QA Capture is a Chrome extension that allows users to continuously capture screenshots and convert them into PDF, MD, or HTML files.",
      url: "https://chromewebstore.google.com/detail/jhgkhnokloeklnagbkgkgcfphafifefg?utm_source=item-share-cb",
      liveUrl:
        "https://chromewebstore.google.com/detail/jhgkhnokloeklnagbkgkgcfphafifefg?utm_source=item-share-cb",
    },
  ];

  return (
    <div className="bg-background px-6 py-12 text-foreground">
      <div className="container mx-auto max-w-3xl">
        {/* Profile Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Kundalik R. Jadhav</h1>
          <div className="mt-4 flex justify-center gap-4">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 transform items-center justify-center transition-transform duration-300 hover:scale-110 hover:text-primary"
                title={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Summary*/}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Summary</h2>
          <hr />
          <p className="mt-4 text-base text-muted-foreground">
            I am a highly skilled and motivated Test Analyst with 5.5+ years of
            experience and a strong background in automation testing & API
            testing with CI/CD pipelines. Proficient in Selenium WebDriver (C# &
            Java) and framework development.
          </p>

          <p className="mt-4 text-base text-muted-foreground">
            I have a proven track record of delivering high-quality UK Pension
            software solutions and ensuring the reliability and performance of
            applications. My expertise includes various testing methodologies,
            tools, and frameworks, making me a valuable asset to any development
            team.
          </p>
        </div>

        {/* My Skills */}
        <div className="mt-8 pb-3">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <hr />
          <div className="mt-4 grid grid-cols-1 gap-6 text-base text-muted-foreground">
            {mySkills.map((skill, index) => (
              <div key={index} className="space-y-3 border-primary pl-4">
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <span className="min-w-[150px] font-semibold text-primary">
                      Automation
                    </span>
                    <span className="ml-2">: {skill.automation}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[150px] font-semibold text-primary">
                      Language
                    </span>
                    <span className="ml-2">: {skill.lang}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[150px] font-semibold text-primary">
                      Framework
                    </span>
                    <span className="ml-2">: {skill.framework}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[150px] font-semibold text-primary">
                      API Testing
                    </span>
                    <span className="ml-2">: {skill.API}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[150px] font-semibold text-primary">
                      Database Testing
                    </span>
                    <span className="ml-2">: {skill.Database}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[150px] font-semibold text-primary">
                      CI/CD Pipelines
                    </span>
                    <span className="ml-2">: {skill.CI_CD}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[150px] font-semibold text-primary">
                      Test Management
                    </span>
                    <span className="ml-2">: {skill.test_Management}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[150px] font-semibold text-primary">
                      Dev Skills
                    </span>
                    <span className="ml-2">: {skill.devSkills}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          <hr />
          <ul className="mt-4 space-y-4">
            {myExp.map((job, index) => (
              <li key={index} className="border-l-4 border-primary pl-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {job.role} - {job.company}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays size={16} />
                    {job.duration}
                  </p>
                </div>

                <p className="mt-1 text-sm text-muted-foreground sm:max-w-sm md:min-w-[600px]">
                  {job.project}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Accomplishments Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Key Accomplishments</h2>
          <hr />
          <ul className="mt-4 space-y-4">
            {keyAchievement.map((key, index) => (
              <li key={index} className="border-l-4 border-primary pl-4">
                <p className="text-sm text-muted-foreground">{key}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* My Github Section */}
        <div className="mt-10">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <Code className="text-primary" /> My GitHub Projects
          </h2>
          <hr />
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {myGithub.map((repo, index) => (
              <Card
                key={index}
                className="border-l-4 border-primary transition-shadow duration-300 hover:shadow-lg"
              >
                <CardContent className="flex h-full flex-col p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <Code className="text-primary" size={20} />
                    <h3 className="text-lg font-bold">{repo.name}</h3>
                  </div>
                  <p className="flex-1 text-sm text-muted-foreground">
                    {repo.description}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="flex w-full items-center gap-2"
                      >
                        <Code size={16} />
                        View on GitHub
                      </Button>
                    </Link>
                    <Link
                      href={repo.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="secondary"
                        className="flex w-full items-center gap-2"
                      >
                        <Globe size={16} />
                        Live Project
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Education</h2>
          <hr />
          <p className="mt-2 text-sm text-muted-foreground">
            Bachelor of Engineering from Gov. College of Engineering & Research,
            Awsari Pune | 2017
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
