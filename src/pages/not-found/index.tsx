import Button from "../../components/button";
import { useNavigate } from "react-router";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="w-full h-dvh items-center justify-center container mx-auto max-w-2xl p-4">
      <div className="flex items-center justify-center flex-col h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
          <p className="mb-8 text-lg text-gray-600">
            The page you are looking for does not exist.
          </p>
        </div>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Return To Login Page
        </Button>
      </div>
    </section>
  );
}

export default NotFoundPage;
