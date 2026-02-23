import "@style/theme.css";
import "./LandingPage.css";
import { Link } from "react-router";
import { Box, Pencil, Sofa } from "lucide-react";

const LandingPage = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <span className="hero-bg__green"></span>
          <span className="hero-bg__white"></span>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <span className="overline">Design your dream space</span>
            <h1 className="title">
              Create. <br />
              Visualize. <br />
              Transform. <br />
            </h1>
            <p>
              The ultimate 3D room configurator that brings your interior design vision to life. Draw your room, add
              furniture, and see it all in stunning 3D.
            </p>
            <Link to="/register" className="link">
              <button className="btn">
                <strong>Start creating now</strong>
              </button>
            </Link>
          </div>
          <div className="hero-image">
            <div className="hero-image__frame">
              <img
                src="https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxNjgwNDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern interior design"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container-white">
        <div className="container-white__title">
          <h2 className="section-title">How it works</h2>
          <small className="section-subtitle">In just three simple steps, you can design it your own room</small>
        </div>
        <div className="container-cards">
          <article className="image-card">
            <div className="container-content">
              <span className="flow-step">1</span>
              <img
                className="image"
                src="https://images.unsplash.com/photo-1721244653757-b76cc4679dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwYmx1ZXByaW50JTIwZHJhd2luZ3xlbnwxfHx8fDE3NzE2OTY0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Draw your room"
              />
              <div className="image-card__description">
                <Pencil className="image-card__icon" />
                <div className="description__text">
                  <strong className="description__title">Draw your room</strong>
                  <small>Use our intuitive drawing tools to sketch your room layout with precise measurements</small>
                </div>
              </div>
            </div>
          </article>
          <article className="image-card image-card--offset">
            <div className="container-content">
              <span className="flow-step">2</span>
              <img
                className="image"
                src="https://images.unsplash.com/photo-1617325279446-f0831b1d369d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc3MTcxMzI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Add furniture"
              />
              <div className=" image-card__description">
                <Sofa className="image-card__icon" />
                <div className="description__text">
                  <strong className="description__title">Add furniture</strong>
                  <small>Browse our extensive catalog and drag-and-drop furniture pieces into your design</small>
                </div>
              </div>
            </div>
          </article>
          <article className="image-card">
            <div className="container-content">
              <span className="flow-step">3</span>
              <img
                className="image"
                src="https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlcmluZyUyMGZ1cm5pdHVyZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzcxNzEzMjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Visualize in 3D"
              />
              <div className=" image-card__description">
                <Box className="image-card__icon" />
                <div className="description__text">
                  <strong className="description__title">Visualize in 3D</strong>
                  <small>Experience your design in immersive 3D and make real-time adjustments</small>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="features">
        <div className="features__header">
          <h2 className="section-title">The Complete Design Experience</h2>
          <small className="section-subtitle">
            Professional tools, endless possibilities, and a community of designers at your fingertips
          </small>
        </div>
        <div className="features__stats">
          <div className="stat-card">
            <strong className="stat-card__value">500+</strong>
            <small className="stat-card__label">Furniture items</small>
            <small className="stat-card__description">Curated collection for every style</small>
          </div>
          <div className="stat-card">
            <strong className="stat-card__value">10k+</strong>
            <small className="stat-card__label">Happy users</small>
            <small className="stat-card__description">Designers trust our platform</small>
          </div>
          <div className="stat-card">
            <strong className="stat-card__value">4.9 *</strong>
            <small className="stat-card__label">User rating</small>
            <small className="stat-card__description">Consistently top-rated experience</small>
          </div>
          <div className="stat-card">
            <strong className="stat-card__value">Free</strong>
            <small className="stat-card__label">To start</small>
            <small className="stat-card__description">No credit card required</small>
          </div>
        </div>
        <div className="features__showcase">
          <div className="features__showcase-image-wrapper">
            <img
              className="features__showcase-image"
              src="https://images.unsplash.com/photo-1535049752-3baf525dd015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc2NhbmRpbmF2aWFuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxNjQ1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Scandinavian interior"
            />
          </div>
          <div className="features__showcase-text">
            <strong className="features__showcase-title">Precision drawing</strong>
            <small className="features__showcase-description">
              Create accurate floor plans with our advanced measurement tools
            </small>
          </div>
        </div>
        <div className="features__showcase features__showcase--reverse">
          <div className="features__showcase-image-wrapper">
            <img
              className="features__showcase-image"
              src="https://images.unsplash.com/photo-1630025504699-0df6d41b56a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmFsJTIwc3BhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzcxNzE0NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Architectural space"
            />
          </div>
          <div className="features__showcase-text">
            <strong className="features__showcase-title">Live 3D view</strong>
            <small className="features__showcase-description">Walk through your design in real-time 3D rendering</small>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2 className="cta__title">Ready to design your space?</h2>
        <p className="cta__description">
          Join thousands of users who have transformed their homes with RoomCraft. Start your free trial today, no credit
          card required.
        </p>
        <div className="cta__actions">
          <Link to="/register">
            <button className="btn btn--primary">
              <strong>Create free account</strong>
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn--secondary">
              <strong>Sign in</strong>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
