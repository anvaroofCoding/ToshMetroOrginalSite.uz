import React from "react";
import MetroLostItemForm from "./murojaatlar-uchun";
import MurojaatlaStatistikasi from "./murojaatlar-statistikasi";

export default function page() {
  return (
    <div>
      <MetroLostItemForm />
      <div>
        <MurojaatlaStatistikasi />
      </div>
    </div>
  );
}
