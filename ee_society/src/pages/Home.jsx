import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import "./home.css";

function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_URL2;
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      onClick={() => {
        if (dropdownOpen) setDropdownOpen(false);
      }}
    >
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
      <div div className="home-container">
        <div className="homeheading">
          <img src={PF + "/logo.jpg"} className="homeheadingimg" alt="logo" />
          <h1 className="hometitle">
            Welcome To The Electrical Engineering Society
          </h1>
          <img src={PF + "/logo.jpg"} className="homeheadingimg" alt="logo" />
        </div>
        <div className="content">
          <h2> INTRODUCTION </h2>
          <p>
            Welcome to the Electrical Engineering Society, a vibrant and newly
            established student-led initiative founded by a group of passionate
            and highly skilled Electrical Engineering students! Our society is
            dedicated to creating a dynamic and inclusive community where
            students from all academic years can come together to collaborate,
            innovate, and deepen their understanding of electrical engineering
            and its real-world applications. Whether you're a first-year student
            just beginning your journey or a seasoned senior looking to refine
            your expertise, the Electrical Society offers a platform for
            everyone to learn, grow, and connect. At the heart of our mission is
            the belief that innovation thrives through collaboration. We aim to
            foster an environment where ideas are shared, projects are brought
            to life, and knowledge is exchanged freely. Through workshops,
            seminars, hands-on projects, and networking events, we provide
            opportunities to explore cutting-edge technologies, tackle
            engineering challenges, and gain practical experience that
            complements your academic studies. Join us as we push the boundaries
            of electrical engineering, inspire creativity, and build a community
            of forward-thinking individuals. Together, we can spark innovation,
            drive progress, and shape the future of technology. Welcome to the
            Electrical Society - where passion meets possibility!
          </p>
          <h2> OUR VISION </h2>
          <p>
            At the Electrical Society, we envision a future where students are
            empowered to become pioneers in the field of electrical engineering,
            equipped with not only technical expertise but also the creativity
            and leadership skills needed to drive innovation. We believe in
            nurturing a culture of curiosity and collaboration, where students
            are encouraged to think beyond the conventional and explore
            groundbreaking ideas that can transform the world. Our goal is to
            create a vibrant and inclusive environment where students from all
            backgrounds and academic levels can thrive. Through hands-on
            projects, workshops, and interactive events, we aim to provide
            opportunities for students to apply their classroom knowledge to
            real-world engineering challenges. By fostering a spirit of
            experimentation and problem-solving, we hope to inspire the next
            generation of engineers to push the boundaries of what’s possible.
            At the core of our vision is the commitment to bridging the gap
            between theoretical learning and practical application. We strive to
            create a platform where students can gain valuable experience,
            develop critical skills, and build meaningful connections with peers
            and industry professionals. Together, we aim to cultivate a
            community of forward-thinkers who are ready to tackle the challenges
            of tomorrow and lead the way in shaping the future of technology.
            Join us as we work towards a brighter, more innovative future - one
            idea, one project, and one student at a time!
          </p>
          <h2> WHAT WE OFFER </h2>
          <h3 className="offerlistheading">
            1] Exciting Competitions & Hackathons
          </h3>
          <ul>
            <li>
              We organize hackathons, circuit design challenges, and robotics
              competitions to encourage students to put their skills to the
              test.
            </li>
            <li>
              These events provide an opportunity for participants to showcase
              their problem-solving abilities, develop new projects, and compete
              with like-minded peers.
            </li>
            <li>
              Whether you're interested in power systems, embedded systems,
              automation, or IoT, our competitions will challenge your technical
              acumen and encourage teamwork and innovation.
            </li>
          </ul>
          <h3 className="offerlistheading">
            2] Workshops & Technical Training
          </h3>
          <ul>
            <li>
              We conduct hands-on workshops and training sessions covering
              topics such as PCB designing, microcontroller programming, power
              electronics, renewable energy solutions, AI in electrical systems,
              and much more.
            </li>
            <li>
              These workshops are designed to equip students with
              industry-relevant skills and give them a practical understanding
              of theoretical concepts.
            </li>
            <li>
              Whether you are a beginner or an advanced learner, these sessions
              will help you enhance your technical proficiency.
            </li>
          </ul>
          <h3 className="offerlistheading">3] Alumni & Expert Talks</h3>
          <ul>
            <li>
              Learning from experienced professionals is an invaluable
              experience. The Electrical Society frequently invites
              distinguished alumni, industry experts, and renowned academicians
              to share their knowledge, experiences, and career advice.
            </li>
            <li>
              These interactions help students gain insights into industry
              trends, cutting-edge technologies, and career opportunities in
              electrical engineering.
            </li>
          </ul>
          <h3 className="offerlistheading">4] Research & Project Incubation</h3>
          <ul>
            <li>
              Students with groundbreaking ideas will have opportunities to work
              on projects under mentorship from faculty and industry
              professionals.
            </li>
            <li>
              We encourage members to collaborate on research papers,
              patent-worthy innovations, and startup ideas that can contribute
              to technological advancements in the field.
            </li>
          </ul>
          <h3 className="offerlistheading">5] Networking & Collaboration</h3>
          <ul>
            <li>
              The society serves as a platform for students to network with
              peers, faculty, and professionals in the electrical engineering
              domain.
            </li>
            <li>
              Collaboration between different engineering branches will be
              promoted to work on interdisciplinary projects, fostering holistic
              development and teamwork.
            </li>
          </ul>
          <h2> JOIN US AND BE THE PART OF INNOVATION </h2>
          <p>
            The Electrical Society is more than just a student organization—it's
            a thriving community of passionate individuals who share a common
            goal: to learn, innovate, and make meaningful contributions to the
            field of electrical engineering. Whether you're a first-year student
            taking your first steps into the world of circuits and systems, or a
            final-year student ready to refine your skills and tackle complex
            challenges, this society is your gateway to growth and success.
            Here, you'll find a supportive environment where curiosity is
            encouraged, ideas are celebrated, and collaboration is at the heart
            of everything we do. From hands-on projects and workshops to
            competitions and networking events, we provide the tools and
            opportunities you need to turn your ideas into reality. Our aim is
            to bridge the gap between classroom learning and real-world
            engineering, empowering you to apply your knowledge in innovative
            ways. By joining the Electrical Society, you'll become part of a
            dynamic community that thrives on knowledge, creativity, and the
            drive to make a lasting impact. Together, we'll explore cutting-edge
            technologies, solve pressing engineering problems, and push the
            boundaries of what's possible. This is your chance to connect with
            like-minded peers, learn from industry experts, and contribute to
            shaping the future of electrical engineering. Join us today and be
            part of a movement that's redefining the future of technology. Your
            journey towards innovation starts here!
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
