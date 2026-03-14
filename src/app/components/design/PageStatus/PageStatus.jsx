import React from "react";
import { Link } from "react-router";
import "./PageStatus.css";

const Loading = ({ text = "Loading..." }) => (
  <div className="page-status">
    <div className="page-status__spinner" />
    <span className="page-status__text">{text}</span>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="page-status">
    <span className="page-status__icon">!</span>
    <h2 className="page-status__title">Something went wrong</h2>
    <p className="page-status__message">{message ?? "An unexpected error occurred."}</p>
    <Link className="page-status__action" to="/collection">
      Back to collection
    </Link>
  </div>
);

const NotFound = ({ message }) => (
  <div className="page-status">
    <span className="page-status__icon">?</span>
    <h2 className="page-status__title">Not found</h2>
    <p className="page-status__message">{message ?? "This project could not be found."}</p>
    <Link className="page-status__action" to="/collection">
      Back to collection
    </Link>
  </div>
);

const PageStatus = { Loading, Error: ErrorState, NotFound };

export default PageStatus;
