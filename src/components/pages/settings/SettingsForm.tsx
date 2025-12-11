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
import ControlledTextInput from "@/components/form/ControlledTextInput";
import { Kbd, KbdGroup } from "@/components/ui/Kbd";

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

const defaultInputProps = {
  inputGroupClassName: "w-full max-w-20",
  rootClassName: "flex-row",
};

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
        className="flex w-full max-w-230 flex-col gap-4 md:mt-5 md:grid md:grid-cols-4 md:gap-6"
      >
        <SettingsCard title="Pomodoro" className="col-span-2 row-span-3">
          <ControlledNumberInput
            name="pomoDuration"
            label="Pomodoro Duration"
            min={0}
            max={999}
            {...defaultInputProps}
          />
          <ControlledNumberInput
            name="shortBreakDuration"
            label="Short Break Duration"
            min={0}
            max={999}
            {...defaultInputProps}
          />
          <ControlledNumberInput
            name="longBreakDuration"
            label="Long Break Duration"
            min={0}
            max={999}
            {...defaultInputProps}
          />
          <ControlledTextInput
            name="longBreakInterval"
            label="Long break Interval"
            {...defaultInputProps}
          />
        </SettingsCard>

        <SettingsCard
          title="Auto Actions"
          className="col-span-2 col-start-1 row-start-4"
        >
          <ControlledSwitch name="autoStartPomo" label="Auto Start Pomodoro" />
          <ControlledSwitch name="autoStartBreak" label="Auto Start Break" />
        </SettingsCard>

        <SettingsCard
          title="Auto Actions"
          className="col-span-2 col-start-1 row-start-4"
        >
          <ControlledSwitch name="autoStartPomo" label="Auto Start Pomodoro" />
          <ControlledSwitch name="autoStartBreak" label="Auto Start Break" />
        </SettingsCard>

        <SettingsCard
          title="Notification"
          className="col-span-2 col-start-3 row-span-2 row-start-1"
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

        <SettingsCard
          title="Shortcuts"
          className="col-span-2 col-start-3 row-span-2 row-start-3"
        >
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex justify-between text-sm">
              <p>Play/Pause</p>
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <span>+</span>
                <Kbd>B</Kbd>
              </KbdGroup>
            </div>
          ))}
        </SettingsCard>

        <div className="col-start-4 flex justify-end gap-2">
          <LoaderButton type="submit">Submit</LoaderButton>
          <Button variant="subtle">Reset</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SettingsForm;
