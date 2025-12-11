import { useForm, FormProvider } from "react-hook-form";
import SettingsCard from "./SettingsCard";
import { SettingsStore } from "@/store/settings.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "@/utils/validationSchema";
import { Button } from "@/components/ui/Button";
import LoaderButton from "@/components/ui/LoaderButton";
import ControlledSwitch from "@/components/form/ControlledSwitch";
import ControlledSelect from "@/components/form/ControlledSelect";
import ControlledNumberInput from "@/components/form/ControlledNumberInput";

const nextSessReminderOptions = [
  { label: "Disabled", value: "disabled" },
  { label: "After 2 mins", value: "2" },
  { label: "After 5 mins", value: "5" },
  { label: "After 10 mins", value: "10" },
];

const timeLeftReminderOptions = [
  { label: "Disabled", value: "disabled" },
  { label: "Before 2 mins", value: "2" },
  { label: "Before 5 mins", value: "5" },
  { label: "Before 10 mins", value: "10" },
];

const SettingsForm = () => {
  const form = useForm<SettingsStore>({
    resolver: zodResolver(settingsSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className="grid w-full max-w-230 grid-rows-3 flex-col gap-4 md:grid-cols-2 md:gap-6"
      >
        <SettingsCard title="Pomodoro" className="row-span-2">
          <ControlledNumberInput
            name="pomoDuration"
            label="Pomodoro Duration"
            inputGroupClassName="w-full max-w-20!"
            rootClassName="flex-row"
            min={0}
            max={999}
            allowNegative={false}
          />
          <ControlledNumberInput
            name="breakDuration"
            label="Break Duration"
            inputGroupClassName="w-full max-w-20!"
            rootClassName="flex-row"
          />
          <ControlledNumberInput
            name="shortBreakDuration"
            label="Short Break Duration"
            inputGroupClassName="w-full max-w-20!"
            rootClassName="flex-row"
          />
          <ControlledNumberInput
            name="longBreakDuration"
            label="Long Break Duration"
            inputGroupClassName="w-full max-w-20!"
            rootClassName="flex-row"
          />
        </SettingsCard>

        <SettingsCard title="Auto Actions" className="col-start-1 row-start-3">
          <ControlledSwitch name="autoStartPomo" label="Auto Start Pomodoro" />
          <ControlledSwitch name="autoStartBreak" label="Auto Start Break" />
        </SettingsCard>

        <SettingsCard title="Notification" className="col-start-2 row-start-1">
          card
        </SettingsCard>

        <SettingsCard
          title="Notification"
          className="col-start-2 row-span-2 row-start-2"
        >
          <ControlledSwitch name="notificationsEnabled" label="Enabled" />

          <ControlledSelect
            data={timeLeftReminderOptions}
            name="timeLeftReminder"
            label="Time Left Reminder"
            className="w-full max-w-36!"
            rootClassName="flex-row"
          />

          <ControlledSelect
            data={nextSessReminderOptions}
            name="nextSessionReminder"
            label="Re-Reminder for Next Session"
            className="w-full max-w-36!"
            rootClassName="flex-row"
          />
        </SettingsCard>

        <div className="col-start-2 flex justify-end gap-2">
          <LoaderButton type="submit">Submit</LoaderButton>
          <Button variant="subtle">Reset</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SettingsForm;
