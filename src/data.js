export const profile = {
  name: "Thirumalai Selladurai",
  tagline:
    "Cloud Engineer building on AWS — infrastructure automation, CI/CD pipelines, and monitoring systems designed for reliability at scale.",
  location: "Chennai, India",
  phone: "+91 89038 62587",
  phoneHref: "tel:+918903862587",
  email: "thirumalaiselladurai@gmail.com",
  linkedin: "linkedin.com/in/thirumalai-selladurai",
  linkedinHref: "https://linkedin.com/in/thirumalai-selladurai-171073426",
};

export const skillGroups = [
  {
    title: "CLOUD — AWS",
    chips: [
      "EC2", "VPC", "IAM", "Lambda", "DynamoDB", "ECS", "ECR",
      "API Gateway", "RDS", "SQS", "CloudWatch", "Auto Scaling",
      "Amplify", "Route 53",
    ],
  },
  {
    title: "DEVOPS & IaC",
    chips: ["Terraform", "Jenkins", "Docker", "Kubernetes", "CI/CD Pipelines"],
  },
  {
    title: "MONITORING & SECURITY",
    chips: ["Datadog", "CloudWatch", "IAM Policies", "GitHub Secrets"],
  },
];

export const projects = [
  {
    title: "AWS S3 Provisioning with Terraform and GitHub Actions CI/CD",
    date: "MAY – JUN 2026",
    bullets: [
      "Automated AWS S3 bucket provisioning using Terraform, running init, plan, and apply stages as a fully automated GitHub Actions workflow triggered on every push.",
      "Managed AWS credentials securely with GitHub Secrets, following infrastructure-as-code and least-privilege security practices.",
    ],
  },
  {
    title: "CI/CD Pipeline for Node.js Application Deployment on AWS ECS",
    date: "APR – MAY 2026",
    bullets: [
      "Containerized a Node.js application with Docker and deployed it on AWS ECS for scalable, production-style hosting.",
      "Built an end-to-end CI/CD pipeline using AWS CodePipeline and CodeBuild to automate build, test, and deployment stages.",
      "Used Amazon ECR for container image storage and configured networking, security, and monitoring for reliable delivery.",
    ],
  },
  {
    title: "AWS CloudWatch Dashboard for EC2 Monitoring",
    date: "JUL 2026",
    bullets: [
      "Built a custom CloudWatch dashboard to monitor EC2 instance health — CPU utilization, network traffic, and disk I/O in real time.",
      "Applied hands-on monitoring and alerting practices for proactive visibility into infrastructure performance.",
    ],
  },
  {
    title: "AI-Based Smart Helmet System with Eye Tracking",
    date: "JAN – APR 2026",
    bullets: [
      "Integrated a camera-based sensor module into a helmet to detect prolonged eye closure or driver distraction in real time.",
      "Triggered automated audio alerts and emergency SMS notifications on detecting unsafe conditions, improving rider safety.",
    ],
  },
];

export const experience = [
  {
    org: "Cloud Computing Intern, Gateway Software Solutions",
    period: "AUG 2026 — PRESENT",
    bullets: [
      "Undertaking a 3-month Cloud Computing internship, gaining hands-on experience with core AWS services including EC2, S3, Lambda, DynamoDB, Amplify, and Route 53 through structured labs and training.",
      "Assisting on a live cloud computing project, supporting the provisioning and management of AWS resources under guidance from senior engineers.",
    ],
  },
  {
    org: "Bajaj Engineering and Skills Training (BEST) Programme",
    period: "JAN — APR 2026",
    bullets: [
      "Completed a 4-month residential technical training programme (70% practical, 30% theory) covering functional testing, electronics system reliability, and product compliance.",
      "Gained exposure to embedded systems and IoT through hands-on work with industrial-grade equipment.",
    ],
  },
];

export const education = [
  {
    name: "B.E., Electronics and Communication Engineering",
    sub: "Anna University — Expected 2026",
    score: "75.2%",
  },
  {
    name: "Higher Secondary (Class XII)",
    sub: "Tamil Nadu State Board — 2022",
    score: "69.5%",
  },
  {
    name: "Secondary (Class X)",
    sub: "Tamil Nadu State Board — 2020",
    score: "69.2%",
  },
];

export const award =
  "Awarded for participation in the Next-Generation Drone Technologies for Defense and Security Applications (NG-DTDSA) national-level workshop, Nehru Institute of Technology, Coimbatore.";

export const languages = ["English — Fluent", "Tamil — Fluent"];
