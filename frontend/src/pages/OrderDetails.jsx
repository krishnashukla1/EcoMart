// import { useEffect, useState } from 'react'

// import { useParams, Link } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import API from "../utils/api";

// const OrderDetails = () => {
//   const { id } = useParams()
//   const [order, setOrder] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//         const { data } = await API.get(`/api/orders/${id}`, config)
//         setOrder(data)
//       } catch (error) {
//         toast.error(error.response?.data?.message || 'Error fetching order details')
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchOrder()
//   }, [id])

//   const getStatusBadge = (status) => {
//     const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"

//     switch (status) {
//       case 'Pending': return `${baseClasses} bg-yellow-100 text-yellow-800`
//       case 'Paid': return `${baseClasses} bg-blue-100 text-blue-800`
//       case 'Completed': return `${baseClasses} bg-green-100 text-green-800`
//       case 'Shipped': return `${baseClasses} bg-purple-100 text-purple-800`
//       default: return `${baseClasses} bg-gray-100 text-gray-800`
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
//       </div>
//     )
//   }

//   if (!order) {
//     return (
//       <div className="container p-8 mx-auto text-center">
//         <h1 className="text-2xl font-bold text-gray-800">Order not found</h1>
//         <Link
//           to="/orders"
//           className="inline-block px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
//         >
//           Back to Orders
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div className="container max-w-6xl px-4 py-8 mx-auto">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
//           <p className="text-gray-500">Order ID: {order._id}</p>
//         </div>
//         <Link
//           to="/orders"
//           className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Back to Orders
//         </Link>
//       </div>

//       <div className="grid gap-6 mb-8 md:grid-cols-2">
//         <div className="p-6 bg-white rounded-lg shadow">
//           <h2 className="mb-4 text-xl font-semibold text-gray-800">Order Summary</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Order Status</span>
//               <span className={getStatusBadge(order.status)}>
//                 {order.status}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Date Placed</span>
//               <span className="font-medium">
//                 {new Date(order.createdAt).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit'
//                 })}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Payment Method</span>
//               <span className="font-medium capitalize">{order.paymentMethod}</span>
//             </div>
//             <div className="flex justify-between pt-4 border-t">
//               <span className="text-lg font-semibold">Total Amount</span>
//               <span className="text-lg font-bold">${order.totalPrice.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 bg-white rounded-lg shadow">
//           <h2 className="mb-4 text-xl font-semibold text-gray-800">Shipping Information</h2>
//           <div className="space-y-3">
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Address</h3>
//               <p className="mt-1 text-gray-800">{order.shippingAddress.address}</p>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">City</h3>
//                 <p className="mt-1 text-gray-800">{order.shippingAddress.city}</p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Postal Code</h3>
//                 <p className="mt-1 text-gray-800">{order.shippingAddress.postalCode}</p>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Country</h3>
//               <p className="mt-1 text-gray-800">{order.shippingAddress.country}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6 bg-white rounded-lg shadow">
//         <h2 className="mb-4 text-xl font-semibold text-gray-800">Order Items</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                   Product
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                   Quantity
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                   Price
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                   Subtotal
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//              {order.items.map((item) => (
//   <tr key={item._id} className="border-b">
//     <td className="p-2">
//       <div className="flex items-center">
//         {/* Check if product is populated and has images */}
//         {item.product?.images?.length > 0 ? (
//           <img
//             src={item.product.images[0]}
//             alt={item.name}
//             className="object-cover w-16 h-16 mr-2"
//             onError={(e) => {
//               e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik00IDE2bDQuNTg2LTQuNTg2YTIgMiAwIDAxMi44MjggMEwxNiAxNm0tMi0ybDEuNTg2LTEuNTg2YTIgMiAwIDAxMi44MjggMEwyMCAxNG0tNi02aC4wMU02IDIwaDEyYTIgMiAwIDAwMi0yVjZhMiAyIDAgMDAtMi0ySDZhMiAyIDAgMDAtMiAydjEyYTIgMiAwIDAwMiAyeiI+PC9wYXRoPjwvc3ZnPg==';
//             }}
//           />
//         ) : (
//           <div className="flex items-center justify-center w-16 h-16 mr-2 bg-gray-200">
//             <span className="text-gray-500">No Image</span>
//           </div>
//         )}
//         <div>
//           <div className="font-medium">{item.name}</div>
//           <div className="text-sm text-gray-500">${item.price}</div>
//         </div>
//       </div>
//     </td>
//     <td className="p-2 text-center">{item.qty}</td>
//     <td className="p-2 text-center">${item.price}</td>
//     <td className="p-2 text-center">${(item.price * item.qty).toFixed(2)}</td>
//   </tr>
// ))}

//             </tbody>
//             <tfoot>
//               <tr className="bg-gray-50">
//                 <td colSpan="3" className="px-6 py-3 text-sm font-medium text-right text-gray-500">
//                   Total
//                 </td>
//                 <td className="px-6 py-3 text-sm font-bold text-gray-900">
//                   ${order.totalPrice.toFixed(2)}
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OrderDetails

