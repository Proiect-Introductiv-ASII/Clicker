import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
    <div className="about-container">
      <div className="about-content">
        <section>
          <h1 className="heading">About ASCII/IT Clicker Game</h1>
          <p>
            This game is a tribute to the creativity of ASCII art and the IT
            world, blending nostalgic aesthetics with addictive clicker
            mechanics. Inspired by the iconic Cookie Clicker game, ASCII/IT
            Clicker takes a retro approach to idle gameplay by using minimalist
            text-based visuals.
          </p>
        </section>
      </div>
    </div>

    <div className="about-container">
      <div className="about-content">
        <section>
          <h2 className="subheading">How It Works</h2>
          <p>
            In this game, players start by clicking to earn points. These points
            can then be used to unlock new upgrades, automate clicks, and
            progress further. Each upgrade contributes to the strategic
            progression, keeping the player engaged for hours.
          </p>
        </section>
        </div>
    </div>

    <div className="about-container">
      <div className="about-content">    
        <section>
          <h2 className="subheading">Technologies Behind the Game</h2>
          <p>
            ASCII/IT Clicker is built using modern web technologies such as
            Next.js for server-side rendering and MongoDB for storing player
            data. The focus is on creating a seamless, responsive experience
            that can run smoothly on both desktop and mobile devices.
          </p>
        </section>
        </div>
    </div>
    
    <div className="about-container">
      <div className="about-content">
        <section>
          <h2 className="subheading">What's Next</h2>
          <p>
            We are working on adding more features to enhance the gameplay, such
            as new upgrade paths, leaderboards, and achievements to reward the
            most dedicated players.
          </p>
        </section>
        </div>
    </div>
    
    <div className="about-container">
      <div className="about-content">
        <section>
          <h2 className="subheading">Credits & Contact</h2>
          <p>
            This project was created as part of an ongoing learning journey into
            game development. If you have any suggestions, feel free to reach
            out via email.
          </p>
        </section>
      </div>
    </div>
    </div>
  );
};

export default About;

