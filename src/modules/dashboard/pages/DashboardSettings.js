import { useEffect, useState } from "react";
import {
  errorToast,
  successToast,
} from "../../../helpers/toasts";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import useLocalStorage from "../../../hooks/useLocalStorage";

const DashboardSettings = () => {
  const [settings, setSettings] = useLocalStorage("dashboard-settings", {});
  const [state, setState] = useState({});

  useEffect(() => {
    if (settings) setState(settings);
  }, [settings]);

  const handleInputChange = (key, value) => {
    setState((oldState) => {
      return {
        ...oldState,
        [key]: value,
      };
    });
  };
  const handleUpdate = () => {
    try {
      setSettings(state);
      successToast({});
    } catch (error) {
      errorToast({});
    }
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        DashboardSettings
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="backend_base_url"
            value={state?.backend_base_url}
            onChange={(e) =>
              handleInputChange("backend_base_url", e.target.value)
            }
          />

          <Input
            size="lg"
            label="graphql_base_url"
            value={state?.graphql_base_url}
            onChange={(e) =>
              handleInputChange("graphql_base_url", e.target.value)
            }
          />
        </div>

        <Button className="mt-6" fullWidth onClick={handleUpdate}>
          Update
        </Button>
      </form>
    </Card>
  );
};

export default DashboardSettings;
