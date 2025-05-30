import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router";
import useStatistics from "./useStatistics";
import PageHeader from "../../components/page-header";
import Button from "../../components/button";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Statistics() {
  const { data } = useStatistics();
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="h-dvh w-full flex flex-col items-center justify-center text-indigo-500">
        <div className="animate-pulse mb-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-dvh mx-auto flex flex-col items-center justify-center">
      <PageHeader
        title="Users Statistics"
        rightContent={
          <div className="ml-12">
            <Button type="secondary" onClick={() => navigate("/list")}>
              Go To List Page
            </Button>
          </div>
        }
      />
      <div className="w-1/2">
        <Doughnut data={data} />
      </div>
    </div>
  );
}
