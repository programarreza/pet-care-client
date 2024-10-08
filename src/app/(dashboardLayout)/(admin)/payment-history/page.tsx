import PaymentHistoryCard from "@/src/components/UI/Payment/PaymentHistoryCard";
import { getPayments } from "@/src/services/Payment";

const PaymentHistory = async () => {
  const { data: payments = [] } = await getPayments();

  return (
    <div className="mt-4 ">
      <PaymentHistoryCard payments={payments} />
    </div>
  );
};

export default PaymentHistory;
