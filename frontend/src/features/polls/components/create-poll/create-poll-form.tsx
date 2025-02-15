import { Input } from '@/components/ui/form/input.tsx';
import { Form } from '@/components/ui/form/form.tsx';
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from 'react-hook-form';
import Typography from '@/components/ui/typography/typography.tsx';
import SettingsSection from '@/features/polls/components/create-poll/settings-section';
import Button from '@/components/ui/button/button.tsx';
import DividerLine from '@/components/ui/divider-line/divider-line.tsx';
import CalendarSection from '@/features/polls/components/create-poll/calendar-section';
import { createMeetingPollInputSchema, useCreateMeetingPoll } from '@/features/polls/api/create-poll.ts';
import { TimeOption } from '@/types/time.ts';
import { CreateMeetingPollFields, CreateMeetingPollResponse } from '../../types/create-poll';
import { PollSettings } from '@/types/polls';
import { useNavigate } from 'react-router';
import { paths } from '@/config/paths';

export const CreatePollForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateMeetingPollFields>({
    resolver: joiResolver(createMeetingPollInputSchema),
    defaultValues: {
      title: "",
      description: "",
      options: [],
      settings: {
        allowOnlyOneVote: false,
        allowMaybeAnswer: false,
        hideOthersAnswers: false,
        voteDeadline: "",
      }
    },
  });

  const createMeetingPollMutation = useCreateMeetingPoll({
    mutationConfig: {
      onSuccess: (data: unknown) => {
        const res = data as CreateMeetingPollResponse;
        console.log('createMeetingPoll res', res);
        navigate(paths.managePoll.getHref(res.poll.id));
      }
    }
  });

  const onSubmitForm = (values: CreateMeetingPollFields) => {
    console.log('onSubmit CreatePoll', values);

    createMeetingPollMutation.mutate({ data: values });
  };

  return (
    <Form id={'create-poll'} className={'mt-10 max-w-[700px] mx-auto'}
      onSubmit={handleSubmit(onSubmitForm)}>

      <div className={'space-y-6 px-5 py-4 md:p-8 bg-white border border-gray-200 rounded-lg shadow-sm'}>
        <Input {...register("title")}
          label={'Title'}
          name={'title'}
          placeholder={'Event title'}
          errorMessage={errors.title?.message} />

        <Input {...register("description")}
          label={'Description'}
          name={'description'}
          placeholder={'Description'}
          optional={true}
          errorMessage={errors.description?.message} />

        <Typography variant={'lead'} className={'pt-3'}>Calendar</Typography>
        <Controller
          control={control}
          name="options"
          render={({ field: { value, onChange, ...props } }) => (
            <CalendarSection
              options={value}
              setOptions={(value: TimeOption[]) => onChange(value)}
              errorMessage={errors.options?.message}
              {...props}
            />
          )}
        />

        <Typography variant={'lead'} className={'pt-3'}>Settings</Typography>
        <Controller
          control={control}
          name="settings"
          render={({ field: { value, onChange, ...props } }) => (
            <SettingsSection
              selectedSettings={value}
              setSelectedSettings={(value: PollSettings) => onChange(value)}
              {...props}
            />
          )}
        />
      </div>

      <DividerLine className={'my-6'} color={'bg-white'} />

      <Button className={'block mx-auto'} disabled={isSubmitting} type={'submit'}>
        Create a poll
      </Button>
    </Form>
  );
};