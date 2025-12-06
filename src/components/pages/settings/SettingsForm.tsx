import SettingsCard from "./SettingsCard";

const SettingsForm = () => {
  return (
    <div className="grid w-full max-w-230 grid-rows-3 flex-col gap-4 md:grid-cols-2 md:gap-6">
      <SettingsCard title="Notification" className="row-span-2">
        2
      </SettingsCard>

      <SettingsCard title="Notification" className="col-start-1 row-start-3">
        2
      </SettingsCard>

      <SettingsCard title="Notification" className="col-start-2 row-start-1">
        2
      </SettingsCard>

      <SettingsCard
        title="Notification"
        className="col-start-2 row-span-2 row-start-2"
      >
        2
      </SettingsCard>
    </div>
  );
};

export default SettingsForm;
