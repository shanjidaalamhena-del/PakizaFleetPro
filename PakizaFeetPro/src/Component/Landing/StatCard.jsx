import Card from "./Card";
export default function StatCard({ label, value, icon: Icon, iconBg, iconColor }) {
  return (
    <Card className=" h-17 w-60 p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
    </Card>
  );
}