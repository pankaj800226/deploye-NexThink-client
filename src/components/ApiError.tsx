import { ReplyTwoTone } from "@mui/icons-material";
import { Button } from "@mui/material";

interface ApiErrorProps {
  error: string;
}

const ApiError: React.FC<ApiErrorProps> = ({ error }) => {
  return (
    <div className="api-error">
      <div className="api-error__card">
        <div className="api-error__icon">⚠️</div>

        <h1 className="api-error__title">Something went wrong</h1>

        <p className="api-error__message">
          {error || "Unable to fetch data. Please try again."}
        </p>

        <Button
          className="api-error__btn"
          variant="contained"
          startIcon={<ReplyTwoTone />}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export default ApiError;
