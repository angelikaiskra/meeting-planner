import { Input } from '@/components/ui/form/input.tsx';
import { Form } from '@/components/ui/form/form.tsx';
import { useState } from 'react';
import Typography from '@/components/ui/typography/typography.tsx';
import SettingsSection from '@/features/polls/components/settings-section.tsx';

export const CreatePoll = () => {
  const [title, setTitle] = useState("");

  const onSubmitForm = (data: any) => {
    console.log("onSubmit CreatePoll", data);
  }

  return (
    <Form id={"create-poll"} className={"mt-10 px-5 py-4 md:p-8 bg-white border border-gray-200 rounded-lg shadow-sm"} onSubmit={onSubmitForm}>
      <Input label={"Title"} name={"title"} placeholder={"Event title"}
             value={title}
             onChange={(e) => setTitle(e.target.value)} />

      <Input label={"Description"} name={"description"} placeholder={"Description"} optional={true}
             value={title}
             onChange={(e) => setTitle(e.target.value)} />

      <Typography variant={"lead"} className={"pt-3"}>Calendar</Typography>
      <div className={"h-10"} />

      <Typography variant={"lead"} className={"pt-3"}>Settings</Typography>
      <SettingsSection />

    </Form>
  )
}