import React from "react";
import styles from "../../../styles/InvoiceList.module.css"; // Use your module CSS

const InvoiceList = () => {
    const invoices = [
        { date: "March, 01, 2021", id: "#MS-415646", amount: "$180", pdf: "/pdfs/MS-415646.pdf" },
        { date: "February, 12, 2021", id: "#RV-126749", amount: "$250", pdf: "/pdfs/RV-126749.pdf" },
        { date: "April, 05, 2020", id: "#FB-212562", amount: "$550", pdf: "/pdfs/FB-212562.pdf" },
        { date: "June, 25, 2019", id: "#QW-103578", amount: "$400", pdf: "/pdfs/QW-103578.pdf" },
        { date: "March, 03, 2019", id: "#AR-803481", amount: "$700", pdf: "/pdfs/AR-803481.pdf" },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Invoices</h3>
                <button className={styles.viewAllButton}>VIEW ALL</button>
            </div>
            <ul className={styles.invoiceList}>
                {invoices.map((invoice, index) => (
                    <li key={index} className={styles.invoiceItem}>
                        <div>
                            <p className={styles.date}>{invoice.date}</p>
                            <p className={styles.id}>{invoice.id}</p>
                        </div>
                        <div className={styles.amountContainer}>
                            <p className={styles.amount}>{invoice.amount}</p>
                            <a href={invoice.pdf} className={styles.pdfLink} download>
                                PDF
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvoiceList;
