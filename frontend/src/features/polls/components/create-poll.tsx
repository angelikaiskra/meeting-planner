import SelectedOptionsProvider from '@/features/polls/context/selected-options-context.tsx';
import { CreatePollForm } from '@/features/polls/components/create-poll-form.tsx';

export const CreatePoll = () => {
  return (
    <SelectedOptionsProvider>
      <CreatePollForm />
    </SelectedOptionsProvider>
  );
};