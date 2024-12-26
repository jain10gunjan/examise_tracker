import { useEffect, useState } from "react";

// React Component
export default function Tabs() {
  const [tabCount, setTabCount] = useState(0);

  // Hook for managing tab count
  useEffect(() => {
    const incrementTabs = () => {
      const tabs = parseInt(localStorage.getItem("openTabs") || "0", 10);
      localStorage.setItem("openTabs", tabs + 1);
      window.dispatchEvent(new Event("tabCountChanged")); // Notify other tabs
    };

    const decrementTabs = () => {
      const tabs = parseInt(localStorage.getItem("openTabs") || "0", 10);
      localStorage.setItem("openTabs", Math.max(tabs - 1, 0));
      window.dispatchEvent(new Event("tabCountChanged"));
    };

    const updateTabCount = () => {
      const tabs = parseInt(localStorage.getItem("openTabs") || "0", 10);
      setTabCount(tabs);
    };

    // Increment tabs on load
    incrementTabs();

    // Listen for tab changes
    window.addEventListener("tabCountChanged", updateTabCount);
    window.addEventListener("beforeunload", decrementTabs);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("tabCountChanged", updateTabCount);
      window.removeEventListener("beforeunload", decrementTabs);
      decrementTabs(); // Ensure tab count decrements on close
    };
  }, []);

  // Send tab count to the server
  useEffect(() => {
    const sendTabCountToServer = () => {
      fetch("/api/updateTabCount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tabCount }),
      }).catch(console.error);
    };

    window.addEventListener("tabCountChanged", sendTabCountToServer);

    return () => {
      window.removeEventListener("tabCountChanged", sendTabCountToServer);
    };
  }, [tabCount]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Active Tabs: {tabCount}</h1>
      <p>This is a demo of tab tracking with Next.js and React.</p>
    </div>
  );
}

// API Route: Save this in the same file under `/pages/api/updateTabCount`
export async function handler(req, res) {
  if (req.method === "POST") {
    const { tabCount } = req.body;
    console.log(`Number of open tabs: ${tabCount}`);
    return res.status(200).json({ success: true });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
