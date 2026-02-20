const ErrorMessage = ({ error }) => {
  if (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return <p>{message}</p>;
  }
  return null;
};

export default ErrorMessage;
