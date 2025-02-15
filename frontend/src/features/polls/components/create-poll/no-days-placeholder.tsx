import { Calendar } from "@phosphor-icons/react"

const NoDaysPlaceholder = () => {

    return (
        <div
            className={'flex flex-col gap-4 justify-center items-center text-gray-300 text-center m-auto md:py-6 px-10 max-w-77'}>
            <Calendar size={48} />
            <span>Click on a date in the calendar to get started</span>
        </div>
    )
}

export default NoDaysPlaceholder;