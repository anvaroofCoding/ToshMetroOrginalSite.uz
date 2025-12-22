import MurojaatlaStatistikasi from "./murojaatlar-statistikasi";
import MetroLostItemForm from "./murojaatlar-uchun";

export default function page() {
  return (
    <div className="py-10">
      <MetroLostItemForm />
      <div>
        <MurojaatlaStatistikasi />
      </div>
    </div>
  );
}
