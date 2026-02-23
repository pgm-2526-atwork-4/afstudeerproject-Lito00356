import "@style/theme.css";
import "./LandingPage.css";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <>
      <section className="container-double">
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
          <Link to="/register">
            <button>Start creating </button>
          </Link>
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
      <section className="container-white">
        <div>
          <h2>How it works</h2>
          <span>Three simple steps to your dream room</span>
        </div>
        <div>
          <article>
            <div>
              <span>1</span>
              <img
                src="https://images.unsplash.com/photo-1721244653757-b76cc4679dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwYmx1ZXByaW50JTIwZHJhd2luZ3xlbnwxfHx8fDE3NzE2OTY0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Draw your room"
              />
            </div>
          </article>
          <article>
            <div>
              <span>2</span>
              <img
                src="https://images.unsplash.com/photo-1617325279446-f0831b1d369d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc3MTcxMzI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Add furniture"
              />
            </div>
          </article>
          <article>
            <div>
              <span>3</span>
              <img
                src="https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlcmluZyUyMGZ1cm5pdHVyZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzcxNzEzMjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Visualize in 3D"
              />
            </div>
          </article>
        </div>
      </section>
      <section className="container-color"></section>
    </>
  );
};

export default LandingPage;
