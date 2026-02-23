import "@style/theme.css";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <section className="main-container">
      <div className="container-green">
        <span>Design your dream space</span>
        <h1>
          Create. <br />
          Visualize. <br />
          Transform. <br />
        </h1>
        <p>
          The ultimate 3D room configurator that brings your interior design vision to life. Draw your room, add furniture,
          and see it all in stunning 3D.
        </p>
        <button>Start creating </button>
      </div>
      <div className="container-white">
        <div>
          <img
            src="https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxNjgwNDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern interior design"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
