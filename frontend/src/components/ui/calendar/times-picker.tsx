import TimePicker from "./time-picker.tsx";

const TimesPicker = ({ timeOptions }) => {
  return (
    <div className={"border border-gray-200 h-14 rounded-md flex items-center justify-between p-1 w-full max-lg:max-w-77"}>
      {/*<TimePicker />*/}

      <span className={"block w-2 h-px bg-font-black"}></span>

      {/*<TimePicker />*/}
    </div>
  );
};

export default TimesPicker;