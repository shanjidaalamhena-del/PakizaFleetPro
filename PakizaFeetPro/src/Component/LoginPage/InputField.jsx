export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  LeftIcon,
  RightIcon,
  onRightIconClick,
}) {
  return (
    <div className="mb-2">
      <label className="block text-[14px] font-medium text-[#1f2937] mb-2">
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-[40px] rounded-lg border border-[#d2dff0] Sbg-[#E8F0FE] pl-10 pr-10 text-[14px] text-gray-800 bg-blue-50 placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        {RightIcon && (
          <RightIcon
            size={18}
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}