//-------------------DOWNLOAD INVOICE--------------


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";
import jsPDF from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const { data } = await API.get(`/api/orders/${id}`, config);
        setOrder(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error fetching order details"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const getStatusBadge = (status) => {
    const baseClasses =
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "Paid":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "Completed":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "Shipped":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

const downloadInvoice = () => {
  if (!order) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // ====== HEADER ======
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text("YourStore", 15, 20);

  // ====== INVOICE TITLE ======
  doc.setFontSize(14);
  doc.text(`INVOICE #${order._id.slice(-8).toUpperCase()}`, 15, 35);

  // ====== ORDER SUMMARY ======
  doc.setFontSize(10);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 15, 45);
  doc.text(`Status: ${order.status}`, 15, 50);
  doc.text(`Payment: ${order.paymentMethod}`, 15, 55);

  // ====== DIVIDER LINE ======
  doc.setDrawColor(200); // light gray
  doc.setLineWidth(0.5);
  doc.line(15, 60, 195, 60);

  // ====== CUSTOMER & SHIPPING ======
  const customerY = 70;
  doc.setFontSize(12);
  doc.text("BILLING DETAILS", 15, customerY);
  doc.text(order.user?.name || "Customer", 15, customerY + 7);
  doc.text(order.user?.email || "", 15, customerY + 12);

  doc.text("SHIPPING ADDRESS", 105, customerY);
  doc.text(`${order.shippingAddress?.address || ""}`, 105, customerY + 7);
  doc.text(`${order.shippingAddress?.city || ""}, ${order.shippingAddress?.postalCode || ""}`, 105, customerY + 12);
  doc.text(`${order.shippingAddress?.country || ""}`, 105, customerY + 17);

  // ====== ITEMS TABLE ======
  const tableData = order.items.map((item, index) => [
    index + 1,
    item.name || item.product || "N/A",
    item.qty,
    `$${item.price?.toFixed(2)}`,
    `$${(item.qty * item.price).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 100,
    head: [["#", "Product", "Qty", "Unit Price", "Total"]],
    body: tableData,
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontStyle: 'normal',
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      2: { halign: 'center' },
      3: { halign: 'right' },
      4: { halign: 'right' }
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
      overflow: 'linebreak'
    }
  });

  // ====== TOTALS SECTION ======
// ====== TOTALS SECTION ======
const finalY = doc.lastAutoTable.finalY + 10;

doc.setFontSize(11);
const labelX = 160; // X position for labels
const valueX = 190; // X position for values

doc.text("Subtotal:", labelX, finalY);
doc.text(`$${order.itemsPrice?.toFixed(2)}`, valueX, finalY, { align: "right" });

doc.text("Shipping:", labelX, finalY + 6);
doc.text(`$${order.shippingPrice?.toFixed(2)}`, valueX, finalY + 6, { align: "right" });

doc.text("Tax:", labelX, finalY + 12);
doc.text(`$${order.taxPrice?.toFixed(2)}`, valueX, finalY + 12, { align: "right" });

doc.setFontSize(12);
doc.setFont(undefined, 'bold');
doc.text("Grand Total:", labelX, finalY + 20);
doc.text(`$${order.totalPrice?.toFixed(2)}`, valueX, finalY + 20, { align: "right" });


  // ====== FOOTER ======
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("Thank you for your purchase!", 105, 280, { align: "center" });
  doc.text("YourStore © 2023 | support@yourstore.com", 105, 285, { align: "center" });

  // ====== SAVE PDF ======
  doc.save(`Invoice_${order._id.slice(-8)}.pdf`);
};


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container p-8 mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-800">Order not found</h1>
        <Link
          to="/orders"
          className="inline-block px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
          <p className="text-gray-500">Order ID: {order._id}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={downloadInvoice}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Download Invoice
          </button>
          <Link
            to="/orders"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Back to Orders
          </Link>
        </div>
      </div>

      {/* Order Summary & Shipping */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* Summary */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Status</span>
              <span className={getStatusBadge(order.status)}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date Placed</span>
              <span className="font-medium">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium capitalize">
                {order.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-lg font-bold">
                ${order.totalPrice?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Shipping Information
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="mt-1 text-gray-800">
                {order.shippingAddress?.address || "N/A"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">City</h3>
                <p className="mt-1 text-gray-800">
                  {order.shippingAddress?.city || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Postal Code
                </h3>
                <p className="mt-1 text-gray-800">
                  {order.shippingAddress?.postalCode || "N/A"}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Country</h3>
              <p className="mt-1 text-gray-800">
                {order.shippingAddress?.country || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Order Items
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items?.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-2">
                    <div className="flex items-center">
                      {item.product?.images?.length > 0 ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.name}
                          className="object-cover w-16 h-16 mr-2"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik00IDE2bDQuNTg2LTQuNTg2YTIgMiAwIDAxMi44MjggMEwxNiAxNm0tMi0ybDEuNTg2LTEuNTg2YTIgMiAwIDAxMi44MjggMEwyMCAxNG0tNi02aC4wMU02IDIwaDEyYTIgMiAwIDAwMi0yVjZhMiAyIDAgMDAtMi0ySDZhMiAyIDAgMDAtMiAydjEyYTIgMiAwIDAwMiAyeiI+PC9wYXRoPjwvc3ZnPg==";
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-16 h-16 mr-2 bg-gray-200">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{item.name || "N/A"}</div>
                        <div className="text-sm text-gray-500">
                          ${item.price?.toFixed(2) || "0.00"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-center">{item.qty}</td>
                  <td className="p-2 text-center">${item.price?.toFixed(2) || "0.00"}</td>
                  <td className="p-2 text-center">
                    ${((item.price || 0) * (item.qty || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td
                  colSpan="3"
                  className="px-6 py-3 text-sm font-medium text-right text-gray-500"
                >
                  Total
                </td>
                <td className="px-6 py-3 text-sm font-bold text-gray-900">
                  ${order.totalPrice?.toFixed(2) || "0.00"}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;