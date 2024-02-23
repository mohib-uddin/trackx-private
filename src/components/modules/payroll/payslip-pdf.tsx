import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

// import { singleInvoiceType } from "@/_utils/types/invoice";
// import Poppins from "@/assets/font/Poppins/Poppins-Medium.ttf";
import Logo from "@/assets/logo.png";

// Font.register({ family: "Poppins", src: Poppins });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    background: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  list: {
    fontSize: 10,
    marginTop: 4,
  },
  ruleSection: {
    width: "80%",
    margin: "auto",
    marginTop: 10,
  },
  image: {
    width: "82px",
    height: "71px",
  },
  heading: {
    textAlign: "center",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "90%",
    margin: "5 auto",
  },
  customerSection: {
    width: "90%",
    margin: "10 auto",
    height: "100px",
    backgroundColor: "#0D3E38",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  customerName: {
    fontSize: "16px",
    color: "#FFFFFF",
    fontWeight: 700,
  },
  customerEmail: {
    fontWeight: 500,
    fontSize: "12px",
    opacity: 0.4,
    color: "#FFFFFF",
  },
  customerAddress: {
    width: "20%",
    textAlign: "right",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: 500,
  },
  invoiceDetailsSection: {
    width: "90%",
    height: "100px",
    backgroundColor: "rgba(99, 75, 102, 0.05)",
    margin: "0 auto",
    padding: 30,
  },
  consignmentDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  consignmentDetailsText: {
    fontSize: "10px",
    opacity: 0.4,
    color: "#18020C",
  },
  consignmentDetailsHeading: {
    fontSize: "12px",
    opacity: 0.4,
    color: "#18020C",
  },
  itemDetailSection: {
    width: "90%",
    margin: "30 auto",
  },
  itemDetailHeading: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#18020C",
  },
  table: {
    display: "flex",
    width: "90%",
    margin: "20 auto",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
  },
  tableHeaderCell: {
    width: "25%",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "12px",
    opacity: 0.4,
    color: "#18020C",
  },
  tableCell: {
    width: "25%",
    textAlign: "center",
    fontSize: "12px",
    color: "#18020C",
    fontWeight: 500,
    height: "40px",
    padding: "10px",
  },
  invoiceSummary: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  invoiceSummaryText: {
    color: "#18020C",
    textAlign: "right",
    fontSize: "12px",
    fontWeight: 700,
    gap: 10,
  },
  invoiceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 40,
    marginRight: 40,
    marginTop: 10,
  },
});

interface invoiceProps {
  invoice: any;
}
const InvoicePDF = ({ invoice }: invoiceProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.image} src={Logo} />
        </View>

        <View style={styles.customerSection}>
          <View>
            <Text style={styles.customerName}>
              {invoice?.data.user.firstName} {invoice?.data.user.lastName}
            </Text>
            <Text style={styles.customerEmail}>{invoice?.data.user.email}</Text>
            <Text style={styles.customerEmail}>{invoice?.data.user.phone}</Text>
          </View>
          <View style={styles.customerAddress}>
            <Text>{invoice?.data.user.address}</Text>
          </View>
        </View>

        <View style={styles.invoiceDetailsSection}>
          <View style={styles.consignmentDetails}>
            <View>
              <Text style={styles.consignmentDetailsText}>
                <Text style={styles.consignmentDetailsHeading}>
                  Invoice ID:
                </Text>{" "}
                {invoice?.data._id}
              </Text>
              <Text style={styles.consignmentDetailsText}>
                <Text style={styles.consignmentDetailsHeading}>
                  Issued Date:
                </Text>
                {invoice?.data.createdAt.split("T")[0]}
              </Text>
            </View>
            <View>
              <Text style={styles.consignmentDetailsText}>
                <Text style={styles.consignmentDetailsHeading}>
                  Consignment ID:
                </Text>
                {invoice?.data.consignment._id}
              </Text>
              <Text style={styles.consignmentDetailsText}>
                <Text style={styles.consignmentDetailsHeading}>Order ID:</Text>
                {invoice?.data.consignment.order._id}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.itemDetailSection}>
          <Text style={styles.itemDetailHeading}>Item Details</Text>
          <Text style={styles.consignmentDetailsText}>
            Details with more info
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>Product Name</Text>
              <Text style={styles.tableHeaderCell}>Items</Text>
              <Text style={styles.tableHeaderCell}>Amount</Text>
            </View>

            {invoice?.data.consignment.order.products.map(
              (e: any, index: number) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{e.product.name}</Text>
                  <Text style={styles.tableCell}>{e.soldQuantity}</Text>
                  <Text style={styles.tableCell}>
                    ${Number(e.amount.toFixed(2))}
                  </Text>
                </View>
              ),
            )}
          </View>
        </View>

        <View style={styles.invoiceSummary}>
          <View style={styles.invoiceSection}>
            <Text style={styles.invoiceSummaryText}>Total</Text>
            <Text style={styles.invoiceSummaryText}>
              ${invoice?.data.consignment.order.total}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
