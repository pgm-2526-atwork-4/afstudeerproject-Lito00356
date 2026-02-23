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
      <section className="container-full container-full--white">
        <div className="container-full__title">
          <h2>How it works</h2>
          <small>Three simple steps to your dream room</small>
        </div>
        <div className="container-image">
          <article className="image-card">
            <div className="test">
              <span className="flow-step">1</span>
              <img
                className="image"
                src="https://images.unsplash.com/photo-1721244653757-b76cc4679dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwYmx1ZXByaW50JTIwZHJhd2luZ3xlbnwxfHx8fDE3NzE2OTY0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Draw your room"
              />
              <div className="image-card__description">
                <img src="https://placehold.co/25x25" alt="" />
                <div>
                  <strong>Draw your room</strong>
                  <small>Use our intuitive drawing tools to sketch your room layout with precise measurements</small>
                </div>
              </div>
            </div>
          </article>
          <article className="image-card image-card--offset">
            <div className="test">
              <span className="flow-step">2</span>
              <img
                className="image"
                src="https://images.unsplash.com/photo-1617325279446-f0831b1d369d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc3MTcxMzI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Add furniture"
              />
              <div className=" image-card__description">
                <img src="https://placehold.co/25x25" alt="" />
                <div>
                  <strong>Add furniture</strong>
                  <small>Browse our extensive catalog and drag-and-drop furniture pieces into your design</small>
                </div>
              </div>
            </div>
          </article>
          <article className="image-card">
            <div className="test">
              <span className="flow-step">3</span>
              <img
                className="image"
                src="https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlcmluZyUyMGZ1cm5pdHVyZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzcxNzEzMjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Visualize in 3D"
              />
              <div className=" image-card__description">
                <img src="https://placehold.co/25x25" alt="" />
                <div>
                  <strong>Visualize in 3D</strong>
                  <small>Experience your design in immersive 3D and make real-time adjustments</small>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="container-full container-full__green">
        <h2>The Complete Design Experience</h2>
        <small>Professional tools, endless possibilities, and a community of designers at your fingertips</small>
        <div>
          <div>
            <strong>500+</strong>
            <small>Furniture items</small>
            <small>Curated collection for every style</small>
          </div>
          <div>
            <strong>10k+</strong>
            <small>Happy users</small>
            <small>Designers trust our platform</small>
          </div>
          <div>
            <strong>4.9*</strong>
            <small>User rating</small>
            <small>Consistently top-rated experience</small>
          </div>
          <div>
            <strong>Free</strong>
            <small>To start</small>
            <small>No credit card required</small>
          </div>
        </div>
        <div>
          <img src="" alt="" />
          <div>
            <strong>Precision drawing</strong>
            <small>Create accurate floor plans with our advanced measurement tools</small>
          </div>
        </div>
        <div>
          <img src="" alt="" />
          <div>
            <strong>Live 3D view</strong>
            <small>Walk through your design in real-time 3D rendering</small>
          </div>
        </div>
      </section>
      <section>
        <h2>Ready to design your space?</h2>
        <p>
          Join thousands of users who have transformed their homes with RoomCraft. Start your free trial today, no credit
          card required.
        </p>
        <div>
          <Link to="./register">
            <button>Create free account</button>
          </Link>
          <Link to="./login">
            <button>Sign in</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
