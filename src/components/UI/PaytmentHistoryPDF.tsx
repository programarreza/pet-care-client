"use client";

import { IPayment } from "@/src/types";
import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
    padding: 10,
    
  },
  text: {
    fontSize: 12,
  },
});

const PaymentHistoryPDF = ({ payments }: { payments: IPayment[] }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Payment History</Text>
        <View style={styles.row}>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text}>Status</Text>
          <Text style={styles.text}>Amount</Text>
          <Text style={styles.text}>Transaction ID</Text>
        </View>
        {payments.map((payment) => (
          <View key={payment.transactionId} style={styles.row}>
            <Text style={styles.text}>
              {new Date(payment?.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.text}>{payment.paymentStatus}</Text>
            <Text style={styles.text}>{payment.paymentAmount} Tk</Text>
            <Text style={styles.text}>{payment.transactionId}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PaymentHistoryPDF;
