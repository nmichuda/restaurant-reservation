import { React } from "react";

function DisplayErrors({errors}) {
  if (errors !== null) {
    if (errors.length > 0) {
      return (
        <div className="alert alert-danger">
          <h1>ERROR:</h1>
          {errors.map((error) => (
            <p key={errors.indexOf(error)}>{error.message}</p>
          ))}
        </div>
      );
    }
  }

  return null;
}

export default DisplayErrors;
