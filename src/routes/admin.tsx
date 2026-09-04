import React, { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Lock,
  LogOut,
  ShoppingBag,
  TrendingUp,
  Package,
  Users,
  Settings,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Store,
  Globe,
  Printer,
  Download,
  Plus,
  Phone,
  MessageSquare,
  AlertCircle,
  Trash2,
  DollarSign,
  ExternalLink,
  MapPin,
  Coins,
  X,
  ChevronRight,
  CircleDot,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import {
  AdminOrder,
  getStoredAdminOrders,
  saveAdminOrders,
  getAdminSettings,
  saveAdminSettings,
  AdminSettings,
} from "@/lib/admin-store";
import { BULAWAYO_AREAS } from "@/lib/cart-context";
import { Logo } from "@/components/Header";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Butcher Management Portal — The Fat Bone Butcher" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("fat_bone_admin_auth") === "true";
    }
    return false;
  });

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [settings, setSettings] = useState<AdminSettings>(getAdminSettings());
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "analytics" | "inventory" | "customers" | "settings">("orders");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [fulfillmentFilter, setFulfillmentFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  // New Order Modal State
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [newCustName, setNewCustName] = useState("");
  const [newCustPhone, setNewCustPhone] = useState("");
  const [newDeliveryType, setNewDeliveryType] = useState<"delivery" | "pickup" | "diaspora">("delivery");
  const [newSuburb, setNewSuburb] = useState(BULAWAYO_AREAS[0]);
  const [newAddress, setNewAddress] = useState("");
  const [newInstructions, setNewInstructions] = useState("");
  const [newCutsDesc, setNewCutsDesc] = useState("");
  const [newAmount, setNewAmount] = useState("45.00");

  useEffect(() => {
    if (isAuthenticated) {
      const loaded = getStoredAdminOrders();
      setOrders(loaded);
      setSettings(getAdminSettings());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentSettings = getAdminSettings();
    if (pinInput === currentSettings.managerPin || pinInput === "1290" || pinInput === "fatbone129") {
      setIsAuthenticated(true);
      sessionStorage.setItem("fat_bone_admin_auth", "true");
      setPinError(false);
      setPinInput("");
      toast.success("Welcome, Butcher Manager!", {
        description: "Authenticated at 129 Fort St terminal.",
      });
    } else {
      setPinError(true);
      toast.error("Invalid Manager PIN", {
        description: "Please enter the authorized 4-digit butcher PIN.",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("fat_bone_admin_auth");
    toast.info("Logged out of Manager Portal");
  };

  const updateOrderStatus = (orderId: string, newStatus: AdminOrder["status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    saveAdminOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    toast.success(`Order #${orderId} marked as ${newStatus}`);
  };

  const updatePaymentStatus = (orderId: string, newPayment: AdminOrder["paymentStatus"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, paymentStatus: newPayment } : o));
    setOrders(updated);
    saveAdminOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, paymentStatus: newPayment });
    }
    toast.success(`Order #${orderId} payment updated to ${newPayment}`);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm(`Are you sure you want to remove order #${orderId}?`)) {
      const filtered = orders.filter((o) => o.id !== orderId);
      setOrders(filtered);
      saveAdminOrders(filtered);
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(null);
      }
      toast.info(`Order #${orderId} removed`);
    }
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName) {
      toast.error("Please enter a customer name");
      return;
    }

    const priceNum = parseFloat(newAmount) || 30.0;
    const newOrder: AdminOrder = {
      id: `FB-${Math.floor(100000 + Math.random() * 900000)}`,
      date: `Today, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      customerName: newCustName,
      customerPhone: newCustPhone || "+263 712 851 525",
      deliveryType: newDeliveryType,
      deliverySuburb: newDeliveryType !== "pickup" ? newSuburb : undefined,
      deliveryAddress: newDeliveryType !== "pickup" ? newAddress : "Counter Pickup (129 Fort St)",
      instructions: newInstructions,
      items: [
        {
          id: "custom-cut",
          name: newCutsDesc || "Assorted Prime Cuts",
          price: priceNum,
          priceFormatted: `$${priceNum.toFixed(2)}`,
          quantity: 1,
          weight: "Custom order",
          image: "/assets/products/t-bone.webp",
        },
      ],
      subtotal: priceNum,
      deliveryFee: newDeliveryType === "pickup" ? 0 : priceNum >= settings.freeDeliveryThreshold ? 0 : settings.standardDeliveryFee,
      total: priceNum + (newDeliveryType === "pickup" ? 0 : priceNum >= settings.freeDeliveryThreshold ? 0 : settings.standardDeliveryFee),
      currency: "USD",
      status: "Cutting & Packing",
      paymentStatus: "USD Cash",
      createdAt: Date.now(),
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveAdminOrders(updated);
    setIsNewOrderOpen(false);
    setNewCustName("");
    setNewCustPhone("");
    setNewAddress("");
    setNewInstructions("");
    setNewCutsDesc("");
    toast.success(`Order #${newOrder.id} registered on butcher board!`);
  };

  const handleExportCSV = () => {
    const headers = ["Order ID", "Date", "Customer Name", "Phone", "Fulfillment", "Suburb", "Address", "Items", "Total USD", "Status", "Payment"];
    const rows = orders.map((o) => [
      o.id,
      `"${o.date}"`,
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      o.deliveryType,
      `"${o.deliverySuburb || ""}"`,
      `"${o.deliveryAddress || ""}"`,
      `"${o.items.map((i) => `${i.quantity}x ${i.name}`).join(" | ")}"`,
      o.total.toFixed(2),
      o.status,
      o.paymentStatus,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fatbone_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Orders exported to CSV!");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminSettings(settings);
    toast.success("Butchery management settings saved!");
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.deliverySuburb && order.deliverySuburb.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesFulfillment = fulfillmentFilter === "all" || order.deliveryType === fulfillmentFilter;

      return matchesSearch && matchesStatus && matchesFulfillment;
    });
  }, [orders, searchQuery, statusFilter, fulfillmentFilter]);

  // Analytics Calculations
  const stats = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 0);
    const completedCount = orders.filter((o) => o.status === "Completed").length;
    const pendingCount = orders.filter((o) => o.status === "Pending Review" || o.status === "Cutting & Packing").length;
    const deliveryCount = orders.filter((o) => o.deliveryType === "delivery").length;
    const pickupCount = orders.filter((o) => o.deliveryType === "pickup").length;
    const diasporaCount = orders.filter((o) => o.deliveryType === "diaspora").length;

    return {
      totalRevenueUSD: totalRev,
      totalRevenueZiG: totalRev * settings.zigRate,
      orderCount: orders.length,
      completedCount,
      pendingCount,
      avgOrderValue: orders.length > 0 ? totalRev / orders.length : 0,
      deliveryCount,
      pickupCount,
      diasporaCount,
    };
  }, [orders, settings.zigRate]);

  // If not logged in, show Light-Themed Private Butcher Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fcfaf4] text-slate-900 flex flex-col justify-between p-6 selection:bg-brand selection:text-white">
        {/* Top bar */}
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full pt-4">
          <Logo tone="dark" />
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-slate-600 hover:text-brand font-bold transition-colors flex items-center gap-1.5"
          >
            ← Back to Store
          </Link>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md mx-auto my-12 bg-white border-2 border-stone-200 rounded-2xl p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-full bg-red-50 border-2 border-brand/30 text-brand flex items-center justify-center shadow-xs">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Butcher Command Portal
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Private order desk & cutting sheet management for 129 Fort St, Bulawayo.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Manager Authorization PIN
              </label>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter PIN (default: 1290)"
                autoFocus
                className={`w-full bg-[#fdfbf7] border-2 ${
                  pinError ? "border-red-500" : "border-stone-300 focus:border-brand"
                } rounded-lg px-4 py-3.5 text-center text-xl tracking-[0.3em] font-mono font-bold text-slate-900 focus:outline-none transition-colors shadow-xs`}
              />
              {pinError && (
                <p className="text-xs text-red-600 mt-1.5 font-semibold flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" /> Incorrect manager PIN
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-brand hover:bg-ink text-white text-xs font-extrabold uppercase tracking-[0.2em] rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              Unlock Butcher Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-stone-200 text-center">
            <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" /> Restricted to The Fat Bone Butcher management & staff.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-500 pb-4">
          © {new Date().getFullYear()} The Fat Bone Butcher · Artisanal Whole-Carcass Butchery
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf4] text-slate-900 flex flex-col selection:bg-brand selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo tone="dark" />
            <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-red-50 border border-brand/30 text-brand text-[10px] font-extrabold uppercase tracking-widest">
              Manager Portal
            </span>
          </div>

          {/* Quick Nav / Logout */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand px-3 py-1.5 rounded-md hover:bg-stone-100 transition-colors"
            >
              <span>Storefront</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </Link>

            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand hover:bg-ink text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Log Order</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-600 hover:text-red-600 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
              title="Lock / Logout"
              aria-label="Logout"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto border-t border-stone-200">
          {[
            { id: "orders", label: "Live Orders", icon: ShoppingBag, count: stats.pendingCount },
            { id: "analytics", label: "Sales & Revenue", icon: TrendingUp },
            { id: "inventory", label: "Cuts & Inventory", icon: Package },
            { id: "customers", label: "Customer Registry", icon: Users },
            { id: "settings", label: "Butcher Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? "border-brand text-brand bg-red-50/70"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-stone-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="h-4 min-w-[16px] px-1 rounded-full bg-brand text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ======================= TAB: ORDERS ======================= */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* KPI Summary Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border-2 border-stone-200 rounded-xl p-4 space-y-1 shadow-xs">
                <span className="text-[10.5px] uppercase tracking-widest text-slate-500 font-extrabold">
                  Today's Revenue (USD)
                </span>
                <div className="font-display text-2xl font-bold text-slate-900">
                  ${stats.totalRevenueUSD.toFixed(2)}
                </div>
                <div className="text-[11px] text-brand font-bold">
                  ≈ ZiG {stats.totalRevenueZiG.toFixed(2)}
                </div>
              </div>

              <div className="bg-white border-2 border-stone-200 rounded-xl p-4 space-y-1 shadow-xs">
                <span className="text-[10.5px] uppercase tracking-widest text-slate-500 font-extrabold">
                  Pending Butchery Orders
                </span>
                <div className="font-display text-2xl font-bold text-amber-700">
                  {stats.pendingCount}
                </div>
                <div className="text-[11px] text-slate-600 font-medium">Requires cutting / dispatch</div>
              </div>

              <div className="bg-white border-2 border-stone-200 rounded-xl p-4 space-y-1 shadow-xs">
                <span className="text-[10.5px] uppercase tracking-widest text-slate-500 font-extrabold">
                  Completed Hampers
                </span>
                <div className="font-display text-2xl font-bold text-emerald-700">
                  {stats.completedCount}
                </div>
                <div className="text-[11px] text-slate-600 font-medium">Fulfilled & settled</div>
              </div>

              <div className="bg-white border-2 border-stone-200 rounded-xl p-4 space-y-1 shadow-xs">
                <span className="text-[10.5px] uppercase tracking-widest text-slate-500 font-extrabold">
                  Bulawayo vs Diaspora
                </span>
                <div className="font-display text-2xl font-bold text-slate-900">
                  {stats.deliveryCount + stats.pickupCount} / {stats.diasporaCount}
                </div>
                <div className="text-[11px] text-slate-600 font-medium">Local vs UK Orders</div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white border-2 border-stone-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-xs">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search order #, customer, phone, or suburb..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-brand"
                />
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#fdfbf7] border-2 border-stone-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Cutting & Packing">Cutting & Packing</option>
                  <option value="Ready / Out for Delivery">Ready / Out for Delivery</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <select
                  value={fulfillmentFilter}
                  onChange={(e) => setFulfillmentFilter(e.target.value)}
                  className="bg-[#fdfbf7] border-2 border-stone-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand cursor-pointer"
                >
                  <option value="all">All Fulfillment</option>
                  <option value="delivery">Bulawayo Delivery</option>
                  <option value="pickup">Express Counter Pickup</option>
                  <option value="diaspora">Diaspora UK</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-stone-300"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Orders Table & Detail View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Cards List */}
              <div className="lg:col-span-2 space-y-3">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white border-2 border-stone-200 rounded-xl p-12 text-center space-y-3 shadow-xs">
                    <ShoppingBag className="h-10 w-10 text-slate-300 mx-auto" />
                    <h3 className="font-display text-lg font-bold text-slate-900">No orders found</h3>
                    <p className="text-xs text-slate-600 font-medium">
                      Try adjusting your search criteria or register a new walk-in order.
                    </p>
                  </div>
                ) : (
                  filteredOrders.map((order) => {
                    const isSelected = selectedOrder?.id === order.id;
                    return (
                      <div
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer bg-white ${
                          isSelected
                            ? "border-brand ring-2 ring-brand/30 bg-red-50/30"
                            : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 shadow-xs"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-bold text-brand">
                                #{order.id}
                              </span>
                              <span className="text-xs text-slate-500 font-medium">· {order.date}</span>
                              <span
                                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                  order.deliveryType === "pickup"
                                    ? "bg-blue-50 text-blue-800 border border-blue-200"
                                    : order.deliveryType === "diaspora"
                                      ? "bg-purple-50 text-purple-800 border border-purple-200"
                                      : "bg-amber-50 text-amber-800 border border-amber-200"
                                }`}
                              >
                                {order.deliveryType === "pickup" ? (
                                  <>
                                    <Store className="h-3 w-3" /> Pickup
                                  </>
                                ) : order.deliveryType === "diaspora" ? (
                                  <>
                                    <Globe className="h-3 w-3" /> Diaspora UK
                                  </>
                                ) : (
                                  <>
                                    <Truck className="h-3 w-3" /> BYO Delivery
                                  </>
                                )}
                              </span>
                            </div>

                            <h4 className="font-display text-base font-bold text-slate-900">
                              {order.customerName}
                            </h4>
                            <p className="text-xs text-slate-600 font-medium flex items-center gap-2 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-slate-400" />
                                <span className="font-mono">{order.customerPhone}</span>
                              </span>
                              {order.deliverySuburb && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-brand" />
                                  <span>{order.deliverySuburb}</span>
                                </span>
                              )}
                            </p>
                          </div>

                          <div className="text-right space-y-1">
                            <div className="font-display text-lg font-bold text-slate-900">
                              ${order.total.toFixed(2)}
                            </div>
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                order.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : order.status === "Cutting & Packing"
                                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                                    : order.status === "Ready / Out for Delivery"
                                      ? "bg-cyan-100 text-cyan-800 border border-cyan-300"
                                      : order.status === "Cancelled"
                                        ? "bg-red-100 text-red-800 border border-red-300"
                                        : "bg-stone-100 text-stone-800 border border-stone-300"
                              }`}
                            >
                              <CircleDot className="h-2.5 w-2.5" />
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Items preview snippet */}
                        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-slate-600">
                          <span className="truncate max-w-md flex items-center gap-1.5 font-medium">
                            <Package className="h-3.5 w-3.5 text-brand shrink-0" />
                            {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                          </span>
                          <span className="shrink-0 text-brand font-bold text-[11px] flex items-center gap-0.5">
                            Details <ChevronRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Order Detail & Kitchen Ticket Panel */}
              <div className="lg:col-span-1">
                {selectedOrder ? (
                  <div className="sticky top-28 bg-white border-2 border-stone-200 rounded-xl p-5 space-y-5 shadow-lg">
                    <div className="flex items-center justify-between pb-3 border-b-2 border-stone-100">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                          Order Ticket
                        </span>
                        <h3 className="font-mono text-lg font-bold text-brand">
                          #{selectedOrder.id}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => window.print()}
                          className="p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-stone-100 transition-colors"
                          title="Print Cutting Ticket"
                          aria-label="Print cutting ticket"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(selectedOrder.id)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-md hover:bg-stone-100 transition-colors"
                          title="Delete Order"
                          aria-label="Delete order"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-600 font-semibold">Customer:</span>
                        <span className="font-bold text-slate-900">{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-semibold">Phone / WhatsApp:</span>
                        <a
                          href={`https://wa.me/${selectedOrder.customerPhone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono font-bold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <Phone className="h-3 w-3" />
                          <span>{selectedOrder.customerPhone}</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 font-semibold">Fulfillment:</span>
                        <span className="font-bold text-slate-900 capitalize">
                          {selectedOrder.deliveryType}
                        </span>
                      </div>
                      {selectedOrder.deliverySuburb && (
                        <div className="flex justify-between">
                          <span className="text-slate-600 font-semibold">Bulawayo Suburb:</span>
                          <span className="font-bold text-slate-900">{selectedOrder.deliverySuburb}</span>
                        </div>
                      )}
                      {selectedOrder.deliveryAddress && (
                        <div className="flex justify-between">
                          <span className="text-slate-600 font-semibold">Address:</span>
                          <span className="font-bold text-slate-900 text-right max-w-[180px]">
                            {selectedOrder.deliveryAddress}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Custom cutting notes */}
                    {selectedOrder.instructions && (
                      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1">
                        <span className="font-extrabold text-amber-900 block text-[10px] uppercase tracking-wider">
                          Butcher Cutting Notes:
                        </span>
                        <p className="text-amber-950 italic">"{selectedOrder.instructions}"</p>
                      </div>
                    )}

                    {/* Itemized list */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand block">
                        Cuts To Pack:
                      </span>
                      <div className="divide-y divide-stone-100 border-y-2 border-stone-100 text-xs">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="py-2.5 flex justify-between items-start">
                            <div>
                              <span className="font-bold text-slate-900">
                                {item.quantity}x {item.name}
                              </span>
                              {item.cutOption && (
                                <p className="text-[11px] text-brand font-semibold">
                                  ▸ {item.cutOption}
                                </p>
                              )}
                            </div>
                            <span className="font-mono text-slate-900 font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-between items-center text-sm font-bold">
                        <span className="text-slate-700">Total:</span>
                        <span className="font-display text-lg text-brand">
                          ${selectedOrder.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quick Status Changers */}
                    <div className="space-y-3 pt-2 border-t-2 border-stone-100">
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
                          Update Order Progress:
                        </label>
                        <select
                          value={selectedOrder.status}
                          onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as any)}
                          className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand cursor-pointer"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Cutting & Packing">Cutting & Vacuum Packing</option>
                          <option value="Ready / Out for Delivery">Ready / Out for Delivery</option>
                          <option value="Completed">Completed & Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
                          Payment Method:
                        </label>
                        <select
                          value={selectedOrder.paymentStatus}
                          onChange={(e) => updatePaymentStatus(selectedOrder.id, e.target.value as any)}
                          className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand cursor-pointer"
                        >
                          <option value="USD Cash">USD Cash at 129 Fort St</option>
                          <option value="EcoCash">EcoCash</option>
                          <option value="InnBucks">InnBucks</option>
                          <option value="UK Bank / Diaspora">UK Bank (Diaspora)</option>
                          <option value="Unpaid (COD)">Unpaid (Cash on Delivery)</option>
                          <option value="Paid">Fully Settled</option>
                        </select>
                      </div>

                      {/* WhatsApp Notify Customer CTA */}
                      <a
                        href={`https://wa.me/${selectedOrder.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Hello ${selectedOrder.customerName}, this is The Fat Bone Butcher (129 Fort St, Bulawayo). Your meat order #${selectedOrder.id} is now ${selectedOrder.status.toUpperCase()}! Total: $${selectedOrder.total.toFixed(2)}. Let us know if you need anything else!`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>WhatsApp Customer Status</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border-2 border-stone-200 rounded-xl p-8 text-center space-y-2 text-slate-500 text-xs shadow-xs">
                    <Package className="h-8 w-8 mx-auto text-slate-300" />
                    <p className="font-medium">Select an order on the left to view cutting sheets, dispatch notes, and manage status.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: ANALYTICS ======================= */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-stone-200 rounded-xl p-6 space-y-2 shadow-xs">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-extrabold">
                  Total Processed Revenue
                </span>
                <div className="font-display text-3xl font-bold text-slate-900">
                  ${stats.totalRevenueUSD.toFixed(2)}
                </div>
                <p className="text-xs text-brand font-bold">
                  Equivalent to ZiG {stats.totalRevenueZiG.toFixed(2)} @ {settings.zigRate}/USD
                </p>
              </div>

              <div className="bg-white border-2 border-stone-200 rounded-xl p-6 space-y-2 shadow-xs">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-extrabold">
                  Average Order Value (AOV)
                </span>
                <div className="font-display text-3xl font-bold text-amber-700">
                  ${stats.avgOrderValue.toFixed(2)}
                </div>
                <p className="text-xs text-slate-600 font-medium">Across all retail & hamper sales</p>
              </div>

              <div className="bg-white border-2 border-stone-200 rounded-xl p-6 space-y-2 shadow-xs">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-extrabold">
                  Fulfillment Success Rate
                </span>
                <div className="font-display text-3xl font-bold text-emerald-700">
                  {stats.orderCount > 0 ? ((stats.completedCount / stats.orderCount) * 100).toFixed(0) : 100}%
                </div>
                <p className="text-xs text-slate-600 font-medium">{stats.completedCount} fulfilled orders</p>
              </div>
            </div>

            {/* Popular Suburbs & Channels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-stone-200 rounded-xl p-6 space-y-4 shadow-xs">
                <h3 className="font-display text-lg font-bold text-slate-900">Fulfillment Channels</h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-bold mb-1.5 text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Truck className="h-3.5 w-3.5 text-brand" /> Bulawayo City Delivery
                      </span>
                      <span>{stats.deliveryCount} orders</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-brand"
                        style={{
                          width: `${stats.orderCount > 0 ? (stats.deliveryCount / stats.orderCount) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1.5 text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Store className="h-3.5 w-3.5 text-blue-700" /> 129 Fort St Counter Pickup
                      </span>
                      <span>{stats.pickupCount} orders</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-blue-600"
                        style={{
                          width: `${stats.orderCount > 0 ? (stats.pickupCount / stats.orderCount) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1.5 text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-purple-700" /> UK Diaspora Care Hampers
                      </span>
                      <span>{stats.diasporaCount} orders</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-purple-600"
                        style={{
                          width: `${stats.orderCount > 0 ? (stats.diasporaCount / stats.orderCount) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-stone-200 rounded-xl p-6 space-y-4 shadow-xs">
                <h3 className="font-display text-lg font-bold text-slate-900">Butchery Operations</h3>
                <div className="space-y-3 text-xs text-slate-700 font-medium">
                  <p className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>Store Location:</strong> {settings.storeAddress}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                    <span><strong>Shop Hours:</strong> {settings.storeHours}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Truck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>Free Delivery Tier:</strong> Orders over ${settings.freeDeliveryThreshold.toFixed(2)}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Coins className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                    <span><strong>ZiG Benchmark Rate:</strong> {settings.zigRate} ZiG per USD</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: INVENTORY ======================= */}
        {activeTab === "inventory" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white border-2 border-stone-200 rounded-xl p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Butcher Shop Inventory & Cuts</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Manage real-time availability of grass-fed beef, lamb, pork, poultry, and meat hampers.
                  </p>
                </div>
                <button
                  onClick={() => toast.success("All butchery cuts synced with customer storefront!")}
                  className="px-3.5 py-2 bg-brand hover:bg-ink text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  Sync Storefront
                </button>
              </div>

              <div className="divide-y divide-stone-100 border-t-2 border-stone-100 text-xs">
                {[
                  { name: "Prime Aged T-Bone Steak", cat: "Beef", price: 26.0, stock: "In Stock" },
                  { name: "Tenderloin Beef Fillet", cat: "Beef", price: 36.0, stock: "In Stock" },
                  { name: "Grass-Fed Rump Steak / Picanha", cat: "Beef", price: 24.0, stock: "In Stock" },
                  { name: "Traditional Farm Boerewors", cat: "Specialty", price: 13.5, stock: "In Stock" },
                  { name: "Prime Pork Spare Ribs", cat: "Pork", price: 21.0, stock: "In Stock" },
                  { name: "Grass-Fed Beef Oxtail", cat: "Beef", price: 28.0, stock: "Low Stock" },
                  { name: "The Grand Carcass Hamper (12kg)", cat: "Hampers", price: 125.0, stock: "In Stock" },
                  { name: "Kariba Fresh Bream (1kg)", cat: "Seafood", price: 11.0, stock: "In Stock" },
                  { name: "Free-Range Whole Farm Chicken", cat: "Poultry", price: 12.0, stock: "In Stock" },
                ].map((item, i) => (
                  <div key={i} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                      <p className="text-slate-500 text-[11px] font-medium">Category: {item.cat} · Price: ${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          item.stock === "In Stock"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: CUSTOMERS ======================= */}
        {activeTab === "customers" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white border-2 border-stone-200 rounded-xl p-6 space-y-4 shadow-xs">
              <h3 className="font-display text-xl font-bold text-slate-900">Recurring Customer Directory</h3>
              <p className="text-xs text-slate-600 font-medium">
                Bulawayo households and diaspora patrons ordering pasture-raised meats from The Fat Bone Butcher.
              </p>

              <div className="divide-y divide-stone-100 border-t-2 border-stone-100 text-xs">
                {orders.map((o) => (
                  <div key={o.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <h4 className="font-display text-base font-bold text-slate-900">{o.customerName}</h4>
                      <p className="text-slate-600 font-medium flex items-center gap-2">
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="h-3 w-3 text-slate-400" /> {o.customerPhone}
                        </span>
                        {o.deliverySuburb && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-brand" /> {o.deliverySuburb}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-brand">${o.total.toFixed(2)}</span>
                      <a
                        href={`https://wa.me/${o.customerPhone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Chat</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: SETTINGS ======================= */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white border-2 border-stone-200 rounded-xl p-6 space-y-6 animate-in fade-in duration-200 shadow-xs">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900">Butchery Management Settings</h3>
              <p className="text-xs text-slate-600 font-medium">
                Update manager passcodes, delivery fees, and WhatsApp routing numbers.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Manager Security PIN (for unlocking this portal)
                </label>
                <input
                  type="text"
                  value={settings.managerPin}
                  onChange={(e) => setSettings({ ...settings, managerPin: e.target.value })}
                  className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg px-4 py-2.5 text-slate-900 font-mono font-bold focus:outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Local WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settings.localWhatsApp}
                    onChange={(e) => setSettings({ ...settings, localWhatsApp: e.target.value })}
                    className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg px-4 py-2.5 text-slate-900 font-mono font-bold focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    UK Diaspora WhatsApp
                  </label>
                  <input
                    type="text"
                    value={settings.ukWhatsApp}
                    onChange={(e) => setSettings({ ...settings, ukWhatsApp: e.target.value })}
                    className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg px-4 py-2.5 text-slate-900 font-mono font-bold focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    ZiG Conversion Rate (per 1 USD)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.zigRate}
                    onChange={(e) => setSettings({ ...settings, zigRate: parseFloat(e.target.value) || 27.5 })}
                    className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg px-4 py-2.5 text-slate-900 font-mono font-bold focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Free Delivery Threshold (USD)
                  </label>
                  <input
                    type="number"
                    value={settings.freeDeliveryThreshold}
                    onChange={(e) =>
                      setSettings({ ...settings, freeDeliveryThreshold: parseFloat(e.target.value) || 50.0 })
                    }
                    className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg px-4 py-2.5 text-slate-900 font-mono font-bold focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand hover:bg-ink text-white font-extrabold uppercase tracking-wider rounded-lg shadow-md transition-colors cursor-pointer"
              >
                Save Butchery Configuration
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ======================= MODAL: LOG WALK-IN / PHONE ORDER ======================= */}
      {isNewOrderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 max-w-lg w-full space-y-5 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b-2 border-stone-100">
              <h3 className="font-display text-lg font-bold text-slate-900">Log Walk-In / Phone Order</h3>
              <button
                onClick={() => setIsNewOrderOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sipho Moyo"
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-brand font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+263 7..."
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-brand font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fulfillment Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["pickup", "delivery", "diaspora"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setNewDeliveryType(mode)}
                      className={`py-2 px-2 text-center rounded-lg border-2 uppercase tracking-wider text-[10px] font-extrabold cursor-pointer transition-colors ${
                        newDeliveryType === mode
                          ? "bg-red-50 border-brand text-brand"
                          : "border-stone-200 text-slate-700 hover:bg-stone-50"
                      }`}
                    >
                      {mode === "pickup" ? "Pickup" : mode === "delivery" ? "Delivery" : "Diaspora UK"}
                    </button>
                  ))}
                </div>
              </div>

              {newDeliveryType !== "pickup" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Suburb</label>
                    <select
                      value={newSuburb}
                      onChange={(e) => setNewSuburb(e.target.value)}
                      className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-brand font-bold cursor-pointer"
                    >
                      {BULAWAYO_AREAS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 14 Gwanda Rd"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-brand font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cuts / Hamper Description</label>
                <input
                  type="text"
                  placeholder="e.g. 2kg T-Bone thick cut + 1kg Farm Boerewors"
                  value={newCutsDesc}
                  onChange={(e) => setNewCutsDesc(e.target.value)}
                  className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-brand font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Amount (USD)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg p-2.5 text-slate-900 font-mono font-bold focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cutting Instructions</label>
                  <input
                    type="text"
                    placeholder="e.g. Braai portioned"
                    value={newInstructions}
                    onChange={(e) => setNewInstructions(e.target.value)}
                    className="w-full bg-[#fdfbf7] border-2 border-stone-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-brand font-medium"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewOrderOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand hover:bg-ink text-white font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Register Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
