import '../styles/homepage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Agentplummet</h1>
      </header>

      <main>
        <section className="about">
          <h2>About</h2>
          <p>
            Agentplummet is a social deduction game where players are assigned
            roles as either spies or regular participants. The game is set in
            various locations, such as a beach, hospital, or space station.
            Players take turns asking each other questions to figure out who the
            spy is, while the spy tries to remain undetected and guess the
            location.
          </p>
        </section>

        <section className="instructions">
          <h2>Instructions</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            aliquam tortor quis nunc tincidunt, et rutrum lorem pulvinar. Mauris
            vitae tellus at justo eleifend ultrices.
          </p>
        </section>

        <section className="contact">
          <h2>Contact</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            aliquam tortor quis nunc tincidunt, et rutrum lorem pulvinar. Mauris
            vitae tellus at justo eleifend ultrices.
          </p>
        </section>
        <button className="button">Play</button>
      </main>

      <footer>
        <p>&copy; 2023 Agentplummet All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
