import "./App.css";

function App() {
  return (
    <div className="portfolio">

      <header className="hero">
        <h1>Thirumalai Selladurai</h1>
        <h2>Cloud Engineer | AWS DevOps</h2>

        <p>
          Aspiring Cloud Engineer skilled in AWS services, Terraform, and
          CI/CD automation, with hands-on experience building and deploying
          cloud infrastructure, automating pipelines, and monitoring systems
          for reliability and performance.
        </p>

        <button>View My Projects</button>
      </header>

      <section>
        <h2>About Me</h2>

        <p>
          I hold a B.E. in Electronics and Communication Engineering from
          Sree Sakthi Engineering College and I'm seeking to contribute
          technical expertise in cloud automation, monitoring, and security
          to drive efficient, scalable solutions.
        </p>
      </section>

      <section>
        <h2>Skills</h2>

        <div className="skills">
          <span>EC2</span>
          <span>VPC</span>
          <span>IAM</span>
          <span>Lambda</span>
          <span>ECS</span>
          <span>ECR</span>
          <span>API Gateway</span>
          <span>RDS</span>
          <span>SQS</span>
          <span>CloudWatch</span>
          <span>Auto Scaling</span>
          <span>Terraform</span>
          <span>Jenkins</span>
          <span>Docker</span>
          <span>Kubernetes</span>
          <span>CI/CD Pipelines</span>
          <span>Datadog</span>
          <span>GitHub Secrets</span>
        </div>
      </section>

      <section>
        <h2>Projects</h2>

        <div className="projects">

          <div className="project">
            <h3>AWS S3 Provisioning with Terraform & GitHub Actions CI/CD</h3>
            <p className="project-date">May 2026 - Jun 2026</p>
            <p>
              Automated AWS S3 bucket provisioning using Terraform, running
              init, plan and apply as a fully automated GitHub Actions
              workflow triggered on every push. Managed AWS credentials
              securely using GitHub Secrets, following infrastructure-as-code
              and least-privilege security best practices.
            </p>
          </div>

          <div className="project">
            <h3>CI/CD Pipeline for Node.js Application Deployment on AWS ECS</h3>
            <p className="project-date">Apr 2026 - May 2026</p>
            <p>
              Containerized a Node.js application with Docker and deployed
              it on AWS ECS for scalable, production-style hosting. Built an
              end-to-end CI/CD pipeline using AWS CodePipeline and CodeBuild,
              using Amazon ECR for image storage and configuring networking,
              security and monitoring for reliable delivery.
            </p>
          </div>

          <div className="project">
            <h3>AWS CloudWatch Dashboard for EC2 Monitoring</h3>
            <p className="project-date">Jul 2026</p>
            <p>
              Built a custom Amazon CloudWatch dashboard to monitor EC2
              instance health, tracking CPU utilization, network traffic and
              disk I/O metrics in real time, enabling proactive visibility
              into cloud infrastructure performance.
            </p>
          </div>

          <div className="project">
            <h3>AI-Based Smart Helmet System with Eye Tracking</h3>
            <p className="project-date">Jan 2026 - Apr 2026</p>
            <p>
              Integrated a camera-based sensor module into a helmet to detect
              prolonged eye closure or driver distraction in real time,
              triggering automated audio alerts and emergency SMS
              notifications on unsafe conditions.
            </p>
          </div>
        
        </div>
      </section>

      <section>
        <h2>Internship</h2>

        <div className="project">
          <h3>Bajaj Engineering & Skills Training (BEST) Programme</h3>
          <p className="project-date">Jan 2026 - Apr 2026</p>
          <p>
            Completed a 4-month residential technical training programme
            (70% practical, 30% theory) covering functional testing,
            electronics system reliability and product compliance, with
            hands-on exposure to embedded systems and IoT.
          </p>
        </div>
      </section>

      <section>
        <h2>AWS Knowledge</h2>

        <p>
          EC2 | VPC | IAM | Lambda | ECS | ECR |
          API Gateway | RDS | SQS | CloudWatch | Auto Scaling
        </p>
      </section>

      <section>
        <h2>Education</h2>

        <div className="projects">
          <div className="project">
            <h3>B.E., Electronics and Communication Engineering</h3>
            <p className="project-date">Anna University · Expected 2026</p>
            <p>Aggregate Score: 74%</p>
          </div>

          <div className="project">
            <h3>Higher Secondary (Class XII)</h3>
            <p className="project-date">Tamil Nadu State Board · 2022</p>
            <p>Percentage: 69.5%</p>
          </div>

          <div className="project">
            <h3>Secondary (Class X)</h3>
            <p className="project-date">Tamil Nadu State Board · 2020</p>
            <p>Percentage: 69.2%</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Awards & Honors</h2>

        <p>
          Awarded for participation in the Next-Generation Drone
          Technologies for Defense and Security Applications (NG-DTDSA)
          national-level workshop, Nehru Institute of Technology, Coimbatore.
        </p>
      </section>

      <section>
        <h2>Languages</h2>

        <p>English (Fluent) | Tamil (Fluent)</p>
      </section>

      <section>
        <h2>Contact</h2>

        <p>Email: thirumalaiselladurai@gmail.com</p>
        <p>Phone: +91-8903862587</p>
        <p>Location: Chennai, India</p>
        <p>LinkedIn: linkedin.com/in/thirumalai-selladurai-171073426</p>
      </section>

      <footer>
        <p>© 2026 Thirumalai Selladurai | Cloud Engineer | AWS DevOps</p>
      </footer>

    </div>
  );
}

export default App;
