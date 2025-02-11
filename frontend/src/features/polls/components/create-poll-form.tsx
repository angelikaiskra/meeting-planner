import { Input } from '@/components/ui/form/input.tsx';
import { Form } from '@/components/ui/form/form.tsx';
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from 'react-hook-form';
import Typography from '@/components/ui/typography/typography.tsx';
import SettingsSection from '@/features/polls/components/settings-section.tsx';
import Button from '@/components/ui/button/button.tsx';
import DividerLine from '@/components/ui/divider-line/divider-line.tsx';
import CalendarSection from '@/features/polls/components/calendar-section.tsx';
import { CreateMeetingPollFields, createMeetingPollSchema } from '@/features/polls/schema/create-poll.ts';
import { TimeOption } from '@/types/time.ts';

export const CreatePollForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateMeetingPollFields>({
    resolver: joiResolver(createMeetingPollSchema),
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

  const onSubmitForm = (data: any) => {
    console.log('onSubmit CreatePoll', data);
  };

  return (
    <Form id={'create-poll'} className={'mt-10 max-w-[700px] mx-auto'} onSubmit={handleSubmit(onSubmitForm)}>
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
              {...props}
            />
          )}
        />

        <Typography variant={'lead'} className={'pt-3'}>Settings</Typography>
        <SettingsSection />
      </div>

      <DividerLine className={'my-6'} color={'bg-white'} />

      <Button className={'block mx-auto'}
              disabled={isSubmitting}>
        Create a poll
      </Button>
    </Form>
  );
};