// import CalendarDay from '@/components/ui/calendar/calendar-day.tsx';
// import { X, Plus, DotsThree } from '@phosphor-icons/react';
// import IconButton from '@/components/ui/button/icon-button.tsx';
// import { TimeOption } from '@/types/time.ts';
// import TimePicker from '@/components/ui/calendar/time-picker.tsx';
// import { SingleValue } from 'react-select';
// import { SelectOption } from '@/types/forms.ts';
// import { formatHoursAndMinutes } from '@/utils/time.ts';
// import { MouseEventHandler, MouseEvent, useContext, useState } from 'react';
// import { SelectedOptionsContext, SelectedOptionsContextType } from '@/features/polls/context/selected-options-context.tsx';
//
// interface SelectedDateProps {
//   dateString: string;
// }
//
// const SelectedDate = ({ dateString }: SelectedDateProps) => {
//   const {
//     selectedOptions,
//     updateTime,
//     addNewTimeOption,
//     removeTimeOption
//   } = useContext(SelectedOptionsContext) as SelectedOptionsContextType;
//   const [addingTimeDisabled, setAddingTimeDisabled] = useState(false);
//
//   const date = new Date(dateString);
//   const monthName = date.toLocaleString('en-US', { month: 'short' });
//   const dayNumber = date.getDate();
//   const dateOptionsArr = selectedOptions[dateString];
//
//   const getTimePickerOption = (timeVal: TimeValue) => (
//     { label: formatHoursAndMinutes(timeVal.hours, timeVal.minutes), value: timeVal }
//   );
//
//   const onChangeTimePicker = (index: number, propertyName: keyof TimeOption, newTime: SingleValue<SelectOption<TimeValue>>) => {
//     if (!newTime?.value) return;
//
//     updateTime(dateString, index, propertyName, newTime.value);
//   };
//
//   const onAddTimeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
//     e.preventDefault();
//
//     console.log(dateOptionsArr.length);
//     if (dateOptionsArr.length >= 9) {
//       setAddingTimeDisabled(true);
//     }
//
//     addNewTimeOption(dateString);
//   }
//
//   const onRemoveTimeClick = (e: MouseEvent<HTMLButtonElement>, index: number) => {
//     e.preventDefault();
//     removeTimeOption(dateString, index);
//
//     console.log(dateOptionsArr.length);
//     if (dateOptionsArr.length <= 10) {
//       setAddingTimeDisabled(false);
//     }
//   }
//
//   const onShowTimeMenu = (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     console.log("Show time option menu");
//   }
//
//   const renderTimeSlot = () => {
//     if (!dateOptionsArr) return null;
//
//     return dateOptionsArr.map((timeOption, index) => {
//       return (
//         <div key={index} className={'flex'}>
//           {renderTimesPicker(timeOption, index)}
//
//           <div className={'h-14 flex items-center'}>
//             <IconButton icon={X} weight={'bold'} fill={'#717171'} btnClassName={'translate-x-1.5'}
//                         onClick={(e) => onRemoveTimeClick(e, index)} />
//           </div>
//         </div>
//       )
//     });
//   }
//
//   const renderTimesPicker = (timeOption: TimeOption, index: number) => {
//       const startTimePickerVal = getTimePickerOption(timeOption.startTime);
//       const endTimePickerVal = getTimePickerOption(timeOption.endTime);
//
//       return (
//         <div className={'border border-gray-200 h-14 rounded-md flex items-center justify-between p-1 w-full max-lg:max-w-77'}>
//           <TimePicker selectedOption={startTimePickerVal}
//                       onChange={(newTime) => onChangeTimePicker(index, 'startTime', newTime)} />
//
//           <span className={'block w-2 h-px bg-font-black'}></span>
//
//           <TimePicker selectedOption={endTimePickerVal}
//                       onChange={(newTime) => onChangeTimePicker(index, 'endTime', newTime)} />
//         </div>
//       );
//   };
//
//   return (
//     <div className={'max-md:w-full flex max-md:justify-center'}>
//       <CalendarDay monthName={monthName} dayNumber={dayNumber} />
//
//       <div className={'md:flex-1 flex flex-col gap-y-3 ml-3'}>
//         {renderTimeSlot()}
//
//         <div className={'flex gap-x-2'}>
//           <div className={'border border-gray-200 rounded-md h-fit'}>
//             <IconButton icon={Plus} weight={'bold'} fill={'#0D1216'} btnClassName={'px-3 py-2'}
//                         onClick={onAddTimeClick} disabled={addingTimeDisabled}>
//               Add times
//             </IconButton>
//           </div>
//
//           <IconButton icon={DotsThree} size={24} weight={'bold'} fill={'#717171'} btnClassName={'p-2'}
//                       onClick={onShowTimeMenu} />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default SelectedDate;