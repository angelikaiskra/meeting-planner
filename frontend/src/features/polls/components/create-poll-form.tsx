import { Input } from '@/components/ui/form/input.tsx';
import { Form } from '@/components/ui/form/form.tsx';
import { useState } from 'react';
import Typography from '@/components/ui/typography/typography.tsx';
import SettingsSection from '@/features/polls/components/settings-section.tsx';
import Button from '@/components/ui/button/button.tsx';
import DividerLine from '@/components/ui/divider-line/divider-line.tsx';
import CalendarSection from '@/features/polls/components/calendar-section.tsx';
import SelectedOptionsProvider from '@/features/polls/context/selected-options-context.tsx';

export const CreatePollForm = () => {
  const [title, setTitle] = useState('');

  const onSubmitForm = (data: any) => {
    console.log('onSubmit CreatePoll', data);
  };

  return (
    <Form id={'create-poll'} className={'mt-10 max-w-[700px] mx-auto'} onSubmit={onSubmitForm}>
      <div className={'space-y-6 px-5 py-4 md:p-8 bg-white border border-gray-200 rounded-lg shadow-sm'}>
        <Input label={'Title'} name={'title'} placeholder={'Event title'}
               value={title}
               onChange={(e) => setTitle(e.target.value)} />

        <Input label={'Description'} name={'description'} placeholder={'Description'} optional={true}
               value={title}
               onChange={(e) => setTitle(e.target.value)} />

        <Typography variant={'lead'} className={'pt-3'}>Calendar</Typography>
        <SelectedOptionsProvider>
          <CalendarSection />
        </SelectedOptionsProvider>

        <Typography variant={'lead'} className={'pt-3'}>Settings</Typography>
        <SettingsSection />
      </div>

      <DividerLine className={'my-6'} color={'bg-white'} />

      <Button className={'block mx-auto'} onClick={() => console.log('Create a poll')}>Create a poll</Button>
    </Form>
  );
};