import { toast } from "react-toastify";

const handleAsync = (fn) => {
    return async (...args) => {
      try {
        return await fn(...args); // Call the async function passed
      } catch (error) {
        // Handle your errors centrally here
        if (error.response) {
          // Handle API errors (server-side issues)
          if (error.response.status >= 500) {
            toast.error('Server error, please try again later');
          } else {
            toast.error(error.response.data.message || 'Something went wrong!');
          }
        } else if (error.request) {
          // Handle request error (e.g., network issues)
          toast.error('Network error, please try again later');
        } else {
          // Handle other errors (e.g., internal app issues)
          toast.error(error.message || 'Something went wrong!');
        }
      }
    };
  };


export default handleAsync;
